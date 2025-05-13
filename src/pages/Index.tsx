
import React, { useState, useEffect } from 'react';
import AffirmationForm from '@/components/affirmation/AffirmationForm';
import AffirmationCard from '@/components/affirmation/AffirmationCard';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { generateAffirmation, getCategoryEmoji } from '@/utils/affirmationGenerator';
import { useToast } from "@/components/ui/use-toast";
import { TranslationProvider, useTranslation } from '@/utils/translations';
import VoiceSelector, { VoiceType } from '@/components/settings/VoiceSelector';
import FavoritesLibrary from '@/components/favorites/FavoritesLibrary';
import { v4 as uuidv4 } from '@/utils/uuid';

// Wrapper component that provides translation context
const AppWithTranslation = () => {
  return (
    <TranslationProvider>
      <Index />
    </TranslationProvider>
  );
};

const Index = () => {
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<VoiceType>('female');
  
  const { toast } = useToast();
  const { t } = useTranslation();

  // Initialize voice selection on load
  useEffect(() => {
    const savedVoice = localStorage.getItem('preferred_voice') as VoiceType;
    if (savedVoice && ['male', 'female'].includes(savedVoice)) {
      setSelectedVoice(savedVoice);
    }
  }, []);

  // Save voice preference when changed
  useEffect(() => {
    localStorage.setItem('preferred_voice', selectedVoice);
  }, [selectedVoice]);

  const handleVoiceChange = (voice: VoiceType) => {
    setSelectedVoice(voice);
  };

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
        title: `${getCategoryEmoji(category)} ${t('affirmationWaveGenerator')}`,
        description: t('createPersonalizedAffirmations'),
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
          <div className="flex justify-center gap-3 mb-4">
            <FavoritesLibrary />
            <VoiceSelector selectedVoice={selectedVoice} onVoiceChange={handleVoiceChange} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
            {t('affirmationWaveGenerator')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {t('createPersonalizedAffirmations')}
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
            {affirmations.length > 0 ? (
              <>
                <div className="space-y-6">
                  {affirmations.map((affirmation, index) => (
                    <AffirmationCard 
                      key={uuidv4()}
                      affirmation={affirmation}
                      category={currentCategory}
                      isPlaying={isPlaying && index === 0} // Only show active visualization on first card
                      togglePlayback={togglePlayback}
                      className="bg-white/50 backdrop-blur-sm shadow-lg animate-float"
                    />
                  ))}
                </div>
                
                <AudioPlayer 
                  isPlaying={isPlaying} 
                  selectedVoice={selectedVoice}
                  affirmations={affirmations}
                />
              </>
            ) : (
              <div className="bg-white/30 backdrop-blur-sm p-8 rounded-xl shadow-lg flex flex-col items-center justify-center h-64 text-center">
                <h3 className="text-xl font-medium mb-3">
                  {t('affirmationAppear')}
                </h3>
                <p className="text-muted-foreground">
                  {t('selectCategoryFillForm')}
                </p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>{t('deepBreath')}</p>
        </footer>
      </div>
    </div>
  );
};

// Export the wrapped component
export default AppWithTranslation;
