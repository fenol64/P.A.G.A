import { execSync } from "child_process";
import {
    getCodeIdCommand,
  getDeploymentCommand,
  getStoreCommand,
  sendContractToContainer,
} from "./commands/commands";
import contractSchema from "./contract_schema";
import { log } from "console";
import { contract_path, isVerbose, sleep } from "./utils";
import { compileProject } from "./commands/compile_command";
import { TContractName } from "./types/type";
import { listContracts, listContractsByCodeId } from "./commands/contract";

const storeContract = async (contractName: string) => {
  const storeCommand = getStoreCommand(contractName);
  const storeRes = execSync(storeCommand, { encoding: "utf8" });
  if (isVerbose()) {
    log(`| >: ${storeCommand}`);
    log(storeRes);
    log(`| >: ${getCodeIdCommand}`);
  }
  await new Promise((r) => setTimeout(r, 2000));
  let codeId: string = execSync(getCodeIdCommand, { encoding: "utf8" });
  if (isVerbose()) log(`codeId: ${codeId}`);
  codeId =
    codeId.split("code_id: ").at(-1)?.split("\n")[0].replace(/"/g, "") ?? "";
  if (isVerbose()) log(`codeId: ${codeId}`);
  return codeId;
};

const instanciateContract = (contractName: string, codeId: string) => {
  const instanceProps =
    contractSchema[contractName as keyof typeof contractSchema].instanceProps(
      contractSchema
    );
  const instantiateRes = execSync(
    getDeploymentCommand(contractName, codeId, instanceProps),
    { encoding: "utf8" }
  );
  if (isVerbose()) {
    log(`| >: ${getDeploymentCommand(contractName, codeId, instanceProps)}`);
    log(instantiateRes);
  }
};

const executeInitProcedure = async (contractSchema: any) => {
    const pagaContract = contractSchema["paga.wasm"].address;
    const electorsContract = contractSchema["electors.wasm"].address;
    const politiciansContract = contractSchema["politicians.wasm"].address;

    let command = `docker exec neutron neutrond tx wasm execute ${pagaContract} '{"update_electors_contract":{"new_contract": "${electorsContract}"}}' --from mywallet --fees 5000untrn --gas auto --gas-adjustment 1.3 --keyring-backend test --home /opt/neutron/data/test-1 --chain-id test-1 --yes`
    if (isVerbose()) {
        log(`| >: ${command}`);
    }
    execSync(
        command,
        { stdio: isVerbose() ? "inherit" : "ignore" }
    )
    await sleep(3000);
    command = `docker exec neutron neutrond tx wasm execute ${pagaContract} '{"update_politicians_contract":{"new_contract": "${politiciansContract}"}}' --from mywallet --fees 5000untrn --gas auto --gas-adjustment 1.3 --keyring-backend test --home /opt/neutron/data/test-1 --chain-id test-1 --yes`
    if (isVerbose()) {
        log(`| >: ${command}`);
    }
    execSync(
        command,
        { stdio: isVerbose() ? "inherit" : "ignore" }
    )

}

log("deploying contracts...");
(async () => {
  if (process.argv[2] === "--verbose") {
    log("Verbose mode enabled this means that all commands will be logged");
    process.env.VERBOSE = "true";
  }

  compileProject();

  for (const contract in contractSchema) {
    const current_obj = contractSchema[contract as TContractName];
    await sleep(5000);
    sendContractToContainer(contract_path, contract);
    const codeId = await storeContract(current_obj.name);
    instanciateContract(contract, codeId);
    await sleep(3000);
    const contractAddress = await listContractsByCodeId(codeId);
    contractSchema[contract as TContractName].address = contractAddress;
  }
  log("listing contracts...");
  listContracts(contractSchema);

  log("Contracts listed successfully!");
  log("All contracts deployed successfully!");

  log("executing commands init procedure...");
  await executeInitProcedure(contractSchema);
})();
