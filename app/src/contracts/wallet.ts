import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

declare global {
  interface Window {
    keplr: any;
    getOfflineSigner: any;
  }
}

const connectKeplr = async (rpcEndpoint: string, chainId: string) => {
  await window.keplr.enable(chainId);
  const offlineSigner = window.getOfflineSigner(chainId);
  const accounts = await offlineSigner.getAccounts();

  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    offlineSigner,
    {
      gasPrice: GasPrice.fromString("0.025stake"), // ajuste conforme sua denom
    }
  );

  return { client, address: accounts[0].address };
};
