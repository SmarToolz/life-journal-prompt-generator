
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
        <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[85vh] overflow-y-auto glass-morphism border-blue-200/40">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-enhanced-lg">
              Favorites Library
            </DialogTitle>
            <DialogDescription className="text-enhanced">
              Your saved journal prompts for daily inspiration.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            {favorites.length === 0 ? (
              <div className="text-center py-10 text-enhanced">
                No saved journal prompts yet. Generate some prompts and save your favorites!
              </div>
            ) : (
              <>
                {favorites.map((affirmation, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg glass-morphism backdrop-blur-sm relative border border-blue-200/30"
                  >
                    <p className="pr-16 text-enhanced">{affirmation}</p>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleCopy(affirmation)}
                        title="Copy to clipboard"
                        className="text-enhanced hover:text-enhanced hover:bg-blue-100/30"
                      >
                        <Clipboard className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemove(affirmation)}
                        title="Remove from favorites"
                        className="text-enhanced hover:text-enhanced hover:bg-blue-100/30"
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
              className="glass-morphism border-blue-200/40 text-enhanced hover:text-enhanced hover:bg-blue-100/30"
            >
              Close
            </Button>
            {favorites.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={() => setConfirmDialogOpen(true)}
                className="gap-2 bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm text-white"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent className="glass-morphism border-blue-200/40">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-enhanced-lg">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-enhanced">
              Are you sure you want to clear all your saved journal prompts?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="glass-morphism border-blue-200/40 text-enhanced hover:text-enhanced hover:bg-blue-100/30">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAll} className="bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm text-white">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Dialog>
    </>
  );
};

export default FavoritesLibrary;
