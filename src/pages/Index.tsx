
import React, { useState } from 'react';
import AffirmationForm from '@/components/affirmation/AffirmationForm';
import AffirmationCard from '@/components/affirmation/AffirmationCard';
import CustomPromptsTab from '@/components/custom/CustomPromptsTab';
import { generateAffirmation, getCategoryEmoji } from '@/utils/affirmationGenerator';
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
      // Generate three unique affirmations
      const newAffirmations = Array.from({ length: 3 }, () => 
        generateAffirmation(category, goal, promptFocus)
      );
      
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
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-10 mx-auto max-w-4xl">
        <header className="text-center mb-10 relative">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BookOpen className="h-8 w-8 text-charcoal" />
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal">
              Life Journal Prompt Generator
            </h1>
          </div>
          <p className="text-lg max-w-lg mx-auto text-charcoal">
            Daily Ideas for Gratitude, Dreams, and More
          </p>
          
          <div className="absolute right-0 top-0">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white hover:bg-red-50 border-red-200"
              onClick={() => setShowFavorites(true)}
              title="Favorites Library"
            >
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border border-gray-200">
            <TabsTrigger 
              value="generated" 
              className="data-[state=active]:bg-pastel-blue data-[state=active]:text-charcoal"
            >
              Generated Prompts
            </TabsTrigger>
            <TabsTrigger 
              value="custom"
              className="data-[state=active]:bg-pastel-green data-[state=active]:text-charcoal"
            >
              Custom Prompts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generated">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
                          className="bg-white shadow-sm animate-float border border-gray-100"
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center justify-center h-64 text-center border border-gray-100">
                    <h3 className="text-xl font-medium mb-3 text-charcoal">
                      Your journal prompts will appear here
                    </h3>
                    <p className="text-charcoal/70">
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
              className="w-6 h-6 animate-float-meditation"
            />
            <p className="text-xl font-medium text-charcoal">
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
