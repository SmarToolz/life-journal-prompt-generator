import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ko' | 'zh';

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
  | 'language' | 'english' | 'spanish' | 'french' | 'german' | 'italian'
  | 'japanese' | 'korean' | 'chinese';

interface Translations {
  [key: string]: {
    [key in TranslationKey]: string;
  };
}

interface TranslationContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
  availableLanguages: {code: Language, name: string}[];
}

const translations: Translations = {
  en: {
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
    
    // Language options
    'language': 'Language',
    'english': 'English',
    'spanish': 'Spanish',
    'french': 'French',
    'german': 'German',
    'italian': 'Italian',
    'japanese': 'Japanese',
    'korean': 'Korean',
    'chinese': 'Chinese'
  },
  
  es: {
    // Categories
    'self-love': 'Amor Propio y Confianza',
    'health': 'Salud y Bienestar',
    'career': 'Carrera y Éxito',
    'relationship': 'Relaciones y Amor',
    'gratitude': 'Gratitud y Positividad',
    'stress': 'Alivio del Estrés y Ansiedad',
    'motivation': 'Motivación y Productividad',
    'abundance': 'Abundancia y Riqueza',
    'mindfulness': 'Mindfulness y Paz Interior',
    'goals': 'Logro de Objetivos',
    
    // UI elements
    'affirmationWaveGenerator': 'Generador de Afirmaciones Wave',
    'createPersonalizedAffirmations': 'Crea afirmaciones personalizadas con capas de audio relajantes para calmar tu mente y elevar tu espíritu.',
    'chooseCategory': 'Elige tu Categoría de Afirmación',
    'describeGoal': 'Describe tu objetivo o intención actual',
    'yourName': 'Tu nombre',
    'generateAffirmation': 'Generar Afirmación',
    'nameOptional': 'opcional',
    'selectCategory': 'Selecciona una categoría',
    'goalPlaceholder': 'ej., \'Quiero sentirme más seguro en el trabajo\'',
    'namePlaceholder': 'Ingresa tu nombre para afirmaciones personalizadas',
    'generating': 'Generando...',
    'affirmationAppear': 'Tu afirmación aparecerá aquí',
    'selectCategoryFillForm': 'Selecciona una categoría y completa el formulario para generar tu afirmación personalizada',
    'deepBreath': 'Respira profundamente y deja que estas afirmaciones guíen tu camino',
    
    // Favorites
    'favorites': 'Favoritos',
    'favoritesLibrary': 'Biblioteca de Favoritos',
    'savedAffirmations': 'Tus afirmaciones guardadas para inspirarte diariamente.',
    'noSavedAffirmations': 'Aún no hay afirmaciones guardadas. ¡Genera algunas afirmaciones y guarda tus favoritas!',
    'close': 'Cerrar',
    'copy': 'Copiar',
    'remove': 'Eliminar',
    'clearAll': 'Borrar Todo',
    'confirmClearFavorites': '¿Estás seguro de que deseas borrar todas tus afirmaciones guardadas?',
    'favoritesCleared': 'Favoritos Borrados',
    'allFavoritesRemoved': 'Todos los favoritos han sido eliminados.',
    'copied': 'Copiado',
    'affirmationCopiedClipboard': 'Afirmación copiada al portapapeles.',
    'favoritesRemoved': 'Eliminado de Favoritos',
    'affirmationRemovedFromFavorites': 'Afirmación eliminada de tus favoritos.',
    'addedToFavorites': 'Añadido a Favoritos',
    'affirmationSaved': 'Afirmación guardada en tus favoritos.',
    
    // Voice options
    'voiceSelection': 'Selección de Voz',
    'maleVoice': 'Voz Masculina',
    'femaleVoice': 'Voz Femenina',
    
    // Language options
    'language': 'Idioma',
    'english': 'Inglés',
    'spanish': 'Español',
    'french': 'Francés',
    'german': 'Alemán',
    'italian': 'Italiano',
    'japanese': 'Japonés',
    'korean': 'Coreano',
    'chinese': 'Chino'
  },
  
  fr: {
    // Categories - simplified for brevity
    'self-love': 'Amour de Soi et Confiance',
    'health': 'Santé et Bien-être',
    'career': 'Carrière et Réussite',
    'relationship': 'Relations et Amour',
    'gratitude': 'Gratitude et Positivité',
    'stress': 'Soulagement du Stress et de l\'Anxiété',
    'motivation': 'Motivation et Productivité',
    'abundance': 'Abondance et Richesse',
    'mindfulness': 'Pleine Conscience et Paix Intérieure',
    'goals': 'Réalisation d\'Objectifs',
    
    // UI elements - simplified for brevity
    'affirmationWaveGenerator': 'Générateur d\'Affirmations Wave',
    'createPersonalizedAffirmations': 'Créez des affirmations personnalisées avec des couches audio apaisantes pour calmer votre esprit.',
    'chooseCategory': 'Choisissez votre Catégorie d\'Affirmation',
    'describeGoal': 'Décrivez votre objectif ou intention actuelle',
    'yourName': 'Votre nom',
    'generateAffirmation': 'Générer une Affirmation',
    'nameOptional': 'optionnel',
    'selectCategory': 'Sélectionnez une catégorie',
    'goalPlaceholder': 'ex., \'Je veux me sentir plus confiant au travail\'',
    'namePlaceholder': 'Entrez votre nom pour des affirmations personnalisées',
    'generating': 'Génération en cours...',
    'affirmationAppear': 'Votre affirmation apparaîtra ici',
    'selectCategoryFillForm': 'Sélectionnez une catégorie et remplissez le formulaire pour générer votre affirmation personnalisée',
    'deepBreath': 'Respirez profondément et laissez ces affirmations guider votre chemin',
    
    // Favorites - simplified for brevity
    'favorites': 'Favoris',
    'favoritesLibrary': 'Bibliothèque des Favoris',
    'savedAffirmations': 'Vos affirmations sauvegardées pour l\'inspiration quotidienne.',
    'noSavedAffirmations': 'Pas encore d\'affirmations sauvegardées. Générez des affirmations et sauvegardez vos favorites!',
    'close': 'Fermer',
    'copy': 'Copier',
    'remove': 'Supprimer',
    'clearAll': 'Tout Effacer',
    'confirmClearFavorites': 'Êtes-vous sûr de vouloir effacer toutes vos affirmations sauvegardées?',
    'favoritesCleared': 'Favoris Effacés',
    'allFavoritesRemoved': 'Tous les favoris ont été supprimés.',
    'copied': 'Copié',
    'affirmationCopiedClipboard': 'Affirmation copiée dans le presse-papiers.',
    'favoritesRemoved': 'Retiré des Favoris',
    'affirmationRemovedFromFavorites': 'Affirmation retirée de vos favoris.',
    'addedToFavorites': 'Ajouté aux Favoris',
    'affirmationSaved': 'Affirmation sauvegardée dans vos favoris.',
    
    // Voice options
    'voiceSelection': 'Sélection de Voix',
    'maleVoice': 'Voix Masculine',
    'femaleVoice': 'Voix Féminine',
    
    // Language options
    'language': 'Langue',
    'english': 'Anglais',
    'spanish': 'Espagnol',
    'french': 'Français',
    'german': 'Allemand',
    'italian': 'Italien',
    'japanese': 'Japonais',
    'korean': 'Coréen',
    'chinese': 'Chinois'
  },
  
  // Adding minimal German translation for demo purposes
  de: {
    // Categories - just include a few as example
    'self-love': 'Selbstliebe & Selbstvertrauen',
    'health': 'Gesundheit & Wohlbefinden',
    'career': 'Karriere & Erfolg',
    // ... other translations would be here
    
    // UI elements - just a few essential ones
    'affirmationWaveGenerator': 'Affirmations-Wellen-Generator',
    'generateAffirmation': 'Affirmation Generieren',
    'favorites': 'Favoriten',
    'language': 'Sprache',
    'english': 'Englisch',
    'spanish': 'Spanisch',
    'french': 'Französisch',
    'german': 'Deutsch',
    'italian': 'Italienisch',
    'japanese': 'Japanisch',
    'korean': 'Koreanisch',
    'chinese': 'Chinesisch',
    
    // Fill with English translations for missing keys
    'relationship': 'Relationship & Love',
    'gratitude': 'Gratitude & Positivity',
    'stress': 'Stress & Anxiety Relief',
    'motivation': 'Motivation & Productivity',
    'abundance': 'Abundance & Wealth',
    'mindfulness': 'Mindfulness & Inner Peace',
    'goals': 'Goal Achievement',
    'createPersonalizedAffirmations': 'Create personalized affirmations with soothing audio layers to calm your mind and elevate your spirit.',
    'chooseCategory': 'Choose Your Affirmation Category',
    'describeGoal': 'Describe your current goal or intention',
    'yourName': 'Your name',
    'nameOptional': 'optional',
    'selectCategory': 'Select a category',
    'goalPlaceholder': 'e.g., \'I want to feel more confident at work\'',
    'namePlaceholder': 'Enter your name for personalized affirmations',
    'generating': 'Generating...',
    'affirmationAppear': 'Your affirmation will appear here',
    'selectCategoryFillForm': 'Select a category and fill in the form to generate your personalized affirmation',
    'deepBreath': 'Take a deep breath and let these affirmations guide your journey',
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
    'voiceSelection': 'Voice Selection',
    'maleVoice': 'Male Voice',
    'femaleVoice': 'Female Voice'
  }
};

