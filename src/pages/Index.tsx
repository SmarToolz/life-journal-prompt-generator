import React, { useState, Suspense, lazy } from 'react';
import AffirmationForm from '@/components/affirmation/AffirmationForm';
import AffirmationCard from '@/components/affirmation/AffirmationCard';
import { generateUniquePrompts, getCategoryEmoji } from '@/utils/optimizedPromptGenerator';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Lazy load heavy components only when needed
const LazyCustomPromptsTab = lazy(() => import('@/components/custom/CustomPromptsTab'));
const LazyFavoritesLibrary = lazy(() => import('@/components/favorites/FavoritesLibrary'));

// Minimal loading component
const ComponentLoader = () => <div className="flex items-center justify-center p-4" role="status" aria-label="Loading">
    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>;
const Index = () => {
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("generated");
  const [generationCount, setGenerationCount] = useState<number>(0);
  const {
    toast
  } = useToast();
  const handleGenerateAffirmation = async (category: string, goal: string, promptFocus: string) => {
    setIsGenerating(true);
    try {
      const newAffirmations = await generateUniquePrompts(category, goal, promptFocus, 2);
      setAffirmations(newAffirmations);
      setCurrentCategory(category);
      setGenerationCount(prev => prev + 1);
      setIsGenerating(false);
      toast({
        title: `${getCategoryEmoji(category)} Journal Prompts Generated`,
        description: "Your personalized prompts are ready."
      });
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Failed to generate prompts. Please try again."
      });
    }
  };
  return <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <div className="solid-background w-full h-full"></div>
      </div>
      
      <div className="relative z-10 container px-4 py-6 sm:py-10 mx-auto max-w-4xl">
        <header className="text-center mb-6 sm:mb-10 relative">
          <h1 className="text-2xl sm:text-3xl font-bold text-enhanced-lg mb-3 sm:mb-4 my-[33px] text-cyan-800 md:text-4xl">
            Life Journal Prompt Generator
          </h1>
          <div className="flex flex-col items-center gap-2 sm:gap-3 mb-3">
            <p className="text-base max-w-lg text-enhanced font-semibold py-[5px] px-[35px] my-0 mx-0 sm:text-xl">Unlock your potential with journal prompts for self-growth, and craft your journey with our journal prompt tool.</p>
            <Button variant="outline" size="default" className="colorful-button-outline font-semibold px-4 sm:px-6 py-2 transition-all duration-200 text-sm sm:text-base" onClick={() => setShowFavorites(true)} title="Favorites Library">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-gray-700" />
              My Favorites
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 colorful-tabs">
            <TabsTrigger value="generated" className="data-[state=active]:bg-white/60 data-[state=active]:text-enhanced data-[state=active]:shadow-md text-enhanced font-semibold transition-all duration-200 text-sm sm:text-base">
              Generated Prompts
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-white/60 data-[state=active]:text-enhanced data-[state=active]:shadow-md text-enhanced font-semibold transition-all duration-200 text-sm sm:text-base">
              Custom Prompts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generated">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
              <div className="colorful-form-card p-4 sm:p-6 rounded-xl">
                <AffirmationForm onGenerate={handleGenerateAffirmation} isGenerating={isGenerating} />
              </div>

              <div className="space-y-4 sm:space-y-6">
                {affirmations.length > 0 ? <div className="space-y-4 sm:space-y-6">
                    {affirmations.map((affirmation, index) => <AffirmationCard key={`generation-${generationCount}-${index}`} affirmation={affirmation} className="colorful-card animate-gentle-float" />)}
                  </div> : <div className="colorful-empty-card p-6 sm:p-8 rounded-xl flex flex-col items-center justify-center h-48 sm:h-64 text-center">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-enhanced">
                      Your journal prompts will appear here
                    </h2>
                    <p className="text-sm sm:text-base text-enhanced font-medium px-4">
                      Select options and fill in the form to generate your personalized journal prompts
                    </p>
                  </div>}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            {activeTab === "custom" && <Suspense fallback={<ComponentLoader />}>
                <LazyCustomPromptsTab />
              </Suspense>}
          </TabsContent>
        </Tabs>

        <footer className="mt-12 sm:mt-16 text-center rounded-none">
          
        </footer>
      </div>
      
      {showFavorites && <Suspense fallback={<ComponentLoader />}>
          <LazyFavoritesLibrary open={showFavorites} onOpenChange={setShowFavorites} />
        </Suspense>}
    </div>;
};
export default Index;