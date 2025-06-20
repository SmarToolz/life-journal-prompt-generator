
import React, { useState, Suspense } from 'react';
import AffirmationForm from '@/components/affirmation/AffirmationForm';
import AffirmationCard from '@/components/affirmation/AffirmationCard';
import { LazyCustomPromptsTab, LazyFavoritesLibrary, ComponentLoader } from '@/components/LazyComponents';
import { generateUniquePrompts, getCategoryEmoji } from '@/utils/optimizedPromptGenerator';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
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

    setTimeout(() => {
      const newAffirmations = generateUniquePrompts(category, goal, promptFocus, 3);
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
      <div className="fixed inset-0 z-0">
        <div className="solid-background w-full h-full"></div>
      </div>
      
      <div className="relative z-10 container px-4 py-10 mx-auto max-w-4xl">
        <header className="text-center mb-10 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-enhanced-lg mb-4">
            Life Journal Prompt Generator
          </h1>
          <div className="flex flex-col items-center gap-3 mb-3">
            <p className="text-lg max-w-lg text-enhanced font-semibold">
              Daily Ideas for Gratitude, Dreams, and More
            </p>
            <Button 
              variant="outline" 
              size="default" 
              className="colorful-button-outline font-semibold px-6 py-2 transition-all duration-200" 
              onClick={() => setShowFavorites(true)} 
              title="Favorites Library"
            >
              <Heart className="h-5 w-5 mr-2 text-gray-700" />
              My Favorites
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 colorful-tabs">
            <TabsTrigger 
              value="generated" 
              className="data-[state=active]:bg-white/60 data-[state=active]:text-enhanced data-[state=active]:shadow-md text-enhanced font-semibold transition-all duration-200"
            >
              Generated Prompts
            </TabsTrigger>
            <TabsTrigger 
              value="custom" 
              className="data-[state=active]:bg-white/60 data-[state=active]:text-enhanced data-[state=active]:shadow-md text-enhanced font-semibold transition-all duration-200"
            >
              Custom Prompts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generated">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="colorful-form-card p-6 rounded-xl">
                <AffirmationForm onGenerate={handleGenerateAffirmation} isGenerating={isGenerating} />
              </div>

              <div className="space-y-6">
                {affirmations.length > 0 ? (
                  <div className="space-y-6">
                    {affirmations.map((affirmation, index) => (
                      <AffirmationCard 
                        key={`${currentCategory}-${index}`}
                        affirmation={affirmation} 
                        className="colorful-card animate-float" 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="colorful-empty-card p-8 rounded-xl flex flex-col items-center justify-center h-64 text-center">
                    <h3 className="text-xl font-semibold mb-3 text-enhanced">
                      Your journal prompts will appear here
                    </h3>
                    <p className="text-enhanced font-medium">
                      Select options and fill in the form to generate your personalized journal prompts
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <Suspense fallback={<ComponentLoader />}>
              <LazyCustomPromptsTab />
            </Suspense>
          </TabsContent>
        </Tabs>

        <footer className="mt-16 text-center rounded-none">
          <p className="text-enhanced text-2xl font-bold">
            Take a deep breath and let these prompts guide your journaling journey
          </p>
        </footer>
      </div>
      
      <Suspense fallback={<ComponentLoader />}>
        <LazyFavoritesLibrary open={showFavorites} onOpenChange={setShowFavorites} />
      </Suspense>
    </div>
  );
};

export default Index;
