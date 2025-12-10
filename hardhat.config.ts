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
    apiKey: "TU_API_KEY_ETHERSCAN"
  }
};

export default config;