import { ethers } from "hardhat";

async function main() {
    // 1. Address of the deployed contract
    // Replace this with your specific deployment address if it changes
    const contractAddress = "0x453E57f47e9d2De2f38bF153eE7c6fcbe99E0bF6";

    // 2. Get the contract instance
    const fundMe = await ethers.getContractAt("FundMe", contractAddress);

    console.log("Funding contract...");

    // 3. Fund the contract
    // We send 0.02 ETH. Depending on the current price, this needs to be > $50.
    // At $3300/ETH, 0.02 ETH is approx $66, so it should pass.
    const transactionResponse = await fundMe.fund({
        value: ethers.parseEther("0.02"),
    });

    // 4. Wait for the transaction to be mined
    await transactionResponse.wait(1);

    console.log("Funded!");

    // 5. Check balance
    const contractBalance = await ethers.provider.getBalance(contractAddress);
    console.log(`Contract balance is now: ${ethers.formatEther(contractBalance)} ETH`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});