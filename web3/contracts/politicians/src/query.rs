use cosmwasm_std::{Deps, StdResult, Addr};
use crate::{msg::PromiseResponse, state::{
    POLITICIANS, PROMISES, PROMISES_BY_POLITICIAN, VOTES_BY_ELECTOR
}};


pub fn get_promises_by_politician(deps: Deps, politician: String) -> StdResult<Vec<PromiseResponse>> {
    let addr = deps.api.addr_validate(&politician)?;
    
    // Busca a lista de IDs
    let promise_ids = PROMISES_BY_POLITICIAN
        .may_load(deps.storage, &addr)?
        .unwrap_or_default();

    // Busca cada promessa completa com base no endereço + id
    let mut promises = Vec::new();
    for id in promise_ids {
        if let Some(promise) = PROMISES.may_load(deps.storage, (&addr, id))? {
            promises.push(PromiseResponse {
                id: promise.id,
                title: promise.title,
                description: promise.description,
                status: promise.status,
                proof_url: promise.proof_url,
                votes_for: promise.votes_for,
                votes_against: promise.votes_against,
                created_at: promise.created_at,
                conclusion_date: promise.conclusion_date,
                finished_at: promise.finished_at,
            });
        }
    }

    Ok(promises)
}

pub fn get_promise(deps: Deps, politician: String, promise_id: u64) -> StdResult<Option<crate::state::Promise>> {
    let addr = deps.api.addr_validate(&politician)?;
    let promise = PROMISES.may_load(deps.storage, (&addr, promise_id))?;
    Ok(promise)
}

pub fn get_votes_by_elector(deps: Deps, elector: String) -> StdResult<Vec<(Addr, u64)>> {
    let addr = deps.api.addr_validate(&elector)?;
    let votes = VOTES_BY_ELECTOR.may_load(deps.storage, &addr)?.unwrap_or_default();
    Ok(votes)
}

pub fn get_politician(deps: Deps, address: String) -> StdResult<Option<crate::state::Politician>> {
    let addr = deps.api.addr_validate(&address)?;
    let politician = POLITICIANS.may_load(deps.storage, &addr)?;
    Ok(politician)
}

pub fn get_politicians_by_role(deps: Deps, role: crate::state::PoliticianRole) -> StdResult<Vec<crate::state::Politician>> {
    let mut politicians = Vec::new();
    for politician in POLITICIANS.range(deps.storage, None, None, cosmwasm_std::Order::Ascending) {
        let (_, p) = politician?;
        if p.role == role {
            politicians.push(p);
        }
    }
    Ok(politicians)
}