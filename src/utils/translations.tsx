import { createContext, useContext, ReactNode } from 'react';

// Keep only the translation keys needed for the app
type TranslationKey = 
  // Affirmation categories
  | 'self-love' | 'health' | 'career' | 'relationship' | 'gratitude'
  | 'stress' | 'motivation' | 'abundance' | 'mindfulness' | 'goals'
  // UI elements
  | 'affirmationWaveGenerator' | 'createPersonalizedAffirmations' | 'chooseCategory'
  | 'describeGoal' | 'yourName' | 'generateAffirmation' | 'nameOptional'
  | 'selectCategory' | 'goalPlaceholder' | 'namePlaceholder' | 'generating'
  | 'affirmationAppear' | 'selectCategoryFillForm' | 'deepBreath'
  // New features
  | 'favorites' | 'favoritesLibrary' | 'savedAffirmations' | 'noSavedAffirmations'
  | 'close' | 'copy' | 'remove' | 'clearAll' | 'confirmClearFavorites'
  | 'favoritesCleared' | 'allFavoritesRemoved' | 'copied' | 'affirmationCopiedClipboard'
  | 'favoritesRemoved' | 'affirmationRemovedFromFavorites' | 'addedToFavorites'
  | 'affirmationSaved' | 'voiceSelection' | 'maleVoice' | 'femaleVoice'
  | 'language' | string;  // Allow string to fix type errors with categories

// English translations only
const translations: Record<TranslationKey, string> = {
  // Categories
  'self-love': 'Self-Love & Confidence',
  'health': 'Health & Wellness',
  'career': 'Career & Success',
  'relationship': 'Relationship & Love',
  'gratitude': 'Gratitude & Positivity',
  'stress': 'Stress & Anxiety Relief',
  'motivation': 'Motivation & Productivity',
  'abundance': 'Abundance & Wealth',
  'mindfulness': 'Mindfulness & Inner Peace',
  'goals': 'Goal Achievement',
  
  // UI elements
  'affirmationWaveGenerator': 'Affirmation Wave Generator',
  'createPersonalizedAffirmations': 'Create personalized affirmations with soothing audio layers to calm your mind and elevate your spirit.',
  'chooseCategory': 'Choose Your Affirmation Category',
  'describeGoal': 'Describe your current goal or intention',
  'yourName': 'Your name',
  'generateAffirmation': 'Generate Affirmation',
  'nameOptional': 'optional',
  'selectCategory': 'Select a category',
  'goalPlaceholder': 'e.g., \'I want to feel more confident at work\'',
  'namePlaceholder': 'Enter your name for personalized affirmations',
  'generating': 'Generating...',
  'affirmationAppear': 'Your affirmation will appear here',
  'selectCategoryFillForm': 'Select a category and fill in the form to generate your personalized affirmation',
  'deepBreath': 'Take a deep breath and let these affirmations guide your journey',
  
  // Favorites
  'favorites': 'Favorites',
  'favoritesLibrary': 'Favorites Library',
  'savedAffirmations': 'Your saved affirmations for daily inspiration.',
  'noSavedAffirmations': 'No saved affirmations yet. Generate some affirmations and save your favorites!',
  'close': 'Close',
  'copy': 'Copy',
  'remove': 'Remove',
  'clearAll': 'Clear All',
  'confirmClearFavorites': 'Are you sure you want to clear all your saved affirmations?',
  'favoritesCleared': 'Favorites Cleared',
  'allFavoritesRemoved': 'All favorites have been removed.',
  'copied': 'Copied',
  'affirmationCopiedClipboard': 'Affirmation copied to clipboard.',
  'favoritesRemoved': 'Removed from Favorites',
  'affirmationRemovedFromFavorites': 'Affirmation removed from your favorites.',
  'addedToFavorites': 'Added to Favorites',
  'affirmationSaved': 'Affirmation saved to your favorites.',
  
  // Voice options
  'voiceSelection': 'Voice Selection',
  'maleVoice': 'Male Voice',
  'femaleVoice': 'Female Voice',
  
  // Language option (keeping this for backward compatibility)
  'language': 'Language'
};

interface TranslationContextType {
  t: (key: TranslationKey) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  t: (key) => key,
});

export interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  // Simplified translation function that just returns English text
  const t = (key: TranslationKey): string => {
    return translations[key] || key;
  };
  
  const value = {
    t
  };
  
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
