import { useState, useEffect } from 'react';
import { ethers, BrowserProvider, Contract } from 'ethers';
import RaffleABI from './abis/Raffle.json';

// Your V2.5 Contract on Sepolia
const raffleAddress = "0x0cff4B2B9A98f5ce261041657bFd03C983e934d6";

export default function Lottery() {
    const [entranceFee, setEntranceFee] = useState("0");
    const [recentWinner, setRecentWinner] = useState("Loading...");
    const [loading, setLoading] = useState(false);

    // Load data on start
    async function updateUI() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new BrowserProvider(window.ethereum);
            // Note: If it fails here, the ABI is missing in the abis/ folder
            const contract = new Contract(raffleAddress, RaffleABI.abi, provider);

            try {
                const fee = await contract.getEntranceFee();
                const winner = await contract.getRecentWinner(); // This function must be public in Solidity

                setEntranceFee(ethers.formatEther(fee));
                setRecentWinner(winner === "0x0000000000000000000000000000000000000000" ? "No one yet" : winner);
            } catch (error) {
                console.error("Error reading contract:", error);
            }
        }
    }

    useEffect(() => {
        updateUI();
    }, []);

    async function handleEnterRaffle() {
        if (typeof window.ethereum !== "undefined") {
            setLoading(true);
            try {
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new Contract(raffleAddress, RaffleABI.abi, signer);

                const tx = await contract.enterRaffle({ value: ethers.parseEther(entranceFee) });
                await tx.wait();
                alert("Ticket bought! 🎉");
            } catch (error) {
                console.error(error);
                alert("Error buying ticket");
            }
            setLoading(false);
        }
    }

    return (
        <div className="p-6 mt-6 bg-gray-800 rounded-xl border border-gray-700 shadow-xl max-w-md mx-auto text-white">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">🎰 Decentralized Lottery</h2>

            <div className="mb-4 p-4 bg-gray-900 rounded-lg">
                <p className="text-gray-400 text-sm">Ticket Price</p>
                <p className="text-2xl font-mono text-green-400">{entranceFee} ETH</p>
            </div>

            <div className="mb-6">
                <p className="text-gray-400 text-sm mb-1">Last Winner:</p>
                <p className="text-xs font-mono bg-gray-700 p-2 rounded text-yellow-500 break-all">
                    {recentWinner}
                </p>
            </div>

            <button
                onClick={handleEnterRaffle}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-bold transition-all disabled:opacity-50"
            >
                {loading ? "Processing..." : "🎟️ Buy Ticket"}
            </button>
        </div>
    );
}
