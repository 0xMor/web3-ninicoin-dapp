import { ethers } from "hardhat";

async function main() {
    // 1. Get the contract factory
    // Hardhat knows that FundMe uses PriceConverter, so it handles the linking automatically
    // because it's an internal library.
    const fundMeFactory = await ethers.getContractFactory("FundMe");

    console.log("Deploying FundMe contract...");

    // 2. Deploy the contract
    const fundMe = await fundMeFactory.deploy();
    await fundMe.waitForDeployment();

    // 3. Log the address
    console.log(`FundMe deployed to: ${fundMe.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});