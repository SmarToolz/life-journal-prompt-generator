
// Optimized affirmation generator with error handling and unique prompt generation

interface PromptData {
  journalGoals: {
    [key: string]: {
      [key: string]: string[];
    };
  };
}

// Memoized prompt data loader with better error handling
let cachedPromptData: PromptData | null = null;

const loadPromptData = async (): Promise<PromptData> => {
  if (cachedPromptData) return cachedPromptData;
  
  try {
    const response = await fetch('/prompts.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    console.log('Raw JSON length:', text.length);
    
    // Try to parse the JSON
    cachedPromptData = JSON.parse(text);
    console.log('Loaded prompt data structure:', Object.keys(cachedPromptData.journalGoals));
    return cachedPromptData;
  } catch (error) {
    console.error('Error loading prompts.json:', error);
    // Return fallback data structure
    return {
      journalGoals: {
        "Standard Entry": {
          "Standard": [
            "What happened today that you want to record?",
            "What are you grateful for today, and how can you build upon that gratitude?",
            "Describe a challenge you faced recently and what you learned from it.",
            "What is one small step you can take today toward a goal that matters to you?",
            "Reflect on a moment today when you felt genuinely happy. What made it special?"
          ]
        },
        "Self-Reflection": {
          "Standard": [
            "What patterns in your thoughts or behaviors have you noticed lately?",
            "How have you grown in the past month, and what evidence supports this growth?",
            "What values are most important to you right now, and how are you living them?",
            "What would your future self thank you for doing today?",
            "What story are you telling yourself about your current situation, and is it serving you?"
          ]
        },
        "Stress Reduction": {
          "Standard": [
            "What three things can you control in your current situation?",
            "Describe a place or memory that brings you peace. How can you carry that feeling with you?",
            "What would you say to a friend experiencing your current stress?",
            "How can you create more space for calm in your daily routine?",
            "What small act of self-care would make the biggest difference in your day?"
          ]
        }
      }
    };
  }
};

// Get multiple unique prompts
const getMultipleRandomPrompts = (prompts: string[], count: number): string[] => {
  console.log('Getting multiple prompts from array:', prompts?.length || 0, 'prompts, requesting', count);
  
  if (!prompts || prompts.length === 0) {
    const fallback = [
      "What are you grateful for today, and how can you build upon that gratitude?",
      "Describe one thing that brought you joy today and why it was meaningful.",
      "What is one small step you can take tomorrow to improve your well-being?",
      "Reflect on a recent challenge and identify one lesson you learned from it."
    ];
    return fallback.slice(0, count);
  }
  
  if (prompts.length <= count) {
    // If we don't have enough prompts, return all available and fill with duplicates if needed
    const result = [...prompts];
    while (result.length < count && prompts.length > 0) {
      const remaining = count - result.length;
      result.push(...prompts.slice(0, Math.min(remaining, prompts.length)));
    }
    return result.slice(0, count);
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
  
  console.log('Selected unique prompts:', selectedPrompts);
  return selectedPrompts;
};

// Function to generate multiple prompts at once - FIXED PARAMETER ORDER
export const generateMultipleOptimizedAffirmations = async (journalType: string, goal: string, promptFocus: string, count: number = 2): Promise<string[]> => {
  console.log('=== GENERATING PROMPTS ===');
  console.log('Parameters received:', { journalType, goal, promptFocus, count });
  
  try {
    const data = await loadPromptData();
    console.log('Available goals in data:', Object.keys(data.journalGoals));
    
    // The correct path should be: journalGoals[goal][journalType]
    const goalData = data.journalGoals[goal];
    console.log('Goal data for', goal, ':', goalData ? Object.keys(goalData) : 'NOT FOUND');
    
    if (!goalData) {
      console.log('Goal not found, using fallback');
      const fallbackPrompts = [
        "What are you grateful for today, and how can you build upon that gratitude?",
        "Describe one thing that brought you joy today and why it was meaningful.",
        "What is one small step you can take tomorrow to improve your well-being?",
        "Reflect on a recent challenge and identify one lesson you learned from it.",
        "What would you like to focus your energy on this week?",
        "How can you show kindness to yourself today?"
      ];
      return getMultipleRandomPrompts(fallbackPrompts, count);
    }
    
    const prompts = goalData[journalType];
    console.log('Prompts for', goal, '->', journalType, ':', prompts?.length || 0, 'prompts available');
    
    if (!prompts?.length) {
      console.log('No prompts found for this combination, checking available journal types:', Object.keys(goalData));
      
      // Try to use "Standard" as fallback if available
      const standardPrompts = goalData["Standard"];
      if (standardPrompts?.length) {
        console.log('Using Standard prompts as fallback');
        return getMultipleRandomPrompts(standardPrompts, count);
      }
      
      // Use general fallback
      const fallbackPrompts = [
        "What are you grateful for today, and how can you build upon that gratitude?",
        "Describe one thing that brought you joy today and why it was meaningful.",
        "What is one small step you can take tomorrow to improve your well-being?",
        "Reflect on a recent challenge and identify one lesson you learned from it.",
        "What would you like to focus your energy on this week?",
        "How can you show kindness to yourself today?"
      ];
      return getMultipleRandomPrompts(fallbackPrompts, count);
    }
    
    const selectedPrompts = getMultipleRandomPrompts(prompts, count);
    console.log('Final selected prompts:', selectedPrompts);
    return selectedPrompts;
  } catch (error) {
    console.error('Error generating prompts:', error);
    const fallbackPrompts = [
      "What are you grateful for today, and how can you build upon that gratitude?",
      "Describe one thing that brought you joy today and why it was meaningful.",
      "What is one small step you can take tomorrow to improve your well-being?",
      "Reflect on a recent challenge and identify one lesson you learned from it."
    ];
    return getMultipleRandomPrompts(fallbackPrompts, count);
  }
};

// Legacy function for backwards compatibility
export const generateOptimizedAffirmation = async (journalType: string, goal: string, promptFocus: string): Promise<string> => {
  const prompts = await generateMultipleOptimizedAffirmations(journalType, goal, promptFocus, 1);
  return prompts[0];
};
