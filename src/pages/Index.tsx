
import React, { useState } from 'react';
import AffirmationForm from '@/components/affirmation/AffirmationForm';
import AffirmationCard from '@/components/affirmation/AffirmationCard';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { generateAffirmation, getCategoryEmoji } from '@/utils/affirmationGenerator';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [affirmation, setAffirmation] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const { toast } = useToast();

  const handleGenerateAffirmation = (category: string, goal: string, name: string) => {
    setIsGenerating(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const newAffirmation = generateAffirmation(category, goal, name);
      setAffirmation(newAffirmation);
      setCurrentCategory(category);
      setIsGenerating(false);
      
      toast({
        title: `${getCategoryEmoji(category)} Affirmation Generated`,
        description: "Your personalized affirmation is ready.",
      });
    }, 1500);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen ocean-gradient">
      <div className="container px-4 py-10 mx-auto max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
            Affirmation Wave Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Create personalized affirmations with soothing audio layers to calm your mind and elevate your spirit.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <AffirmationForm 
              onGenerate={handleGenerateAffirmation} 
              isGenerating={isGenerating}
            />
          </div>

          <div className="space-y-6">
            {affirmation ? (
              <>
                <AffirmationCard 
                  affirmation={affirmation}
                  isPlaying={isPlaying}
                  togglePlayback={togglePlayback}
                  className="bg-white/50 backdrop-blur-sm shadow-lg animate-float"
                />
                
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
    </div>
  );
};

export default Index;
