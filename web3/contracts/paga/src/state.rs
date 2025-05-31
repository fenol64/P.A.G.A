use cosmwasm_std::Addr;
use cw_storage_plus::Item;

pub const OWNER: Item<Addr> = Item::new("owner");
pub const ELECTORS_CONTRACT: Item<Addr> = Item::new("electors_contract");
pub const POLITICIANS_CONTRACT: Item<Addr> = Item::new("politicians_contract");



