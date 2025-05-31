use cosmwasm_std::{Addr, Deps, MessageInfo};
use crate::state::{Elector, PAGA_CONTRACT};
use crate::errors::ContractError;

pub fn only_paga(deps: Deps, info: &MessageInfo) -> Result<(), ContractError> {
    let paga_addr = PAGA_CONTRACT.load(deps.storage)?;
    if info.sender != paga_addr {
        return Err(ContractError::Unauthorized {});
    }
    Ok(())
}


pub fn is_following(elector: Elector, politician_address: &Addr) -> bool {
    [
        elector.follows.vereador,
        elector.follows.deputado_estadual,
        elector.follows.governador,
        elector.follows.deputado_federal,
        elector.follows.senador,
        elector.follows.presidente,
    ]
    .iter()
    .flatten()
    .any(|addr| addr == politician_address)
}