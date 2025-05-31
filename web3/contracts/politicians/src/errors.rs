use cosmwasm_std::StdError;
use core::fmt;

#[derive(Debug)]
pub enum ContractError {
    Std(StdError),
    AlreadyRegistered {},
    NotImplemented {},
    NotRegistered {},
    Unauthorized {},
    PromiseNotFound {},
    PromiseNotPending {},
    AlreadyVoted {},
    
}

// Implementação de Display para os erros
impl fmt::Display for ContractError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ContractError::Std(e) => write!(f, "{}", e),
            ContractError::AlreadyRegistered {} => write!(f, "Elector already registered"),
            ContractError::NotImplemented {} => write!(f, "Method not implemented"),
            ContractError::NotRegistered {} => write!(f, "Elector not registered"),
            ContractError::Unauthorized {} => write!(f, "Unauthorized"),
            ContractError::PromiseNotFound {} => write!(f, "Promise not found"),
            ContractError::PromiseNotPending {} => write!(f, "Promise not pending"),
            ContractError::AlreadyVoted {} => write!(f, "Already voted"),
        }
    }
}

// Permite usar `?` com StdError
impl From<StdError> for ContractError {
    fn from(err: StdError) -> Self {
        ContractError::Std(err)
    }
}
