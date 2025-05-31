use cosmwasm_std::{Deps, MessageInfo};
use crate::state::PAGA_CONTRACT;
use crate::errors::ContractError;

pub fn only_paga(deps: Deps, info: &MessageInfo) -> Result<(), ContractError> {
    let paga_addr = PAGA_CONTRACT.load(deps.storage)?;
    if info.sender != paga_addr {
        return Err(ContractError::Unauthorized {});
    }
    Ok(())
}
