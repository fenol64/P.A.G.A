
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

export const getClient = async (rpcEndpoint: string, signer: any) => {
  return await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, process.env.keplr_signer || signer, {
    gasPrice: GasPrice.fromString("0.025ustake"), // ajuste conforme sua denom
  });
};

export const registerElector = async (sender) => {
  const msg = { register_elector: {} }; // corresponde ao seu ExecuteMsg

    const client = await getClient(process.env.rpc || '', process.env.keplr_signer);

  const result = await client.execute(
    sender,
    process.env.contract_address || '',
    msg,
    "auto" // ou um valor fixo como "200000"
  );

  console.log("Transação feita:", result);
};

export const voteOnPromise = async (
  sender,
  signer,
  promise_id,
  vote
) => {
  const msg = {
    vote_on_promise: {
      promise_id,
      vote,
    },
  };
  const client = await getClient(process.env.rpc || '', signer);
  const result = await client.execute(sender, process.env.contract_address || '', msg, "auto");
  console.log("Voto enviado:", result);
};

