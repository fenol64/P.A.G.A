use cosmwasm_std::{Deps, StdResult, Addr, to_json_binary, Binary};
use crate::state::{ELECTORS, REQUESTS, REQUESTS_BY_POLITICIAN, REQUESTS_INVESTED_BY_ELECTOR};


pub fn query_elector(deps: Deps, address: Addr) -> StdResult<Binary> {

    let elector = ELECTORS.load(deps.storage, &address)?;
    to_json_binary(&elector)
}

pub fn query_balance(deps: Deps, address: Addr) -> StdResult<Binary> {

    let elector = ELECTORS.load(deps.storage, &address)?;
    to_json_binary(&elector.balance)
}

pub fn query_requests_by_politician(
    deps: Deps,
    politician_address: Addr,
) -> StdResult<Binary> {
    let ids = REQUESTS_BY_POLITICIAN
        .may_load(deps.storage, &politician_address)?
        .unwrap_or_default();

    let mut requests = Vec::new();
    for id in ids {
        let request = REQUESTS.load(deps.storage, id)?;
        requests.push(request);
    }

    to_json_binary(&requests)
}

pub fn query_requests_by_elector(
    deps: Deps,
    elector_address: Addr,
) -> StdResult<Binary> {
    let ids = REQUESTS_INVESTED_BY_ELECTOR
        .may_load(deps.storage, &elector_address)?
        .unwrap_or_default();

    let mut requests = Vec::new();
    for id in ids {
        let request = REQUESTS.load(deps.storage, id)?;
        requests.push(request);
    }

    to_json_binary(&requests)
}


