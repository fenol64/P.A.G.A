extern crate alloc;

mod execute;
mod state;
mod msg;
mod errors;
mod query;
mod utils;


use cosmwasm_std::{entry_point, DepsMut, Env, MessageInfo, Response, StdResult, Binary, Deps};
use execute::{execute_invest_in_request, execute_request_from_politician};
use query::{query_requests_by_elector, query_requests_by_politician};
use state::PAGA_CONTRACT;
use crate::msg::{ExecuteMsg, QueryMsg, InstantiateMsg};
use crate::errors::ContractError;
use crate::execute::{execute_register, execute_follow, execute_add_balance};
use crate::state::OWNER;



#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let owner_addr = deps.api.addr_validate(&msg.owner)?;
    OWNER.save(deps.storage, &owner_addr)?;
    let paga_contract = deps.api.addr_validate(&msg.paga_contract)?;
    PAGA_CONTRACT.save(deps.storage, &paga_contract)?;

    Ok(Response::new()
        .add_attribute("action", "instantiate")
        .add_attribute("owner", owner_addr))
}


#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Register { elector_address } =>  execute_register(deps, env, info, elector_address),

        ExecuteMsg::FollowPolitician { elector_address, role, politician_address } => execute_follow(deps, env, info, elector_address, role, politician_address),
        ExecuteMsg::AddBalance { amount, elector_address } => execute_add_balance(deps, env, info, elector_address, amount),
        ExecuteMsg::RequestFromPolitician { elector_address, politician_address, title, description, investiment } => execute_request_from_politician(deps, info, elector_address, politician_address, title, description, investiment),
        ExecuteMsg::InvestInRequest { elector_address, request_id, amount } => execute_invest_in_request(deps, info, elector_address, request_id, amount),
    }
}

use crate::query::{query_elector, query_balance};

#[entry_point]
pub fn query(
    deps: Deps,
    _env: Env,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::Elector { address } => query_elector(deps, address),
        QueryMsg::Balance { address } => query_balance(deps, address),
        QueryMsg::RequestsByPolitician { politician_address } => query_requests_by_politician(deps, politician_address),
        QueryMsg::RequestsByElector { elector_address } => query_requests_by_elector(deps, elector_address),
    }
}

