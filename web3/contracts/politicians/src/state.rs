use cosmwasm_schema::cw_serde;
use cosmwasm_std::Addr;
use cw_storage_plus::{Item, Map};

pub const OWNER: Item<Addr> = Item::new("owner");
pub const PAGA_CONTRACT: Item<Addr> = Item::new("paga_contract");


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

// Armazena todos os políticos. A chave é o próprio endereço.
pub const POLITICIANS: Map<&Addr, Politician> = Map::new("politicians");

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

// Armazena todas as promessas. A chave é o ID da promessa e o endereço do político.
// O ID é um número sequencial, começando em 1.
pub const PROMISES: Map<(&Addr, u64), Promise> = Map::new("promises");
pub const PROMISE_COUNT: Map<&Addr, u64> = Map::new("promise_count");
pub const PROMISES_BY_POLITICIAN: Map<&Addr, Vec<u64>> = Map::new("promises_by_politician");


#[cw_serde]
pub struct Vote {
    pub voter: Addr,
    pub in_favor: bool,
}

// Armazena todos os votos. A chave é o endereço do político, o ID da promessa e o endereço do eleitor.
// O ID é um número sequencial, começando em 1.
pub const VOTES: Map<(Addr, u64, Addr), Vote> = Map::new("votes");
pub const VOTES_BY_ELECTOR: Map<&Addr, Vec<(Addr, u64)>> = Map::new("votes_by_elector");

