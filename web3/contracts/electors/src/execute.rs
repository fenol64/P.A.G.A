use cosmwasm_std::{Addr, DepsMut, Env, MessageInfo, Response, StdResult};
use crate::state::{Elector, Requests, ELECTORS, REQUESTS, REQUESTS_BY_POLITICIAN, REQUESTS_COUNT, REQUESTS_INVESTED_BY_ELECTOR};
use crate::errors::ContractError;
use crate::msg::PoliticalRole;
use crate::utils::{is_following, only_paga};
use alloc::string::ToString;



/// Função que registra um novo eleitor, se ainda não existir
pub fn execute_register(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    elector_address: Addr,
) -> Result<Response, ContractError> {
    only_paga(deps.as_ref(), &info)?;

    // Verifica se o eleitor já existe
    if ELECTORS.has(deps.storage, &elector_address) {
        return Err(ContractError::AlreadyRegistered {});
    }

    let new_elector = Elector {
        address: elector_address.clone(),
        balance: 0,
        follows: Default::default(), // todas as posições vazias
    };

    ELECTORS.save(deps.storage, &elector_address, &new_elector)?;

    Ok(Response::new()
        .add_attribute("action", "register")
        .add_attribute("elector", elector_address))
}

/// Função que faz o eleitor seguir um político (com base no cargo)
pub fn execute_follow(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    elector_address: Addr,
    role: PoliticalRole,
    politician_address: Addr,
) -> Result<Response, ContractError> {

    only_paga(deps.as_ref(), &info)?;

    let sender = info.sender;

    // Verifica se o eleitor está registrado
    let mut elector = ELECTORS
        .load(deps.storage, &elector_address)
        .map_err(|_| ContractError::NotRegistered {})?;

    // Clona o endereço do político para usar várias vezes
    let politician = politician_address.clone();

    // Atualiza o político seguido com base no cargo
    match role {
        PoliticalRole::Vereador => elector.follows.vereador = Some(politician),
        PoliticalRole::DeputadoEstadual => elector.follows.deputado_estadual = Some(politician),
        PoliticalRole::Governador => elector.follows.governador = Some(politician),
        PoliticalRole::DeputadoFederal => elector.follows.deputado_federal = Some(politician),
        PoliticalRole::Senador => elector.follows.senador = Some(politician),
        PoliticalRole::Presidente => elector.follows.presidente = Some(politician),
    }

    // Salva de volta o eleitor atualizado
    ELECTORS.save(deps.storage, &elector_address, &elector)?;

    Ok(Response::new()
        .add_attribute("action", "follow")
        .add_attribute("follower", sender)
        .add_attribute("politician", politician_address)
        .add_attribute("role", role.to_string()))
}

/// Função que adiciona saldo ao eleitor
pub fn execute_add_balance(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    elector_address: Addr,
    amount: u128,
) -> Result<Response, ContractError> {
    only_paga(deps.as_ref(), &info)?;

    // Verifica se o eleitor está registrado
    let mut elector = ELECTORS
        .load(deps.storage, &elector_address)
        .map_err(|_| ContractError::NotRegistered {})?;

    // Adiciona o saldo
    elector.balance += amount;

    // Salva de volta o eleitor atualizado
    ELECTORS.save(deps.storage, &elector_address, &elector)?;

    Ok(Response::new()
        .add_attribute("action", "add_balance")
        .add_attribute("elector", elector_address)
        .add_attribute("amount", amount.to_string()))
}

pub fn execute_request_from_politician(
    deps: DepsMut,
    info: MessageInfo,
    elector_address: Addr,
    politician_address: Addr,
    title: String,
    description: String,
    investiment: u128,
) -> Result<Response, ContractError> {

    only_paga(deps.as_ref(), &info)?;

    if investiment <= 9 {
        return Err(ContractError::InvalidInvestment {});
    }
    
    // Verifica se o eleitor está registrado
    let elector = ELECTORS
        .load(deps.storage, &elector_address)
        .map_err(|_| ContractError::NotRegistered {})?;

    // Verificar se o eleitor tem saldo suficiente
    if elector.balance < investiment {
        return Err(ContractError::InsufficientFunds {});
    }

    if !is_following(elector, &politician_address) {
        return Err(ContractError::Unauthorized{});
    }

    
    ELECTORS.update(deps.storage, &elector_address, |e| -> Result<_, ContractError> {
        let mut elector = e.ok_or(ContractError::NotRegistered {})?;
        elector.balance -= investiment;
        Ok(elector)
    })?;


    // 1. Gera um novo ID
    let mut count = REQUESTS_COUNT.load(deps.storage)?;
    count += 1;
    REQUESTS_COUNT.save(deps.storage, &count)?;

    // 2. Cria nova requisição
    let request = Requests {
        id: count,
        author_address: elector_address.clone(),
        title,
        description,
        investiment,
        contributors: vec![(elector_address.clone(), investiment)],
        politician_address: politician_address.clone(),
    };

    // 3. Salva a requisição pelo ID
    REQUESTS.save(deps.storage, count, &request)?;

    // 5. Atualiza índice por político
    REQUESTS_BY_POLITICIAN.update(
        deps.storage,
        &politician_address,
        |requests| -> StdResult<_> {
            let mut list = requests.unwrap_or_default();
            list.push(count);
            Ok(list)
        },
    )?;

    // 6. Atualizar índice por investidor
    REQUESTS_INVESTED_BY_ELECTOR.update(
        deps.storage,
        &elector_address,
        |requests| -> StdResult<_> {
            let mut list = requests.unwrap_or_default();
            list.push(count);
            Ok(list)
        },
    )?;

    Ok(Response::new().add_attribute("action", "request_from_politician"))
}

pub fn execute_invest_in_request(
    deps: DepsMut,
    _info: MessageInfo,
    elector_address: Addr,
    request_id: u128,
    amount: u128,
) -> Result<Response, ContractError> {
    if amount == 0 {
        return Err(ContractError::InvalidInvestment {});
    }

    // Verifica se o eleitor está registrado
    let elector = ELECTORS
        .load(deps.storage, &elector_address)
        .map_err(|_| ContractError::NotRegistered {})?;

    // Verifica se a requisição existe
    let mut request = REQUESTS
        .load(deps.storage, request_id)
        .map_err(|_| ContractError::RequestNotFound {})?;

    // Verifica se o eleitor segue o político da requisição
    if !is_following(elector.clone(), &request.politician_address) {
        return Err(ContractError::Unauthorized {});
    }

    // Verifica se o eleitor tem saldo
    if elector.balance < amount {
        return Err(ContractError::InsufficientFunds {});
    }

    // Atualiza a requisição: soma ao total e adiciona à lista de contribuidores
    request.investiment += amount;
    request.contributors.push((elector_address.clone(), amount));
    REQUESTS.save(deps.storage, request_id, &request)?;

    // Atualiza saldo do eleitor
    ELECTORS.update(deps.storage, &elector_address, |e| -> Result<_, ContractError> {
        let mut e = e.ok_or(ContractError::NotRegistered {})?;
        e.balance -= amount;
        Ok(e)
    })?;

    // Atualiza índice por investidor sem duplicar
    REQUESTS_INVESTED_BY_ELECTOR.update(
        deps.storage,
        &elector_address,
        |requests| -> StdResult<_> {
            let mut list = requests.unwrap_or_default();
            if !list.contains(&request_id) {
                list.push(request_id);
            }
            Ok(list)
        },
    )?;

    Ok(Response::new()
        .add_attribute("action", "invest_in_request")
        .add_attribute("request_id", request_id.to_string())
        .add_attribute("from", elector_address))
}
