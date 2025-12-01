import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy Token
    const NiniCoin = await ethers.getContractFactory("NiniCoin");
    const token = await NiniCoin.deploy();
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("NiniCoin deployed to:", tokenAddress);

    // 2. Deploy Crowdsale
    const rate = 1000; // 1 ETH = 1000 Tokens
    const Crowdsale = await ethers.getContractFactory("Crowdsale");
    const crowdsale = await Crowdsale.deploy(tokenAddress, rate);
    await crowdsale.waitForDeployment();
    const crowdsaleAddress = await crowdsale.getAddress();
    console.log("Crowdsale deployed to:", crowdsaleAddress);

    // 3. Transfer 50% of tokens to Crowdsale
    const totalSupply = await token.totalSupply();
    const amountToTransfer = totalSupply / 2n; // 50%

    const tx = await token.transfer(crowdsaleAddress, amountToTransfer);
    await tx.wait();

    console.log(`Transferred ${amountToTransfer.toString()} tokens to Crowdsale`);

    // Verify balance
    const crowdsaleBalance = await token.balanceOf(crowdsaleAddress);
    console.log("Crowdsale balance:", crowdsaleBalance.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
