import { ethers } from "hardhat";

async function main() {
  const userContract = await ethers.getContractFactory("PAGA");
  const contrato = await userContract.deploy();

  await contrato.waitForDeployment();
  console.log("Contrato implantado em:", await contrato.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
