"use client";

import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { 
  HandMetal, 
  Dices, 
  Swords, 
  CreditCard, 
  Target,
  Gamepad2
} from "lucide-react";

interface GamesMenuProps {
  open: boolean;
  onClose: () => void;
}

const GAMES = [
  {
    name: "Rock Paper Scissors",
    icon: HandMetal,
    description: "Classic game of chance and strategy",
    comingSoon: true
  },
  {
    name: "Dice Roll",
    icon: Dices,
    description: "Roll the dice and test your luck",
    comingSoon: true
  },
  {
    name: "Battle Arena",
    icon: Swords,
    description: "Compete in PvP battles",
    comingSoon: true
  },
  {
    name: "Card Match",
    icon: CreditCard,
    description: "Memory matching card game",
    comingSoon: true
  },
  {
    name: "Bullseye",
    icon: Target,
    description: "Test your accuracy",
    comingSoon: true
  }
];

export function GamesMenu({ open, onClose }: GamesMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Available Games
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 grid gap-4">
          {GAMES.map((game) => (
            <div
              key={game.name}
              className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 relative overflow-hidden group"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <game.icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium">{game.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {game.description}
                </p>
              </div>

              {game.comingSoon && (
                <div className="absolute right-2 top-2">
                  <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}