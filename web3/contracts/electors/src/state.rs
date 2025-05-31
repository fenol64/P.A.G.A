use cosmwasm_std::Addr;
use cw_storage_plus::{Item, Map};
use serde::{Deserialize, Serialize};

pub const OWNER: Item<Addr> = Item::new("owner");
pub const PAGA_CONTRACT: Item<Addr> = Item::new("paga_contract");

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Default)]
pub struct Follows {
    pub vereador: Option<Addr>,
    pub deputado_estadual: Option<Addr>,
    pub governador: Option<Addr>,
    pub deputado_federal: Option<Addr>,
    pub senador: Option<Addr>,
    pub presidente: Option<Addr>,
}

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct Elector {
    pub address: Addr,
    pub balance: u128,
    pub follows: Follows,
}

// Armazena todos os eleitores. A chave é o próprio endereço.
pub const ELECTORS: Map<&Addr, Elector> = Map::new("electors");

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct Requests {
    pub id: u128,
    pub author_address: Addr,
    pub title: String,
    pub description: String,
    pub investiment: u128,
    pub contributors: Vec<(Addr, u128)>,
    pub politician_address: Addr,
}
pub const REQUESTS: Map<u128, Requests> = Map::new("requests");
pub const REQUESTS_BY_POLITICIAN: Map<&Addr, Vec<u128>> = Map::new("requests_by_politician");
pub const REQUESTS_INVESTED_BY_ELECTOR: Map<&Addr, Vec<u128>> = Map::new("requests_invested_by_elector");
pub const REQUESTS_COUNT: Item<u128> = Item::new("requests_count");

