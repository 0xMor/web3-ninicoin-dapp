import { ethers } from "hardhat";

async function main() {
    // 1. Deploy the contract
    const priceConverter = await ethers.deployContract("PriceConverter");
    await priceConverter.waitForDeployment();

    console.log(`PriceConverter deployed to ${priceConverter.target}`);

    // 2. Get the raw price from the contract
    const price = await priceConverter.getLatestPrice();

    // 3. Format the price
    // Chainlink feeds have 8 decimals for USD pairs.
    // formatUnits converts the BigInt to a string with the decimal point.
    const formattedPrice = ethers.formatUnits(price, 8);

    console.log(`Raw Price: ${price}`);
    console.log(`Current ETH/USD Price: $${formattedPrice}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});