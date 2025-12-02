import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.drpc.org",
      // ¡AQUÍ ES DONDE BORRAS TU CLAVE REAL!
      accounts: ["PON_AQUI_TU_CLAVE_PRIVADA_PERO_NO_LA_SUBAS"]
    }
  },
  etherscan: {
    // ¡AQUÍ BORRAS LA API KEY REAL!
    apiKey: "TU_API_KEY_ETHERSCAN"
  }
};

export default config;