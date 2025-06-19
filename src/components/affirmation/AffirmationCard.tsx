
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
    <Card className={cn("overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 border-2 border-pink-200/30", className)}>
      <div className="relative h-8 overflow-hidden">
        <div className="breathing-wave-animation absolute inset-0 h-full w-full"></div>
      </div>
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-wide text-enhanced">
            {affirmation}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200 hover:from-blue-200 hover:to-purple-200 text-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
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
                ? "bg-gradient-to-r from-rose-200 to-pink-200 hover:from-rose-300 hover:to-pink-300 text-gray-700 shadow-lg hover:shadow-xl border-rose-200" 
                : "bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 text-gray-700 shadow-lg hover:shadow-xl border-rose-100"
            )}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-5 w-5", isFavorited ? "fill-gray-700 text-gray-700" : "text-gray-700")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffirmationCard;
