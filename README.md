# NiniCoin DeFi Ecosystem & NFT Platform 🦄

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.20-363636?logo=solidity)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Hardhat](https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C)

## 📋 Project Overview

**NiniCoin DeFi Ecosystem** is a Full Stack Decentralized Application (DApp) running on the **Sepolia Testnet**. It creates a complete token economy where users can:

1.  **Buy NiniCoins (NINKA)**: An ERC-20 token representing the native currency of the ecosystem.
2.  **Mint Diplomas**: An ERC-721 NFT collection ("DiplomaWeb3") that issues unique digital diplomas to users.

The project demonstrates a robust integration of Smart Contracts with a modern, reactive frontend.

## 🚀 Live Demo

**[Link to Vercel Deployment]** *(Coming Soon)*

## ⛓️ Smart Contracts

The ecosystem is powered by three main smart contracts:

| Contract | Type | Features |
| :--- | :--- | :--- |
| **NiniCoin** | ERC-20 | Standard token implementation with `NINKA` symbol. |
| **Crowdsale** | DeFi | Allows users to buy NINKA with ETH. Includes `Ownable` for security and a `withdraw` function for the owner. |
| **DiplomaNFT** | ERC-721 | NFT collection ("DEV") with `safeMint` functionality and IPFS-hosted metadata. |

## 🛠️ Tech Stack

-   **Blockchain**: Solidity, Hardhat, Ethers.js
-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS (Glassmorphism UI)
-   **Network**: Sepolia Testnet

## 📍 Deployed Addresses (Sepolia)

| Contract | Address |
| :--- | :--- |
| **NiniCoin (ERC-20)** | `0xF6327f266d87d8E1bC56D9CDad7e531E9Eed2614` |
| **Crowdsale** | `0xC75778FD4643F304ba6CF5523bAC0676F9E10268` |
| **DiplomaNFT (ERC-721)** | `0x96231FeD4EE2b0458d98F7aaaDB8759E24415241` |

## 💻 How to Run

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/0xMor/web3-ninicoin-dapp
cd web3-ninicoin-dapp
```

### 2. Install Dependencies
```bash
npm install
# Navigate to frontend and install there too if needed
cd frontend
npm install
cd ..
```

### 3. Run Local Blockchain (Hardhat)
```bash
npx hardhat node
```

### 4. Deploy Contracts (Locally)
In a separate terminal:
```bash
npx hardhat run scripts/deployCrowdsale.ts --network localhost
npx hardhat run scripts/deployNFT.ts --network localhost
```

### 5. Run Frontend
```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
