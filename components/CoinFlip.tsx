"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface CoinFlipProps {
  isWalletConnected: boolean;
  onFlip: (amount: string) => Promise<boolean>;
}

export function CoinFlip({ isWalletConnected, onFlip }: CoinFlipProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [betAmount, setBetAmount] = useState("0.1");
  const [rotation, setRotation] = useState(0);
  const { toast } = useToast();

  const handleFlip = async () => {
    setIsFlipping(true);
    setRotation(prev => prev + 1080); // 3 full rotations

    try {
      const won = await onFlip(betAmount);
      
      setTimeout(() => {
        toast({
          title: won ? "You Won! 🎉" : "You Lost 😢",
          description: won 
            ? `Congratulations! You won ${parseFloat(betAmount) * 2} MANTLE`
            : `You lost ${parseFloat(betAmount) * 0.7} MANTLE`,
          variant: won ? "default" : "destructive",
        });
        setIsFlipping(false);
      }, 1500);
    } catch (error) {
      setIsFlipping(false);
      toast({
        title: "Error",
        description: "Something went wrong while flipping the coin",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 mb-4">
      <div className="text-center mb-6">
        <div 
          className="w-32 h-32 mx-auto mb-4 transition-transform duration-[1500ms]"
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          <div className="relative w-full h-full">
            <div className={cn(
              "absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600",
              "flex items-center justify-center text-4xl font-bold text-yellow-100",
              isFlipping ? "animate-pulse" : ""
            )}>
              M
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">Coin Flip</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Double your bet or lose 70%
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Bet Amount</label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            step="0.1"
            min="0.1"
          />
        </div>

        <Button 
          className="w-full"
          onClick={handleFlip}
          disabled={!isWalletConnected || isFlipping}
        >
          {isFlipping ? "Flipping..." : "Flip Coin"}
        </Button>
      </div>
    </Card>
  );
}