pub mod msg;
pub mod state;
pub mod utils;
pub mod execute_electors;
pub mod execute_politicians;
pub mod errors;

use crate::execute_politicians::execute_update_politicians_contract;
use cosmwasm_std::{
    entry_point, DepsMut, Env, MessageInfo, Response, StdResult};

use crate::msg::{InstantiateMsg, ExecuteMsg};
use crate::state::OWNER;
use crate::execute_electors::{execute_update_electors_contract, execute_register_elector};
use crate::errors::ContractError;



#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    let owner = deps.api.addr_validate(info.sender.as_str())?;
    OWNER.save(deps.storage, &owner)?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", owner))
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::UpdateElectorsContract { new_contract } => execute_update_electors_contract(deps, info, new_contract),

        ExecuteMsg::RegisterElector { } => execute_register_elector(deps, env, info),

        ExecuteMsg::FollowPolitician { politician_address } => execute_electors::execute_follow_politician(deps, env, info, politician_address),

        ExecuteMsg::UpdatePoliticiansContract { new_contract } => execute_update_politicians_contract(deps, info, new_contract),

        ExecuteMsg::CreatePromise {
            title,
            description,
            conclusion_date,
        } => execute_politicians::execute_create_promise(
            deps, env, info, title, description, conclusion_date
        ),

        ExecuteMsg::VoteOnPromise {
            politician_address,
            promise_id,
            vote,
        } => execute_politicians::execute_vote_on_promise(
            deps, env, info, politician_address, promise_id, vote
        ),
        ExecuteMsg::RegisterPolitician {
            role,
        } => execute_politicians::execute_register_politician(
            deps, env, info, role
        ),

        ExecuteMsg::RequestFromPolitician {
            politician_address,
            title,
            description,
            investiment,
        } => execute_electors::execute_request_from_politician(
            deps, env, info, politician_address, title, description, investiment
        ),

        ExecuteMsg::InvestInRequest {
            request_id,
            amount,
        } => execute_electors::execute_invest_in_request(
            deps, env, info, request_id, amount
        ),
        
    }
}
