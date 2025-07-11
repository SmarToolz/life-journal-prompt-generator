
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
        <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 border-2 border-pink-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-gray-800 font-bold">
              Favorites Library
            </DialogTitle>
            <DialogDescription className="text-gray-700 font-medium">
              Your saved journal prompts for daily inspiration.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            {favorites.length === 0 ? (
              <div className="text-center py-10 text-gray-700 font-medium">
                No saved journal prompts yet. Generate some prompts and save your favorites!
              </div>
            ) : (
              <>
                {favorites.map((affirmation, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 backdrop-blur-sm relative border border-green-200 shadow-lg"
                  >
                    <p className="pr-16 text-gray-800 font-medium">{affirmation}</p>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleCopy(affirmation)}
                        title="Copy to clipboard"
                        className="text-gray-700 hover:text-gray-900 hover:bg-blue-100"
                      >
                        <Clipboard className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemove(affirmation)}
                        title="Remove from favorites"
                        className="text-gray-700 hover:text-gray-900 hover:bg-blue-100"
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
              className="bg-gradient-to-r from-yellow-50 to-blue-50 border-yellow-200 text-gray-800 hover:text-gray-900 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-blue-100 font-medium"
            >
              Close
            </Button>
            {favorites.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={() => setConfirmDialogOpen(true)}
                className="gap-2 bg-red-400/90 hover:bg-red-500/90 text-white font-medium"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent className="bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 border-2 border-pink-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-800 font-bold">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700 font-medium">
              Are you sure you want to clear all your saved journal prompts?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gradient-to-r from-yellow-50 to-blue-50 border-yellow-200 text-gray-800 hover:text-gray-900 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-blue-100 font-medium">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAll} className="bg-red-400/90 hover:bg-red-500/90 text-white font-medium">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FavoritesLibrary;
