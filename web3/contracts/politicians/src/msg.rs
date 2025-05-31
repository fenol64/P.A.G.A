use cosmwasm_schema::cw_serde;
use alloc::string::String;
use crate::state::PoliticianRole;
use crate::state::PromiseStatus;



#[cw_serde]
pub struct InstantiateMsg {
    pub owner: String, // 👈 Vamos usar String aqui, convertida depois para Addr
    pub paga_contract: String, // 👈 Vamos usar String aqui, convertida depois para Addr
}

/// Mensagens para executar ações que alteram o estado
#[cw_serde]
pub enum ExecuteMsg {
    /// Registra um novo político com um papel específico
    RegisterPolitician {
        politician_address: String,
        role: PoliticianRole,
    },

    /// Cria uma nova promessa para o político chamador
    CreatePromise {
        politician_address: String,
        title: String,
        description: String,
        conclusion_date: Option<u64>,
    },

    /// Um eleitor vota a favor ou contra uma promessa
    VoteOnPromise {
        voter_address: String,
        politician_address: String,
        promise_id: u64,
        in_favor: bool,
    },
}


/// Mensagens para consultas (não alteram o estado)
#[cw_serde]
pub enum QueryMsg {
    /// Retorna as promessas de um político
    PromisesByPolitician {
        politician: String,
    },

    /// Retorna os detalhes de uma promessa específica
    Promise {
        politician: String,
        promise_id: u64,
    },

    /// Retorna os votos de um eleitor
    VotesByElector {
        elector: String,
    },

    /// Retorna os dados de um político
    Politician {
        address: String,
    },

    PoliticiansByRole {
        role: PoliticianRole,
    },
}



#[cw_serde]
pub struct PromiseResponse {
    pub id: u64,
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

