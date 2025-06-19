
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

// Get multiple unique prompts
const getMultipleRandomPrompts = (prompts: string[], count: number): string[] => {
  if (prompts.length <= count) {
    // If we don't have enough prompts, return all available and fill with duplicates
    return [...prompts, ...prompts.slice(0, count - prompts.length)];
  }
  
  const selectedPrompts: string[] = [];
  const usedIndices = new Set<number>();
  
  while (selectedPrompts.length < count) {
    const index = Math.floor(Math.random() * prompts.length);
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      selectedPrompts.push(prompts[index]);
    }
  }
  
  return selectedPrompts;
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

// Function to generate multiple prompts at once
export const generateMultipleOptimizedAffirmations = async (journalType: string, goal: string, promptFocus: string, count: number = 2): Promise<string[]> => {
  try {
    const data = await loadPromptData();
    const prompts = data.journalGoals[goal]?.[journalType];
    
    if (!prompts?.length) {
      const fallbackPrompt = "What are you grateful for today, and how can you build upon that gratitude?";
      return Array(count).fill(fallbackPrompt);
    }
    
    return getMultipleRandomPrompts(prompts, count);
  } catch (error) {
    console.error('Error loading prompt data:', error);
    const fallbackPrompt = "What are you grateful for today, and how can you build upon that gratitude?";
    return Array(count).fill(fallbackPrompt);
  }
};
