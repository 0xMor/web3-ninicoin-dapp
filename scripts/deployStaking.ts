import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy NiniCoin
    const niniCoin = await ethers.deployContract("NiniCoin");
    await niniCoin.waitForDeployment();
    const niniCoinAddress = await niniCoin.getAddress();
    console.log("NiniCoin deployed to:", niniCoinAddress);

    // 2. Deploy Staking Contract
    const staking = await ethers.deployContract("Staking", [niniCoinAddress]);
    await staking.waitForDeployment();
    const stakingAddress = await staking.getAddress();
    console.log("Staking deployed to:", stakingAddress);

    // 3. Fund Staking Contract
    // Transfer 50% of total supply to Staking contract for rewards
    const totalSupply = await niniCoin.totalSupply();
    const fundAmount = totalSupply / 2n; // 50%

    console.log(`Transferring ${ethers.formatEther(fundAmount)} NINKA to Staking contract...`);
    const tx = await niniCoin.transfer(stakingAddress, fundAmount);
    await tx.wait();

    console.log("Staking contract funded successfully!");

    // Verify balance
    const stakingBalance = await niniCoin.balanceOf(stakingAddress);
    console.log("Staking Contract Balance:", ethers.formatEther(stakingBalance), "NINKA");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
