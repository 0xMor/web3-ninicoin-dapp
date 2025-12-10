import { ethers } from "hardhat";

async function main() {
    const miToken = await ethers.deployContract("MiToken");

    await miToken.waitForDeployment();

    console.log(`MiToken deployed to ${miToken.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
