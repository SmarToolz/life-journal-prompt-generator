
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Heart, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from "@/components/ui/use-toast";

interface AffirmationCardProps {
  affirmation: string;
  isPlaying: boolean;
  isMale?: boolean;
  togglePlayback: () => void;
  toggleVoice?: () => void;
  className?: string;
}

const AffirmationCard: React.FC<AffirmationCardProps> = ({
  affirmation,
  isPlaying,
  isMale,
  togglePlayback,
  toggleVoice,
  className,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();
  const isFavorited = isFavorite(affirmation);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFavorite(affirmation);
      toast({
        title: "Removed from Favorites",
        description: "Affirmation removed from your favorites.",
      });
    } else {
      addFavorite(affirmation);
      toast({
        title: "Added to Favorites",
        description: "Affirmation saved to your favorites.",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(affirmation);
    toast({
      title: "Copied",
      description: "Affirmation copied to clipboard.",
    });
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative h-8 overflow-hidden">
        <div className="animated-wave absolute inset-0 h-full w-full opacity-70"></div>
      </div>
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-wide">
            {affirmation}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={togglePlayback}
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 flex items-center justify-center border-primary"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </Button>
          
          {toggleVoice && (
            <Button
              onClick={toggleVoice}
              variant="outline"
              size="sm"
              className="text-xs"
              title="Toggle voice"
            >
              {isMale ? "Male Voice" : "Female Voice"}
            </Button>
          )}
          
          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={handleFavoriteToggle}
            variant={isFavorited ? "default" : "outline"}
            size="icon"
            className={cn(
              "rounded-full w-10 h-10",
              isFavorited && "bg-primary text-primary-foreground"
            )}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffirmationCard;
