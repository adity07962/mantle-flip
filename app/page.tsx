"use client";

import { Header } from "@/components/Header";
import { CoinFlip } from "@/components/CoinFlip";
import { UpcomingGames } from "@/components/UpcomingGames";
import { NavigationBar } from "@/components/NavigationBar";
import { flipCoin } from "@/lib/wallet";
import { Toaster } from "@/components/ui/toaster";
import { useWallet } from "@/hooks/useWallet";

export default function Home() {
  const { isConnected, balance, connect } = useWallet();

  const handleFlip = async (amount: string): Promise<boolean> => {
    const won = await flipCoin(amount);
    return won;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <Header 
        isWalletConnected={isConnected}
        balance={balance}
        onConnectWallet={connect}
      />
      
      <div className="flex-1 p-4">
        <CoinFlip 
          isWalletConnected={isConnected}
          onFlip={handleFlip}
        />
        <UpcomingGames />
      </div>

      <NavigationBar />
      <Toaster />
    </div>
  );
}