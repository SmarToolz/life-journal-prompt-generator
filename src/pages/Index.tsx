
import React, { useState } from 'react';
import AffirmationForm from '@/components/affirmation/AffirmationForm';
import AffirmationCard from '@/components/affirmation/AffirmationCard';
import CustomPromptsTab from '@/components/custom/CustomPromptsTab';
import { generateUniqueAffirmations, getCategoryEmoji } from '@/utils/affirmationGenerator';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
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
        description: "Your personalized prompts are ready."
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen relative">
      {/* Pastel Background */}
      <div className="fixed inset-0 z-0">
        <div className="pastel-background w-full h-full"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 container px-4 py-10 mx-auto max-w-4xl">
        <header className="text-center mb-10 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-enhanced-lg mb-4 text-shadow-lg">
            Life Journal Prompt Generator
          </h1>
          <div className="flex flex-col items-center gap-3 mb-3">
            <p className="text-lg max-w-lg text-enhanced font-semibold text-shadow">
              Daily Ideas for Gratitude, Dreams, and More
            </p>
            <Button 
              variant="outline" 
              size="default" 
              className="glass-morphism border-white/40 hover:bg-white/30 text-enhanced font-semibold px-6 py-2 text-shadow transition-all duration-200 hover:shadow-lg" 
              onClick={() => setShowFavorites(true)} 
              title="Favorites Library"
            >
              <Heart className="h-5 w-5 mr-2 text-rose-500 drop-shadow-lg" />
              My Favorites
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 glass-morphism border-white/40 shadow-lg">
            <TabsTrigger 
              value="generated" 
              className="data-[state=active]:bg-white/40 data-[state=active]:text-enhanced data-[state=active]:shadow-md text-enhanced font-semibold text-shadow transition-all duration-200"
            >
              Generated Prompts
            </TabsTrigger>
            <TabsTrigger 
              value="custom" 
              className="data-[state=active]:bg-white/40 data-[state=active]:text-enhanced data-[state=active]:shadow-md text-enhanced font-semibold text-shadow transition-all duration-200"
            >
              Custom Prompts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generated">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="glass-morphism border-white/40 p-6 rounded-xl shadow-lg">
                <AffirmationForm onGenerate={handleGenerateAffirmation} isGenerating={isGenerating} />
              </div>

              <div className="space-y-6">
                {affirmations.length > 0 ? (
                  <>
                    <div className="space-y-6">
                      {affirmations.map((affirmation, index) => (
                        <AffirmationCard 
                          key={index} 
                          affirmation={affirmation} 
                          className="glass-morphism animate-float border-white/40 shadow-lg" 
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="glass-morphism border-white/40 p-8 rounded-xl flex flex-col items-center justify-center h-64 text-center shadow-lg">
                    <h3 className="text-xl font-semibold mb-3 text-enhanced text-shadow">
                      Your journal prompts will appear here
                    </h3>
                    <p className="text-enhanced font-medium text-shadow">
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

        <footer className="mt-16 text-center rounded-none">
          <p className="text-enhanced text-2xl font-bold text-shadow-lg">
            Take a deep breath and let these prompts guide your journaling journey
          </p>
        </footer>
      </div>
      
      <FavoritesLibrary open={showFavorites} onOpenChange={setShowFavorites} />
    </div>
  );
};

export default Index;
