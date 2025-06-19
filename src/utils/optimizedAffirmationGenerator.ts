
// Optimized affirmation generator with lazy loading and memoization

interface PromptData {
  journalGoals: {
    [key: string]: {
      [key: string]: string[];
    };
  };
}

// Memoized prompt data loader
let cachedPromptData: PromptData | null = null;

const loadPromptData = async (): Promise<PromptData> => {
  if (cachedPromptData) return cachedPromptData;
  
  const response = await fetch('/prompts.json');
  cachedPromptData = await response.json();
  return cachedPromptData;
};

// Optimized random selection with pre-computed array lengths
const getRandomPrompt = (prompts: string[]): string => {
  const index = Math.floor(Math.random() * prompts.length);
  return prompts[index];
};

// Main function to generate optimized affirmations
export const generateOptimizedAffirmation = async (journalType: string, goal: string, promptFocus: string): Promise<string> => {
  try {
    const data = await loadPromptData();
    const prompts = data.journalGoals[goal]?.[journalType];
    
    if (!prompts?.length) {
      return "What are you grateful for today, and how can you build upon that gratitude?";
    }
    
    return getRandomPrompt(prompts);
  } catch (error) {
    console.error('Error loading prompt data:', error);
    return "What are you grateful for today, and how can you build upon that gratitude?";
  }
};
