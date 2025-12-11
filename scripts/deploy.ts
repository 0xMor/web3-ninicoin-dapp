import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Aquí cambiamos "NiniCoin" por "FundMe"
  // 2. El segundo argumento es la dirección del Price Feed de ETH/USD en Sepolia
  // (Si tu constructor no pide argumentos, borra lo que hay entre corchetes [])
  const fundMe = await ethers.deployContract("FundMe", ["0x694AA1769357215DE4FAC081bf1f309aDC325306"]);

  await fundMe.waitForDeployment();

  console.log("FundMe deployed to:", await fundMe.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});