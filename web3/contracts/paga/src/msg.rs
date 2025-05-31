use core::fmt;

use cosmwasm_schema::cw_serde;
use cosmwasm_std::Addr;

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    UpdateElectorsContract { new_contract: String },
    UpdatePoliticiansContract { new_contract: String },
    
    RegisterElector {},
    FollowPolitician {
        politician_address: String,
    },

    RegisterPolitician {
        role: PoliticianRole,
    },
    CreatePromise {
        title: String,
        description: String,
        conclusion_date: Option<u64>,
    },

    VoteOnPromise {
        politician_address: String,
        promise_id: u64,
        vote: bool,
    },

    RequestFromPolitician {
        politician_address: String,
        title: String,
        description: String,
        investiment: u128,
    },

    InvestInRequest {
        request_id: u128,
        amount: u128,
    },

}

#[cw_serde]
pub struct Politician {
    pub address: Addr,
    pub balance: u128,
    pub role: PoliticianRole,
}

#[cw_serde]
pub enum PoliticianRole {
    Vereador,
    DeputadoEstadual,
    DeputadoFederal,
    Governador,
    Senador,
    Presidente,
}

impl fmt::Display for PoliticianRole {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let role_str = match self {
            PoliticianRole::Vereador => "Vereador",
            PoliticianRole::DeputadoEstadual => "Deputado Estadual",
            PoliticianRole::Governador => "Governador",
            PoliticianRole::DeputadoFederal => "Deputado Federal",
            PoliticianRole::Senador => "Senador",
            PoliticianRole::Presidente => "Presidente",
        };
        write!(f, "{}", role_str)
    }
}

#[cw_serde]
pub struct Promise {
    pub id: u64,
    pub politician_address: Addr,
    pub title: String,
    pub description: String,
    pub status: PromiseStatus,
    pub proof_url: Option<String>,
    pub votes_for: u64,
    pub votes_against: u64,
    pub created_at: u64,
    pub conclusion_date: Option<u64>,
    pub finished_at: Option<u64>,
}

#[cw_serde]
pub enum PromiseStatus {
    Pending,
    Approved,
    Rejected,
}

#[cw_serde]
pub struct Elector {
    pub address: Addr,
    pub balance: u128,
    pub follows: Follows,
}

#[cw_serde]
pub struct Follows {
    pub vereador: Option<Addr>,
    pub deputado_estadual: Option<Addr>,
    pub governador: Option<Addr>,
    pub deputado_federal: Option<Addr>,
    pub senador: Option<Addr>,
    pub presidente: Option<Addr>,
}