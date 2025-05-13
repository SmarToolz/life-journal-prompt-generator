
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Heart, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import WaveVisualization from '@/components/visualization/WaveVisualization';
import { useToast } from "@/components/ui/use-toast";
import { FavoriteAffirmation, addFavorite } from '@/utils/favorites';
import { v4 as uuidv4 } from '@/utils/uuid';
import { useTranslation } from '@/utils/translations';

interface AffirmationCardProps {
  affirmation: string;
  category: string;
  isPlaying: boolean;
  togglePlayback: () => void;
  className?: string;
}

const AffirmationCard: React.FC<AffirmationCardProps> = ({
  affirmation,
  category,
  isPlaying,
  togglePlayback,
  className,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(affirmation);
    toast({
      title: t('copied'),
      description: t('affirmationCopiedClipboard'),
    });
  };

  const handleAddToFavorites = () => {
    const favorite: FavoriteAffirmation = {
      id: uuidv4(),
      text: affirmation,
      category,
      timestamp: Date.now(),
      language: 'en', // Now always English
    };
    
    addFavorite(favorite);
    
    toast({
      title: t('addedToFavorites'),
      description: t('affirmationSaved'),
    });
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <WaveVisualization isPlaying={isPlaying} />
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-wide">
            {affirmation}
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={togglePlayback}
            variant="outline"
            size="lg"
            className="rounded-full w-12 h-12 flex items-center justify-center border-primary"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </Button>
          
          <Button
            onClick={handleAddToFavorites}
            variant="outline"
            size="icon"
            className="rounded-full"
            title={t('favorites')}
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={handleCopyToClipboard}
            variant="outline"
            size="icon"
            className="rounded-full"
            title={t('copy')}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffirmationCard;
