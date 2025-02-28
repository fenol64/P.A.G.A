import { ethers } from "hardhat";

async function main() {
    const claimContract = await ethers.getContractFactory("ClaimContract");
    const commitContract = await ethers.getContractFactory("CommitmentContract");
    const voterContract = await ethers.getContractFactory("VoterContract");
    const politicianContract = await ethers.getContractFactory("Politician");
    const mainContract = await ethers.getContractFactory("PAGAContract");


    const claim = await claimContract.deploy();
    const commit = await commitContract.deploy();
    const voter = await voterContract.deploy();
    const politician = await politicianContract.deploy();

    await claim.waitForDeployment();
    await commit.waitForDeployment();
    await voter.waitForDeployment();
    await politician.waitForDeployment();

    const main = await mainContract.deploy(claim.getAddress(), commit.getAddress(), voter.getAddress(), politician.getAddress());
    await main.waitForDeployment();


    console.log("Claim deployed to:", await claim.getAddress());
    console.log("Commit deployed to:", await commit.getAddress());
    console.log("Voter deployed to:", await voter.getAddress());
    console.log("Politician deployed to:", await politician.getAddress());
    console.log("Main deployed to:", await main.getAddress());


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
