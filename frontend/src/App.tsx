import { useState } from 'react'
import { ethers } from 'ethers'
import CoinArtifact from './CoinABI.json'
import CrowdsaleArtifact from './CrowdsaleABI.json'
import './index.css'

const TOKEN_ADDRESS = "0xfD78BCa17803f96d1A578988DA4da3Ba675b690A"
const CROWDSALE_ADDRESS = "0xC41689E2f4908F4dfc1c037F209e464A096D7C63"
const SEPOLIA_CHAIN_ID = "11155111"

function App() {
  const [tokenName, setTokenName] = useState<string>('')
  const [tokenSymbol, setTokenSymbol] = useState<string>('')
  const [userBalance, setUserBalance] = useState<string>('')
  const [userAddress, setUserAddress] = useState<string>('')
  const [networkError, setNetworkError] = useState<string>('')
  const [buyAmount, setBuyAmount] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const network = await provider.getNetwork()

        if (network.chainId.toString() !== SEPOLIA_CHAIN_ID) {
          setNetworkError("Por favor, cambia a la red Sepolia")
          return
        }

        setNetworkError('')

        await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setUserAddress(address)

        const contract = new ethers.Contract(TOKEN_ADDRESS, CoinArtifact.abi, signer)

        const name = await contract.name()
        const symbol = await contract.symbol()
        const balance = await contract.balanceOf(address)

        setTokenName(name)
        setTokenSymbol(symbol)
        setUserBalance(ethers.formatUnits(balance, 18))

      } catch (error) {
        console.error("Error connecting wallet:", error)
        setNetworkError("Error al conectar la wallet")
      }
    } else {
      alert("MetaMask not found!")
    }
  }

  const buyTokens = async () => {
    if (!buyAmount || !userAddress) return

    try {
      setIsLoading(true)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      const crowdsaleContract = new ethers.Contract(CROWDSALE_ADDRESS, CrowdsaleArtifact.abi, signer)

      const tx = await crowdsaleContract.buyTokens({ value: ethers.parseEther(buyAmount) })
      await tx.wait()

      // Refresh balance
      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, CoinArtifact.abi, signer)
      const balance = await tokenContract.balanceOf(userAddress)
      setUserBalance(ethers.formatUnits(balance, 18))

      setBuyAmount('')
      alert("¡Compra exitosa! Has recibido tus NiniCoins.")

    } catch (error) {
      console.error("Error buying tokens:", error)
      alert("Error al comprar tokens. Revisa la consola.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">

      {/* Glassmorphism Card */}
      <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">

        {/* Background Glow Effects */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-purple-600/30 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-orange-600/30 rounded-full blur-[80px]"></div>

        {/* Title */}
        <div className="relative z-10 text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Banco NiniCoin
          </h1>
          <p className="text-gray-400 text-sm mt-3 font-medium tracking-wide">
            TU PORTAL DEFI EN SEPOLIA
          </p>
        </div>

        {/* Error Notification */}
        {networkError && (
          <div className="relative z-10 mb-8 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm text-center backdrop-blur-sm animate-fade-in">
            <span className="block font-bold mb-1">⚠️ Error de Red</span>
            {networkError}
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 space-y-8">

          {/* Data Display */}
          <div className="bg-black/40 rounded-2xl p-8 border border-white/5 shadow-inner text-center">
            {!userAddress ? (
              <div className="py-4">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-gray-400 font-medium text-lg">Conecta tu wallet</p>
              </div>
            ) : (
              <div className="animate-fade-in">
                <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold mb-2">Saldo Disponible</p>

                <div className="flex flex-col items-center justify-center gap-1 mb-6">
                  <span className="text-5xl sm:text-6xl font-bold text-white tracking-tighter drop-shadow-lg">
                    {userBalance ? parseFloat(userBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                  </span>
                  <span className="text-xl font-medium text-orange-400 tracking-widest">{tokenSymbol}</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-xs font-mono tracking-wide">
                    {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                  </span>
                </div>

                <p className="text-gray-500 text-xs mt-4 font-medium">{tokenName}</p>
              </div>
            )}
          </div>

          {/* Connect Button */}
          {!userAddress && (
            <button
              onClick={connectWallet}
              className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 p-0.5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-500/25 active:scale-[0.98]"
            >
              <div className="relative flex items-center justify-center gap-3 rounded-[10px] bg-gray-900/90 px-6 py-4 transition-all duration-300 group-hover:bg-opacity-0">
                <span className="font-bold text-white text-lg tracking-wide">CONECTAR WALLET</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          )}

        </div>
      </div>

      {/* Crowdsale Card */}
      {userAddress && (
        <div className="relative w-full max-w-lg mt-8 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10 animate-fade-in-up">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Participar en la Preventa</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">ETH a invertir</label>
                <input
                  type="number"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <button
                onClick={buyTokens}
                disabled={isLoading || !buyAmount}
                className={`w-full font-bold text-lg py-4 rounded-xl transition-all duration-300 ${isLoading || !buyAmount
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
              >
                {isLoading ? 'Procesando...' : 'COMPRAR NINKA'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 flex items-center gap-2 text-gray-600 text-xs font-medium tracking-wider uppercase">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        Sepolia Testnet Live
      </div>
    </div>
  )
}

export default App
