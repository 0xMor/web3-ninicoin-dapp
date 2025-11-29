import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    // Aquí definimos la red local para pruebas rápidas
    hardhat: {},
    // Aquí definimos la red Sepolia (Internet real de pruebas)
    sepolia: {
      url: "https://sepolia.drpc.org",
      accounts: ["62d051d2a11f65c6d7f4c159a13d542ebedb0ee11862addf7b02b6224c10dd0f"]
    }
  }
};

export default config;