import { execSync } from "child_process";
import { log } from "console";
import { isVerbose } from "../utils";

export const getCodeIdCommand = `docker exec neutron neutrond query wasm list-code --home /opt/neutron/data/test-1`;

export const getStoreCommand = (contractName: string) => {
  return `docker exec neutron neutrond tx wasm store /contracts/${contractName}.wasm \
          --fees 200000untrn --from mywallet \
          --gas auto  --gas-adjustment 1.3 \
          --keyring-backend test \
          --home /opt/neutron/data/test-1 \
          --broadcast-mode sync \
          --chain-id test-1  \
          --yes`;
};

export const getDeploymentCommand = (
  contractName: string,
  code_id: string,
  instanceProps: any
) => {
    return `
          docker exec neutron neutrond tx wasm instantiate ${code_id} \
          '${instanceProps}' \
            --label "${contractName}" \
            --from mywallet \
            --fees 10000untrn \
            --gas auto --gas-adjustment 1.3 \
            --keyring-backend test \
            --home /opt/neutron/data/test-1 \
            --broadcast-mode sync \
            --chain-id test-1 \
            --yes \
            --no-admin \
`;
};

export const getContractMoveCommand = (
    contractPath: string,
    contractName: string,
) => {
    return `
          docker exec neutron rm -rf /contracts && \
          docker exec neutron mkdir -p /contracts && \
          docker cp ${contractPath} neutron:/contracts/${contractName}`
}

export const getContractByCodeIdCommand = (codeId: string) => {
    return `docker exec neutron neutrond query wasm list-contract-by-code ${codeId} --home /opt/neutron/data/test-1`
}

export const sendContractToContainer = (
  contract_path: string,
  contractName: string
) => {
  console.log(`sending ${contractName} to the container`);
  const contractPath = `${contract_path}${contractName}`;

    const command = getContractMoveCommand(contractPath, contractName);
    if (isVerbose()) {
        log(`| >`, command);
    }

  execSync(command, { stdio: isVerbose() ? "inherit" : "ignore" });
  console.log(`contract ${contractName} sent successfully!`);
};

