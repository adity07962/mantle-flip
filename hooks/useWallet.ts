"use client";

import { useState, useEffect } from "react";
import { connectWallet, setupWalletListeners } from "@/lib/wallet";
import { useToast } from "@/components/ui/use-toast";

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0.00");
  const { toast } = useToast();

  useEffect(() => {
    const cleanup = setupWalletListeners(
      (accounts) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAddress("");
          setBalance("0.00");
        } else {
          setAddress(accounts[0]);
        }
      },
      () => {
        // Reload the page on chain change
        window.location.reload();
      }
    );

    return cleanup;
  }, []);

  const handleConnect = async () => {
    try {
      const { address: newAddress, balance: newBalance } = await connectWallet();
      setIsConnected(true);
      setAddress(newAddress);
      setBalance(newBalance);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    isConnected,
    address,
    balance,
    connect: handleConnect,
  };
}