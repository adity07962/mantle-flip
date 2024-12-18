"use client";

import { Coins, Gamepad2, Gift, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GamesMenu } from "./GamesMenu";

export function NavigationBar() {
  const [showGames, setShowGames] = useState(false);

  return (
    <>
      <GamesMenu open={showGames} onClose={() => setShowGames(false)} />
      
      <div className="border-t bg-background fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <nav className="flex justify-around p-4">
          <Button variant="ghost" className="flex flex-col items-center">
            <Coins className="h-5 w-5" />
            <span className="text-xs">Flip</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center"
            onClick={() => setShowGames(true)}
          >
            <Gamepad2 className="h-5 w-5" />
            <span className="text-xs">Games</span>
          </Button>

          <Button variant="ghost" className="flex flex-col items-center">
            <Gift className="h-5 w-5" />
            <span className="text-xs">Airdrop</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center">
            <Menu className="h-5 w-5" />
            <span className="text-xs">More</span>
          </Button>
        </nav>
      </div>
    </>
  );
}