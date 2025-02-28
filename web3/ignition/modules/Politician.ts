// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PoliticianModule = buildModule("PoliticianModule", (m) => {
  const politician = m.contract("Politician", [], {});

  return { politician };
});

export default PoliticianModule;
