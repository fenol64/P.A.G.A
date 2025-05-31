use cosmwasm_std::{to_json_binary, Addr, Deps, MessageInfo, StdError, StdResult};
use serde_json::json;
use crate::{msg::{Elector, Politician, Promise}, state::{ELECTORS_CONTRACT, OWNER, POLITICIANS_CONTRACT}};

pub fn only_owner(deps: Deps, info: &MessageInfo) -> StdResult<()> {
    let owner = OWNER.load(deps.storage)?;
    if info.sender != owner {
        return Err(StdError::generic_err("Unauthorized: not the contract owner"));
    }
    Ok(())
}

pub fn load_elector(deps: Deps, elector_address: &Addr) -> StdResult<Elector> {
    let query = to_json_binary(&json!({
        "elector": elector_address.to_string()
    }))?;

    let elector_contract = ELECTORS_CONTRACT.load(deps.storage)?;

    let elector: Elector = deps.querier.query(&cosmwasm_std::QueryRequest::Wasm(
        cosmwasm_std::WasmQuery::Smart {
            contract_addr: elector_contract.to_string(),
            msg: query,
        },
    ))?;

    Ok(elector)
}

pub fn load_politician(
    deps: Deps,
    politician_address: &Addr,
) -> StdResult<Politician> {
    let query = to_json_binary(&json!({
        "politician": politician_address.to_string()
    }))?;

    let politician_contract = POLITICIANS_CONTRACT.load(deps.storage)?;

    let politician: Politician = deps.querier.query(&cosmwasm_std::QueryRequest::Wasm(
        cosmwasm_std::WasmQuery::Smart {
            contract_addr: politician_contract.to_string(),
            msg: query,
        },
    ))?;

    Ok(politician)
}

pub fn load_promise(
    deps: Deps,
    promise_id: u64,
    politician_address: String
) -> StdResult<Promise> {
    let query = to_json_binary(&json!({
        "promise": {
            "politician": politician_address,
            "promise_id": promise_id
        }
    }))?;

    let politician_contract = POLITICIANS_CONTRACT.load(deps.storage)?;

    let promise: Promise = deps.querier.query(&cosmwasm_std::QueryRequest::Wasm(
        cosmwasm_std::WasmQuery::Smart {
            contract_addr: politician_contract.to_string(),
            msg: query,
        },
    ))?;

    Ok(promise)
}
