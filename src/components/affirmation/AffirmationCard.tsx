
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from "@/hooks/use-toast";

interface AffirmationCardProps {
  affirmation: string;
  className?: string;
}

const AffirmationCard: React.FC<AffirmationCardProps> = ({
  affirmation,
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
      description: "Journal prompt copied to clipboard.",
    });
  };

  return (
    <Card className={cn("overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300", className)}>
      <div className="relative h-8 overflow-hidden">
        <div className="breathing-wave-animation absolute inset-0 h-full w-full"></div>
      </div>
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-wide text-enhanced text-shadow">
            {affirmation}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 glass-morphism border-white/50 hover:bg-gradient-to-r hover:from-blue-100/60 hover:to-purple-100/60 text-enhanced shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
            title="Copy to clipboard"
          >
            <Copy className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={handleFavoriteToggle}
            variant={isFavorited ? "default" : "outline"}
            size="icon"
            className={cn(
              "rounded-full w-10 h-10 transition-all duration-200 transform hover:scale-110",
              isFavorited 
                ? "bg-gradient-to-r from-rose-400/90 to-pink-400/90 hover:from-rose-500/90 hover:to-pink-500/90 text-white backdrop-blur-sm shadow-lg hover:shadow-xl border-none" 
                : "glass-morphism border-white/50 hover:bg-gradient-to-r hover:from-rose-100/60 hover:to-pink-100/60 text-enhanced shadow-md hover:shadow-lg"
            )}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-5 w-5", isFavorited ? "fill-white text-white" : "text-rose-500")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffirmationCard;
