"use client";

import { Gamepad2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function UpcomingGames() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">More Games Coming Soon</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <Gamepad2 className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <Gamepad2 className="w-8 h-8 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}