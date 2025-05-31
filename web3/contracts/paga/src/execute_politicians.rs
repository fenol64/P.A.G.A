use crate::msg::Elector;
use crate::msg::PoliticianRole;
use crate::state::POLITICIANS_CONTRACT;
use crate::utils::load_promise;
use crate::utils::{load_elector, only_owner};
use cosmwasm_std::{to_json_binary, Addr, DepsMut, Env, MessageInfo, Response, WasmMsg};
use serde_json::json;
use crate::errors::ContractError;

pub fn execute_update_politicians_contract(
    deps: DepsMut,
    info: MessageInfo,
    new_contract: String,
) -> Result<Response, ContractError> {
    only_owner(deps.as_ref(), &info)?;

    let new_addr = deps.api.addr_validate(&new_contract)?;
    POLITICIANS_CONTRACT.save(deps.storage, &new_addr)?;
    Ok(Response::new()
        .add_attribute("action", "update_politicians_contract")
        .add_attribute("new_politicians_contract", new_addr))
}

pub fn execute_register_politician(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    role: PoliticianRole,
) -> Result<Response, ContractError> {
    
    // Monta a mensagem a ser enviada ao contrato de políticos
    let msg = to_json_binary(&json!({
        "register_politician": {
            "politician_address": info.sender.to_string(),
            "role": role, // precisa derivar Serialize
        }
    }))?;

    let exec = WasmMsg::Execute {
        contract_addr: POLITICIANS_CONTRACT.load(deps.storage)?.to_string(),
        msg,
        funds: vec![],
    };

    Ok(Response::new()
        .add_message(exec)
        .add_attribute("action", "register_politician_from_paga")
        .add_attribute("sender", info.sender))
}

pub fn execute_create_promise(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    title: String,
    description: String,
    conclusion_date: Option<u64>,
) -> Result<Response, ContractError> {
    // Verifica se quem chamou é um político válido (se necessário)
    // ou se qualquer eleitor pode propor promessa (dependendo da lógica futura)

    // Prepara a mensagem JSON para o contrato dos políticos
    let msg = to_json_binary(&json!({
        "create_promise": {
            "politician_address": info.sender.to_string(),
            "title": title,
            "description": description,
            "conclusion_date": conclusion_date,
        }
    }))?;

    // Endereço do contrato de políticos
    let politicians_contract = POLITICIANS_CONTRACT.load(deps.storage)?;

    let exec = WasmMsg::Execute {
        contract_addr: politicians_contract.to_string(),
        msg,
        funds: vec![],
    };

    Ok(Response::new()
        .add_message(exec)
        .add_attribute("action", "forward_create_promise")
        .add_attribute("from", info.sender))
}

pub fn execute_vote_on_promise(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    politician_address: String,
    promise_id: u64,
    in_favor: bool,
) -> Result<Response, ContractError> {

    let elector = load_elector(deps.as_ref(), &info.sender)?;
    let voter_address = info.sender.to_string();
    let politician_address_clone = politician_address.clone();
    let promise = load_promise(deps.as_ref(), promise_id, politician_address_clone)?;

    if promise.politician_address != politician_address {
        return Err(ContractError::Unauthorized {});
    }
  
    // Verifica se o eleitor está seguindo o político
    let politician_addr = deps.api.addr_validate(&politician_address)?;
    if !is_elector_following_politician(&elector, &politician_addr) {
        return Err(ContractError::NotFollowingPolitician {});
    }


    let msg = to_json_binary(&json!({
        "vote_on_promise": {
            "voter_address": voter_address,
            "politician_address": politician_address,
            "promise_id": promise_id,
            "in_favor": in_favor
        }
    }))?;

    let politicians_contract = POLITICIANS_CONTRACT.load(deps.storage)?;

    let exec = WasmMsg::Execute {
        contract_addr: politicians_contract.to_string(),
        msg,
        funds: vec![],
    };

    Ok(Response::new()
        .add_message(exec)
        .add_attribute("action", "forward_vote_on_promise")
        .add_attribute("from", info.sender)
        .add_attribute("politician", politician_address)
        .add_attribute("promise_id", promise_id.to_string())
        .add_attribute("in_favor", in_favor.to_string()))
}


fn is_elector_following_politician(
    elector: &Elector,
    politician_address: &Addr,
) -> bool {
    elector.follows.vereador == Some(politician_address.clone())
        || elector.follows.deputado_estadual == Some(politician_address.clone())
        || elector.follows.governador == Some(politician_address.clone())
        || elector.follows.deputado_federal == Some(politician_address.clone())
        || elector.follows.senador == Some(politician_address.clone())
        || elector.follows.presidente == Some(politician_address.clone())
}


