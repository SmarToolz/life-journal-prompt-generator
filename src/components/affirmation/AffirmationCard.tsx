
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
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative h-8 overflow-hidden">
        <div className="breathing-wave-animation absolute inset-0 h-full w-full"></div>
      </div>
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-wide text-charcoal">
            {affirmation}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 border-gray-200 hover:bg-gray-50"
            title="Copy to clipboard"
          >
            <Copy className="h-5 w-5 text-charcoal" />
          </Button>
          
          <Button
            onClick={handleFavoriteToggle}
            variant={isFavorited ? "default" : "outline"}
            size="icon"
            className={cn(
              "rounded-full w-10 h-10",
              isFavorited 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "border-gray-200 hover:bg-red-50"
            )}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-5 w-5", isFavorited ? "fill-white" : "text-red-500")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffirmationCard;
