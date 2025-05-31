use crate::state::{POLITICIANS, PROMISES, VOTES, VOTES_BY_ELECTOR, PROMISES_BY_POLITICIAN, PROMISE_COUNT, Politician, PoliticianRole, Promise, PromiseStatus, Vote};
use crate::errors::ContractError;
use crate::utils::only_paga;

use cosmwasm_std::{Env, DepsMut, MessageInfo, Response, StdResult};


/// Função que registra um novo eleitor, se ainda não existir
pub fn execute_register_politician(
    deps: DepsMut,
    info: MessageInfo,
    politician_address: String,
    role: PoliticianRole,
) -> Result<Response, ContractError> {
    // Verifica se o chamador é o PAGA
    only_paga(deps.as_ref(), &info)?;

    let addr = deps.api.addr_validate(&politician_address)?;

    // Verifica se já está registrado
    if POLITICIANS.has(deps.storage, &addr) {
        return Err(ContractError::AlreadyRegistered {});
    }

    // Cria novo político
    let politician = Politician {
        address: addr.clone(),
        balance: 0,
        role,
    };

    POLITICIANS.save(deps.storage, &addr, &politician)?;

    Ok(Response::new()
        .add_attribute("action", "register_politician")
        .add_attribute("politician", addr))
}

pub fn execute_create_promise(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    politician_address: String,
    title: String,
    description: String,
    conclusion_date: Option<u64>,
) -> Result<Response, ContractError> {

    only_paga(deps.as_ref(), &_info)?;

    let addr = deps.api.addr_validate(&politician_address)?;

    // Confere se o político existe
    let _politician = POLITICIANS
        .may_load(deps.storage, &addr)?
        .ok_or(ContractError::NotRegistered {})?;

    // Verifica ID da próxima promessa
    let count = PROMISE_COUNT
        .may_load(deps.storage, &addr)?
        .unwrap_or(0);

    let promise = Promise {
        id: count + 1,
        politician_address: addr.clone(),
        title,
        description,
        status: PromiseStatus::Pending,
        votes_for: 0,
        votes_against: 0,
        created_at: env.block.time.seconds(),
        conclusion_date,
        finished_at: None,
        proof_url: None,
    };

    // Salva a promessa
    PROMISES.save(deps.storage, (&addr, count + 1), &promise)?;
    PROMISE_COUNT.save(deps.storage, &addr, &(count + 1))?;

    // Indexa no vetor auxiliar
    let mut existing = PROMISES_BY_POLITICIAN
        .may_load(deps.storage, &addr)?
        .unwrap_or_default();
    existing.push(count + 1);
    PROMISES_BY_POLITICIAN.save(deps.storage, &addr, &existing)?;

    Ok(Response::new()
        .add_attribute("action", "create_promise")
        .add_attribute("politician", addr)
        .add_attribute("promise_id", (count + 1).to_string()))
}

pub fn execute_vote_on_promise(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    voter_address: String,
    politician_address: String,
    promise_id: u64,
    in_favor: bool,
) -> Result<Response, ContractError> {
    only_paga(deps.as_ref(), &info)?;

    // Validação dos endereços
    let voter = deps.api.addr_validate(&voter_address)?;
    let politician = deps.api.addr_validate(&politician_address)?;

    // Busca a promessa
    let mut promise = PROMISES
        .may_load(deps.storage, (&politician, promise_id))?
        .ok_or(ContractError::PromiseNotFound {})?;

    if promise.status != PromiseStatus::Pending {
        return Err(ContractError::PromiseNotPending {});
    }

    // Verifica se já votou
    if VOTES.has(deps.storage, (politician.clone(), promise_id, voter.clone())) {
        return Err(ContractError::AlreadyVoted {});
    }

    // Registra o voto
    let vote = Vote {
        voter: voter.clone(),
        in_favor,
    };

    VOTES.save(deps.storage, (politician.clone(), promise_id, voter.clone()), &vote)?;

    if in_favor {
        promise.votes_for += 1;
    } else {
        promise.votes_against += 1;
    }

    PROMISES.save(deps.storage, (&politician, promise_id), &promise)?;

    // Indexa o voto por eleitor
    VOTES_BY_ELECTOR
        .update(deps.storage, &voter, |prev| -> StdResult<_> {
            let mut list = prev.unwrap_or_default();
            list.push((politician.clone(), promise_id));
            Ok(list)
        })?;

    Ok(Response::new()
        .add_attribute("action", "vote_on_promise")
        .add_attribute("voter", voter.to_string())
        .add_attribute("politician", politician.to_string())
        .add_attribute("promise_id", promise_id.to_string())
        .add_attribute("vote", in_favor.to_string()))
}

