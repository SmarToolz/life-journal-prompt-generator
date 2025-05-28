
import React, { useState } from 'react';
import AffirmationForm from '@/components/affirmation/AffirmationForm';
import AffirmationCard from '@/components/affirmation/AffirmationCard';
import CustomPromptsTab from '@/components/custom/CustomPromptsTab';
import { generateUniqueAffirmations, getCategoryEmoji } from '@/utils/affirmationGenerator';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen } from "lucide-react";
import FavoritesLibrary from '@/components/favorites/FavoritesLibrary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("generated");
  const { toast } = useToast();

  const handleGenerateAffirmation = (category: string, goal: string, promptFocus: string) => {
    setIsGenerating(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate three unique affirmations using the new function
      const newAffirmations = generateUniqueAffirmations(category, goal, promptFocus, 3);
      
      setAffirmations(newAffirmations);
      setCurrentCategory(category);
      setIsGenerating(false);
      
      toast({
        title: `${getCategoryEmoji(category)} Journal Prompts Generated`,
        description: "Your personalized prompts are ready.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen galaxy-background">
      <div className="container px-4 py-10 mx-auto max-w-4xl">
        <header className="text-center mb-10 relative">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BookOpen className="h-8 w-8 text-white drop-shadow-lg" />
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full glass-morphism border-white/20 hover:bg-white/20"
              onClick={() => setShowFavorites(true)}
              title="Favorites Library"
            >
              <Heart className="h-6 w-6 text-white drop-shadow-lg" />
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl mb-3">
            Life Journal Prompt Generator
          </h1>
          <p className="text-lg max-w-lg mx-auto text-white/90 drop-shadow-lg">
            Daily Ideas for Gratitude, Dreams, and More
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 glass-morphism border-white/20">
            <TabsTrigger 
              value="generated" 
              className="data-[state=active]:bg-white/30 data-[state=active]:text-white text-white/80"
            >
              Generated Prompts
            </TabsTrigger>
            <TabsTrigger 
              value="custom"
              className="data-[state=active]:bg-white/30 data-[state=active]:text-white text-white/80"
            >
              Custom Prompts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generated">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="glass-morphism border-white/20 p-6 rounded-xl">
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
                          className="glass-morphism animate-float border-white/20"
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="glass-morphism border-white/20 p-8 rounded-xl flex flex-col items-center justify-center h-64 text-center">
                    <h3 className="text-xl font-medium mb-3 text-white drop-shadow-lg">
                      Your journal prompts will appear here
                    </h3>
                    <p className="text-white/80 drop-shadow-lg">
                      Select options and fill in the form to generate your personalized journal prompts
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <CustomPromptsTab />
          </TabsContent>
        </Tabs>

        <footer className="mt-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img 
              src="/lovable-uploads/515855b2-0759-4b67-aec5-26ca9e56c57e.png" 
              alt="Meditation" 
              className="w-48 h-48 animate-float-meditation drop-shadow-lg"
            />
            <p className="text-xl font-medium text-white drop-shadow-lg">
              Take a deep breath and let these prompts guide your journaling journey
            </p>
          </div>
        </footer>
      </div>
      
      <FavoritesLibrary open={showFavorites} onOpenChange={setShowFavorites} />
    </div>
  );
};

export default Index;
