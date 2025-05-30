
import React, { useState } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Clipboard, X, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface FavoritesLibraryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FavoritesLibrary: React.FC<FavoritesLibraryProps> = ({ open, onOpenChange }) => {
  const { favorites, removeFavorite, clearAllFavorites } = useFavorites();
  const { toast } = useToast();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Journal prompt copied to clipboard.",
    });
  };

  const handleRemove = (affirmation: string) => {
    removeFavorite(affirmation);
    toast({
      title: "Removed from Favorites",
      description: "Journal prompt removed from your favorites.",
    });
  };

  const handleClearAll = () => {
    clearAllFavorites();
    setConfirmDialogOpen(false);
    toast({
      title: "Favorites Cleared",
      description: "All favorites have been removed.",
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[85vh] overflow-y-auto glass-morphism border-white/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-white drop-shadow-lg">
              Favorites Library
            </DialogTitle>
            <DialogDescription className="text-white/80 drop-shadow-lg">
              Your saved journal prompts for daily inspiration.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            {favorites.length === 0 ? (
              <div className="text-center py-10 text-white/70 drop-shadow-lg">
                No saved journal prompts yet. Generate some prompts and save your favorites!
              </div>
            ) : (
              <>
                {favorites.map((affirmation, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg glass-morphism backdrop-blur-sm relative border border-white/20"
                  >
                    <p className="pr-16 text-white drop-shadow-lg">{affirmation}</p>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleCopy(affirmation)}
                        title="Copy to clipboard"
                        className="text-white hover:text-white hover:bg-white/20"
                      >
                        <Clipboard className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemove(affirmation)}
                        title="Remove from favorites"
                        className="text-white hover:text-white hover:bg-white/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="glass-morphism border-white/30 text-white hover:text-white hover:bg-white/20"
            >
              Close
            </Button>
            {favorites.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={() => setConfirmDialogOpen(true)}
                className="gap-2 bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent className="glass-morphism border-white/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white drop-shadow-lg">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/80 drop-shadow-lg">
              Are you sure you want to clear all your saved journal prompts?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="glass-morphism border-white/30 text-white hover:text-white hover:bg-white/20">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAll} className="bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FavoritesLibrary;
