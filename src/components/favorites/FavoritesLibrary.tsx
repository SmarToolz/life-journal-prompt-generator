
import React, { useState, useEffect } from 'react';
import { FavoriteAffirmation, getFavorites, removeFavorite, clearFavorites } from '@/utils/favorites';
import { Button } from "@/components/ui/button";
import { Heart, Trash2, Copy, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from '@/utils/translations';

const FavoritesLibrary = () => {
  const [favorites, setFavorites] = useState<FavoriteAffirmation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  // Load favorites when dialog opens
  useEffect(() => {
    if (isOpen) {
      setFavorites(getFavorites());
    }
  }, [isOpen]);

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
    setFavorites(getFavorites());
    toast({
      title: t('favoritesRemoved'),
      description: t('affirmationRemovedFromFavorites'),
    });
  };

  const handleClearAll = () => {
    if (confirm(t('confirmClearFavorites'))) {
      clearFavorites();
      setFavorites([]);
      toast({
        title: t('favoritesCleared'),
        description: t('allFavoritesRemoved'),
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t('copied'),
      description: t('affirmationCopiedClipboard'),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span>{t('favorites')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{t('favoritesLibrary')}</DialogTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)} 
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{t('close')}</span>
            </Button>
          </div>
          <DialogDescription>
            {t('savedAffirmations')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-grow pr-2">
          {favorites.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>{t('noSavedAffirmations')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map(item => (
                <div 
                  key={item.id} 
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm relative group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-md leading-relaxed">{item.text}</p>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => copyToClipboard(item.text)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span className="sr-only">{t('copy')}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive"
                        onClick={() => handleRemoveFavorite(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">{t('remove')}</span>
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    <span>{t(item.category as any)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {favorites.length > 0 && (
          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-destructive hover:text-destructive" 
              onClick={handleClearAll}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('clearAll')}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FavoritesLibrary;
