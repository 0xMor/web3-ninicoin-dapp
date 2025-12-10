import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("🕵️‍♂️ Intentando desplegar con la cuenta:", deployer.address);
    console.log("💰 Saldo de la cuenta:", (await ethers.provider.getBalance(deployer.address)).toString());
    const priceConverter = await ethers.deployContract("PriceConverter");
    await priceConverter.waitForDeployment();

    console.log(`PriceConverter deployed to ${priceConverter.target}`);

    const price = await priceConverter.getLatestPrice();
    console.log(`Current ETH/USD Price: ${price}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
