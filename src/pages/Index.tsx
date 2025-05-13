
import React, { useState } from 'react';
import AffirmationForm from '@/components/affirmation/AffirmationForm';
import AffirmationCard from '@/components/affirmation/AffirmationCard';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { generateAffirmation, getCategoryEmoji } from '@/utils/affirmationGenerator';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Library } from "lucide-react";
import FavoritesLibrary from '@/components/favorites/FavoritesLibrary';

const Index = () => {
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [isMaleVoice, setIsMaleVoice] = useState<boolean>(true);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const { toast } = useToast();

  const handleGenerateAffirmation = (category: string, goal: string, name: string) => {
    setIsGenerating(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate three unique affirmations
      const newAffirmations = Array.from({ length: 3 }, () => 
        generateAffirmation(category, goal, name)
      );
      
      setAffirmations(newAffirmations);
      setCurrentCategory(category);
      setIsGenerating(false);
      
      toast({
        title: `${getCategoryEmoji(category)} Affirmations Generated`,
        description: "Your personalized affirmations are ready.",
      });
    }, 1500);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleVoice = () => {
    setIsMaleVoice(!isMaleVoice);
  };

  return (
    <div className="min-h-screen ocean-gradient">
      <div className="container px-4 py-10 mx-auto max-w-4xl">
        <header className="text-center mb-10 relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
            Affirmation Wave Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Create personalized affirmations with soothing audio layers to calm your mind and elevate your spirit.
          </p>
          
          <div className="absolute right-0 top-0">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => setShowFavorites(true)}
              title="Favorites Library"
            >
              <Library className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <AffirmationForm 
              onGenerate={handleGenerateAffirmation} 
              isGenerating={isGenerating}
            />
          </div>

          <div className="space-y-6">
            {affirmations.length > 0 ? (
              <>
                <div className="space-y-6">
                  {affirmations.map((affirmation, index) => (
                    <AffirmationCard 
                      key={index}
                      affirmation={affirmation}
                      isPlaying={isPlaying && index === 0} // Only first card shows as playing
                      togglePlayback={togglePlayback}
                      isMale={isMaleVoice}
                      toggleVoice={index === 0 ? toggleVoice : undefined} // Voice toggle only on first card
                      className="bg-white/50 backdrop-blur-sm shadow-lg animate-float"
                    />
                  ))}
                </div>
                
                <AudioPlayer isPlaying={isPlaying} />
              </>
            ) : (
              <div className="bg-white/30 backdrop-blur-sm p-8 rounded-xl shadow-lg flex flex-col items-center justify-center h-64 text-center">
                <h3 className="text-xl font-medium mb-3">
                  Your affirmation will appear here
                </h3>
                <p className="text-muted-foreground">
                  Select a category and fill in the form to generate your personalized affirmation
                </p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Take a deep breath and let these affirmations guide your journey</p>
        </footer>
      </div>
      
      <FavoritesLibrary open={showFavorites} onOpenChange={setShowFavorites} />
    </div>
  );
};

export default Index;
