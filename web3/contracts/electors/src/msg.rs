use cosmwasm_std::Addr;
use core::fmt;
use alloc::string::String;
use cosmwasm_schema::cw_serde;


#[cw_serde]
pub struct InstantiateMsg {
    pub owner: String, // 👈 Vamos usar String aqui, convertida depois para Addr
    pub paga_contract: String, // 👈 Vamos usar String aqui, convertida depois para Addr
}

/// Mensagens para executar ações que alteram o estado
#[cw_serde]
pub enum ExecuteMsg {
    /// Cadastra um novo eleitor (se ainda não estiver registrado)
    Register {elector_address: Addr},

    /// Dá follow em um político, em uma das funções (vereador, deputado, etc)
    FollowPolitician {
        elector_address: Addr,
        role: PoliticalRole,
        politician_address: Addr,
    },

    // Adiciona saldo (futuramente só pelo sistema de recompensa)
    AddBalance {
        amount: u128,
        elector_address: Addr,
    },

    RequestFromPolitician {
        elector_address: Addr,
        politician_address: Addr,
        title: String,
        description: String,
        investiment: u128,
    },

    InvestInRequest {
        elector_address: Addr,
        request_id: u128,
        amount: u128,
    },
}

/// Possíveis cargos políticos que um eleitor pode seguir
#[cw_serde]
pub enum PoliticalRole {
    Vereador,
    DeputadoEstadual,
    Governador,
    DeputadoFederal,
    Senador,
    Presidente,
}

impl fmt::Display for PoliticalRole {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let role_str = match self {
            PoliticalRole::Vereador => "Vereador",
            PoliticalRole::DeputadoEstadual => "Deputado Estadual",
            PoliticalRole::Governador => "Governador",
            PoliticalRole::DeputadoFederal => "Deputado Federal",
            PoliticalRole::Senador => "Senador",
            PoliticalRole::Presidente => "Presidente",
        };
        write!(f, "{}", role_str)
    }
}

/// Mensagens para consultas (não alteram o estado)
#[cw_serde]
pub enum QueryMsg {
    /// Consulta os dados de um eleitor
    Elector { address: Addr },

    /// Consulta apenas o saldo de um eleitor
    Balance { address: Addr },

    RequestsByPolitician { politician_address: Addr },
    RequestsByElector { elector_address: Addr },
}
