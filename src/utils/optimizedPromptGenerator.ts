
import promptsData from '/prompts.json';

interface PromptsData {
  journalGoals: Record<string, Record<string, string[]>>;
}

const prompts = promptsData as PromptsData;

export const generateUniquePrompts = (
  category: string,
  goal: string,
  promptFocus: string,
  count: number = 3
): string[] => {
  try {
    const categoryPrompts = prompts.journalGoals[goal]?.[promptFocus];
    
    if (!categoryPrompts || categoryPrompts.length === 0) {
      console.warn(`No prompts found for ${goal} - ${promptFocus}`);
      return [`What aspects of ${goal.toLowerCase()} would you like to explore through ${promptFocus.toLowerCase()} journaling?`];
    }

    // Create a shuffled copy to ensure uniqueness
    const shuffledPrompts = [...categoryPrompts].sort(() => Math.random() - 0.5);
    
    // Return the requested number of unique prompts
    return shuffledPrompts.slice(0, Math.min(count, shuffledPrompts.length));
  } catch (error) {
    console.error('Error generating prompts:', error);
    return [`Reflect on your ${goal.toLowerCase()} journey through ${promptFocus.toLowerCase()} writing.`];
  }
};

export const getCategoryEmoji = (category: string): string => {
  const emojiMap: Record<string, string> = {
    'Problem Solving': '🧩',
    'Stress Reduction': '😌',
    'Goal Setting': '🎯',
    'Boosting Memory': '🧠',
    'Emotional Release': '💭',
    'Self-Reflection': '🪞',
    'Standard Entry': '📝',
    'Tracking Development': '📈',
    'Improving Writing Skills': '✍️',
    'Capturing Memories': '📸',
    'Enhancing Creativity': '🎨'
  };
  
  return emojiMap[category] || '✨';
};
