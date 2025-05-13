
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface AffirmationCardProps {
  affirmation: string;
  isPlaying: boolean;
  togglePlayback: () => void;
  className?: string;
}

const AffirmationCard: React.FC<AffirmationCardProps> = ({
  affirmation,
  isPlaying,
  togglePlayback,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative h-2 overflow-hidden">
        <div className="wave-pattern absolute inset-0 h-full w-full opacity-70"></div>
      </div>
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-wide">
            {affirmation}
          </p>
        </div>
        
        <Button
          onClick={togglePlayback}
          variant="outline"
          size="lg"
          className="rounded-full w-12 h-12 flex items-center justify-center border-primary"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AffirmationCard;
