import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.drpc.org",
      // ¡AQUÍ ES DONDE BORRAS TU CLAVE REAL!
      accounts: ["62d051d2a11f65c6d7f4c159a13d542ebedb0ee11862addf7b02b6224c10dd0f"]
    }
  },
  etherscan: {
    // ¡AQUÍ BORRAS LA API KEY REAL!
    apiKey: "QA1A63KIXNSH5V6TVDIH6AJTUNB1YN6DEC"
  }
};

export default config;