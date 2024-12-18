import { MANTLE_CHAIN_CONFIG, MANTLE_CHAIN_ID } from "./constants";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function connectWallet(): Promise<{ address: string; balance: string }> {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask to use this app");
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ 
      method: "eth_requestAccounts" 
    });

    // Switch to Mantle network
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: MANTLE_CHAIN_ID }],
      });
    } catch (switchError: any) {
      // If the chain hasn't been added to MetaMask
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [MANTLE_CHAIN_CONFIG],
        });
      } else {
        throw switchError;
      }
    }

    // Get balance
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    });

    // Convert balance from wei to MANTLE
    const mantleBalance = (parseInt(balance, 16) / 1e18).toFixed(4);

    return {
      address: accounts[0],
      balance: mantleBalance,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to connect wallet");
  }
}

export async function flipCoin(amount: string): Promise<boolean> {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask to use this app");
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: "eth_requestAccounts" 
    });

    // Convert amount to wei
    const amountInWei = (parseFloat(amount) * 1e18).toString(16);

    // Send transaction
    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: accounts[0],
        to: "0x0000000000000000000000000000000000000000", // Replace with your contract address
        value: "0x" + amountInWei,
      }],
    });

    // For demo purposes, random result
    // In production, this should be determined by the smart contract
    return Math.random() > 0.5;
  } catch (error: any) {
    throw new Error(error.message || "Failed to flip coin");
  }
}

// Listen for account changes
export function setupWalletListeners(
  onAccountsChanged: (accounts: string[]) => void,
  onChainChanged: (chainId: string) => void
) {
  if (typeof window !== "undefined" && window.ethereum) {
    window.ethereum.on("accountsChanged", onAccountsChanged);
    window.ethereum.on("chainChanged", onChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", onAccountsChanged);
      window.ethereum.removeListener("chainChanged", onChainChanged);
    };
  }
}