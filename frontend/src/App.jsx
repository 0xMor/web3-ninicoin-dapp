import { useState } from 'react'
import Lottery from './Lottery'; // Import the component

function App() {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8">
                Raffle DApp
            </h1>

            {/* Render the Lottery Component */}
            <Lottery />

            <footer className="mt-10 text-gray-500 text-sm">
                Connect to Sepolia Testnet
            </footer>
        </div>
    )
}

export default App