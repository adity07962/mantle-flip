"use client";

import { Wallet2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  isWalletConnected: boolean;
  balance: string;
  onConnectWallet: () => void;
}

export function Header({ isWalletConnected, balance, onConnectWallet }: HeaderProps) {
  return (
    <div className="p-4 border-b">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">MantleFlip</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isWalletConnected ? (
            <div className="flex items-center gap-2">
              <Wallet2 className="h-5 w-5" />
              <span>{balance} MANTLE</span>
            </div>
          ) : (
            <Button onClick={onConnectWallet} variant="outline" size="sm">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}