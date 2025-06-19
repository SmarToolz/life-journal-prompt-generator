
import React, { useState, Suspense, lazy } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";
import AffirmationForm from '../components/affirmation/AffirmationForm';
import AffirmationCard from '../components/affirmation/AffirmationCard';

// Lazy load heavy components
const LazyFavoritesLibrary = lazy(() => import('../components/lazy/LazyFavoritesLibrary'));
const LazyCustomPromptsTab = lazy(() => import('../components/lazy/LazyCustomPromptsTab'));

const Index = () => {
  const [currentAffirmations, setCurrentAffirmations] = useState<string[]>([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (category: string, goal: string, promptFocus: string) => {
    setIsGenerating(true);
    try {
      // Import the optimized generator
      const { generateOptimizedAffirmation } = await import('../utils/optimizedAffirmationGenerator');
      
      // Generate 2 prompts
      const [affirmation1, affirmation2] = await Promise.all([
        generateOptimizedAffirmation(category, goal, promptFocus),
        generateOptimizedAffirmation(category, goal, promptFocus)
      ]);
      
      setCurrentAffirmations([affirmation1, affirmation2]);
    } catch (error) {
      console.error('Error generating affirmations:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Daily Journal Prompts
          </h1>
          <p className="text-lg text-gray-700 mb-6 font-medium">
            Transform your thoughts into insights with personalized journal prompts
          </p>
          
          <Button
            onClick={() => setFavoritesOpen(true)}
            className="mb-6 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Heart className="mr-2 h-5 w-5" />
            View Favorites Library
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200 rounded-lg p-1">
            <TabsTrigger 
              value="generate" 
              className="font-semibold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md transition-all duration-200"
            >
              Generate Prompts
            </TabsTrigger>
            <TabsTrigger 
              value="custom" 
              className="font-semibold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md transition-all duration-200"
            >
              Custom Prompts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <AffirmationForm 
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            </div>
            
            {currentAffirmations.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {currentAffirmations.map((affirmation, index) => (
                  <AffirmationCard 
                    key={index} 
                    affirmation={affirmation} 
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="custom">
            <Suspense fallback={
              <div className="w-full bg-gradient-to-br from-green-100 to-emerald-200 border-2 border-green-300 rounded-lg p-8 text-center">
                <div className="animate-pulse text-gray-700 font-medium">Loading custom prompts...</div>
              </div>
            }>
              <LazyCustomPromptsTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>

      {/* Lazy loaded favorites dialog */}
      <Suspense fallback={null}>
        <LazyFavoritesLibrary 
          open={favoritesOpen} 
          onOpenChange={setFavoritesOpen} 
        />
      </Suspense>
    </div>
  );
};

export default Index;
