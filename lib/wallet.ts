import { MANTLE_CHAIN_CONFIG, MANTLE_CHAIN_ID } from "./constants";
import { BrowserProvider, ethers } from 'ethers';

import tokenABI from "@/contractInfo/abi.json"; // Import your custom token ABI
const tokenAddress = "0xFdd0aB6034564D942dE78CF67C86956fF047Cc1E"; // Replace with your custom token contract address

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
    //mint
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    const address = await signer.address;
    const questContract = new ethers.Contract(tokenAddress, tokenABI.abi, signer)
    await (await questContract.mint(address, ethers.parseUnits(parseInt("150").toString(), 18))).wait();
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
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    // Set up the provider and signer using ethers.js
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Create a contract instance
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI.abi, signer);

    // Convert amount to token's smallest unit (e.g., wei for ETH, or your token's decimals)
    const amountInTokens = ethers.parseUnits(amount, 18); // Assuming 18 decimals for the token

    // Send token transaction (this could be an entry fee if you want to take tokens)
    const transaction = await tokenContract.transfer(
      "0xe1b3df92a983bD27c4798867A1F425B3fA7c71a8", // Replace with your contract address
      amountInTokens
    );

    // Wait for the transaction to be mined
    await transaction.wait();

    // For demo purposes, simulate coin flip result
    const userWon = Math.random() > 0.5; // Simulate 50% chance win or loss

    if (userWon) {
      // Mint tokens if the user wins the coin flip
      const mintAmount = ethers.parseUnits("10", 18); // Mint 10 tokens (adjust as needed)

      // Call the mint function from your contract
      const mintTransaction = await tokenContract.mint(accounts[0], mintAmount);

      // Wait for the mint transaction to be mined
      await mintTransaction.wait();

      console.log(`User won! Minted ${mintAmount.toString()} tokens`);
    }

    return userWon;
  } catch (error: any) {
    throw new Error(error.message || "Failed to flip coin");
  }
  // try {
  //   const accounts = await window.ethereum.request({ 
  //     method: "eth_requestAccounts" 
  //   });

  //   // Convert amount to wei
  //   const amountInWei = (parseFloat(amount) * 1e18).toString(16);

  //   // Send transaction
  //   await window.ethereum.request({
  //     method: "eth_sendTransaction",
  //     params: [{
  //       from: accounts[0],
  //       to: "0x0000000000000000000000000000000000000000", // Replace with your contract address
  //       value: "0x" + amountInWei,
  //     }],
  //   });

  //   // For demo purposes, random result
  //   // In production, this should be determined by the smart contract
  //   return Math.random() > 0.5;
  // } catch (error: any) {
  //   throw new Error(error.message || "Failed to flip coin");
  // }
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