// Add placeholder translations for remaining languages
const placeholderLanguages = ['it', 'ja', 'ko', 'zh'];
placeholderLanguages.forEach(lang => {
  translations[lang] = { ...translations['en'] };
});

const TranslationContext = createContext<TranslationContextType>({
  currentLanguage: 'en',
  setLanguage: () => {},
  t: (key) => key,
  availableLanguages: []
});

export interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred_language');
    if (savedLang && ['en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'zh'].includes(savedLang)) {
      setLanguage(savedLang as Language);
    }
  }, []);
  
  // Save language preference to localStorage when changed
  useEffect(() => {
    localStorage.setItem('preferred_language', language);
  }, [language]);
  
  const t = (key: TranslationKey): string => {
    if (!translations[language]) return translations['en'][key] || key;
    return translations[language][key] || translations['en'][key] || key;
  };
  
  const availableLanguages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'es' as Language, name: 'Español' },
    { code: 'fr' as Language, name: 'Français' },
    { code: 'de' as Language, name: 'Deutsch' },
    { code: 'it' as Language, name: 'Italiano' },
    { code: 'ja' as Language, name: '日本語' },
    { code: 'ko' as Language, name: '한국어' },
    { code: 'zh' as Language, name: '中文' }
  ];
  
  const value = {
    currentLanguage: language,
    setLanguage,
    t,
    availableLanguages
  };
  
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
