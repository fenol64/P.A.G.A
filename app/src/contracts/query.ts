import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export const getClient = async (rpcEndpoint: string) => {
  return await CosmWasmClient.connect(rpcEndpoint);
};

export const queryElector = async (address) => {
    const client = await getClient(process.env.rpc || '');
  return await client.queryContractSmart(process.env.contract_address || '', {
    elector: { address },
  });
};

export const queryBalance = async (address) => {
    const client = await getClient(process.env.rpc || '');
  return await client.queryContractSmart(process.env.contract_address || '' , {
    balance: { address },
  });
};

export const queryRequestsByPolitician = async (politician_address) => {
  const client = await getClient(process.env.rpc || '');
  return await client.queryContractSmart(process.env.contract_address || '', {
    requests_by_politician: { politician_address },
  });
};

export const queryRequestsByElector = async (elector_address) => {
    const client = await getClient(process.env.rpc || '');
    return await client.queryContractSmart(process.env.contract_address || '', {
    requests_by_elector: { elector_address },
  });
};

export const queryPromisesByPolitician = async (politician) => {
    const client = await getClient(process.env.rpc || '');
  return await client.queryContractSmart(process.env.contract_address || '', {
    promises_by_politician: { politician },
  });
};

export const queryPromise = async (politician, promise_id) => {
    const client = await getClient(process.env.rpc || '');
  return await client.queryContractSmart(process.env.contract_address || '', {
    promise: { politician, promise_id },
  });
};

export const queryVotesByElector = async (elector) => {
    const client = await getClient(process.env.rpc || '');
  return await client.queryContractSmart(process.env.contract_address || '', {
    votes_by_elector: { elector },
  });
};

export const queryPolitician = async (address) => {
    const client = await getClient(process.env.rpc || '');
  return await client.queryContractSmart(process.env.contract_address || '', {
    politician: { address },
  });
};

export const queryPoliticiansByRole = async (role) => {
    const client = await getClient(process.env.rpc || '');
  return await client.queryContractSmart(process.env.contract_address || '', {
    politicians_by_role: { role }, // ex: "president", "mayor", etc
  });
};








