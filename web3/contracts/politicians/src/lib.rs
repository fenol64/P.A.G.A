extern crate alloc;

mod execute;
mod state;
mod msg;
mod errors;
mod query;
mod utils;


use cosmwasm_std::{entry_point, DepsMut, Env, MessageInfo, Response, StdResult, Binary, Deps, to_json_binary};
use query::get_politicians_by_role;
use state::PAGA_CONTRACT;
use crate::msg::{ExecuteMsg, QueryMsg, InstantiateMsg};
use crate::errors::ContractError;
use crate::execute::{execute_register_politician, execute_create_promise, execute_vote_on_promise};
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
        ExecuteMsg::RegisterPolitician {
            politician_address,
            role,
        } => execute_register_politician(deps, info, politician_address, role),
        ExecuteMsg::CreatePromise {
            politician_address,
            title,
            description,
            conclusion_date,
        } => execute_create_promise(
            deps,
            env,
            info,
            politician_address,
            title,
            description,
            conclusion_date,
        ),
        ExecuteMsg::VoteOnPromise {
            voter_address,
            politician_address,
            promise_id,
            in_favor,
        } => execute_vote_on_promise(
            deps,
            env,
            info,
            voter_address,
            politician_address,
            promise_id,
            in_favor,
        ),
    }
}

use crate::query::{get_politician, get_promises_by_politician, get_promise, get_votes_by_elector};

#[entry_point]
pub fn query(
    deps: Deps,
    _env: Env,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::PromisesByPolitician { politician } => {
            let promises = get_promises_by_politician(deps, politician)?;
            to_json_binary(&promises)
        }
        QueryMsg::Promise { politician, promise_id } => {
            let promise = get_promise(deps, politician, promise_id)?;
            to_json_binary(&promise)
        }
        QueryMsg::VotesByElector { elector } => {
            let votes = get_votes_by_elector(deps, elector)?;
            to_json_binary(&votes)
        }
        QueryMsg::Politician { address } => {
            let politician = get_politician(deps, address)?;
            to_json_binary(&politician)
        },
        QueryMsg::PoliticiansByRole { role } => {
            let politicians = get_politicians_by_role(deps, role)?;
            to_json_binary(&politicians)
        }
    }
}

