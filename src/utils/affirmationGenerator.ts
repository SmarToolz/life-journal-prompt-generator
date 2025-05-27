import promptsData from './prompts.json';

// Track used prompts for each goal-type combination to avoid immediate repeats
const usedPromptsTracker: Record<string, string[]> = {};

// Helper function to generate affirmations based on category and user input
export const generateAffirmation = (
  category: string,
  goal: string = "",
  name: string = ""
): string => {

  console.log('category', category, goal, name)
  // Base affirmations for each category
  const affirmations: Record<string, string[]> = {
    "self-love": [
      "I am worthy of love and respect exactly as I am.",
      "I embrace my unique qualities and celebrate my true self.",
      "Every day I grow more confident and sure of myself.",
      "I am enough, just as I am, in this very moment.",
      "I love and accept myself unconditionally.",
    ],
    "health": [
      "My body is strong, healthy, and full of energy.",
      "I make choices that nourish my body and mind.",
      "I am in harmony with my body's natural rhythms.",
      "Every cell in my body radiates with health and vitality.",
      "I deserve to feel strong and healthy every day.",
    ],
    "career": [
      "I am capable of achieving everything I set my mind to.",
      "I attract success and abundance in my professional life.",
      "My unique skills are valued and recognized.",
      "I am confident in my abilities to overcome any challenge.",
      "Every day I'm getting closer to my career goals.",
    ],
    "relationship": [
      "I attract loving and supportive relationships into my life.",
      "I am worthy of deep, meaningful connections.",
      "Love flows to me easily and effortlessly.",
      "My heart is open to giving and receiving love.",
      "I trust in the perfect timing of love in my life.",
    ],
    "gratitude": [
      "I am grateful for the abundance that surrounds me.",
      "My life is filled with joy, wonder, and blessings.",
      "I appreciate the small miracles that happen every day.",
      "Gratitude opens my heart to receive more goodness.",
      "I find beauty and wonder in everyday moments.",
    ],
    "stress": [
      "I release all tension and embrace calm.",
      "Peace flows through me with every breath I take.",
      "I am centered, grounded, and at peace within myself.",
      "I choose tranquility over worry in all situations.",
      "My mind is clear, calm, and focused.",
    ],
    "motivation": [
      "I take inspired action toward my goals every day.",
      "My energy and determination know no bounds.",
      "I transform challenges into opportunities for growth.",
      "I am focused, persistent, and dedicated to my purpose.",
      "Every step I take brings me closer to my vision.",
    ],
    "abundance": [
      "I am a magnet for prosperity and abundance.",
      "Wealth flows into my life freely and abundantly.",
      "I deserve financial success and abundance.",
      "My actions create constant prosperity.",
      "I am open to receiving all the wealth life offers me.",
    ],
    "mindfulness": [
      "I am present in this moment, fully aware and at peace.",
      "My mind is calm, my heart is open, my spirit is free.",
      "I find stillness within myself amidst the movement of life.",
      "I am connected to the deepest wisdom within me.",
      "In silence, I find my true power and peace.",
    ],
    "goals": [
      "I achieve my goals with ease and joy.",
      "Every day I move closer to manifesting my dreams.",
      "I have the power to turn my visions into reality.",
      "My determination and focus make success inevitable.",
      "I celebrate each milestone on the path to my goals.",
    ],
  };

    const goalPrompts = promptsData.journalGoals[goal];

  // Select random affirmation from the chosen category
  const categoryAffirmations = goalPrompts[category] || goalPrompts["Standard"];
  const baseAffirmation = categoryAffirmations[Math.floor(Math.random() * categoryAffirmations.length)];
  
  // Personalize the affirmation if a name is provided
  let personalizedAffirmation = baseAffirmation;
  if (name) {
    // Randomly choose one of these personalization patterns
    const personalizations = [
      `${name}, ${baseAffirmation.toLowerCase()}`,
      `${baseAffirmation} This is your truth, ${name}.`,
      `Remember, ${name}: ${baseAffirmation.toLowerCase()}`,
    ];
    personalizedAffirmation = personalizations[Math.floor(Math.random() * personalizations.length)];
  }
  
  return personalizedAffirmation;
};

// New function to generate multiple unique affirmations
export const generateUniqueAffirmations = (
  category: string,
  goal: string = "",
  name: string = "",
  count: number = 3
): string[] => {
  console.log('Generating unique affirmations for:', category, goal, name);
  
  const goalPrompts = promptsData.journalGoals[goal];
  const categoryAffirmations = goalPrompts[category] || goalPrompts["Standard"];
  
  console.log('Available prompts:', categoryAffirmations.length);
  
  // Create a unique key for this goal-type combination
  const combinationKey = `${goal}-${category}`;
  
  // Get previously used prompts for this combination
  const previouslyUsed = usedPromptsTracker[combinationKey] || [];
  
  // Create a pool of available prompts, excluding recently used ones
  let availablePrompts = categoryAffirmations.filter(prompt => !previouslyUsed.includes(prompt));
  
  // If we don't have enough unused prompts, reset and use all prompts
  if (availablePrompts.length < count) {
    availablePrompts = [...categoryAffirmations];
    usedPromptsTracker[combinationKey] = []; // Reset the tracker
    console.log('Reset prompt tracker for combination:', combinationKey);
  }
  
  // Select unique prompts for this generation
  const selectedPrompts: string[] = [];
  const tempAvailable = [...availablePrompts];
  
  for (let i = 0; i < count && tempAvailable.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * tempAvailable.length);
    const selectedPrompt = tempAvailable[randomIndex];
    selectedPrompts.push(selectedPrompt);
    tempAvailable.splice(randomIndex, 1); // Remove to ensure uniqueness within this generation
  }
  
  // Update the used prompts tracker
  if (!usedPromptsTracker[combinationKey]) {
    usedPromptsTracker[combinationKey] = [];
  }
  usedPromptsTracker[combinationKey].push(...selectedPrompts);
  
  // Keep only the most recent prompts in the tracker (to eventually allow reuse)
  if (usedPromptsTracker[combinationKey].length > categoryAffirmations.length * 0.7) {
    usedPromptsTracker[combinationKey] = usedPromptsTracker[combinationKey].slice(-Math.floor(categoryAffirmations.length * 0.5));
  }
  
  console.log('Selected prompts:', selectedPrompts.length);
  console.log('Used prompts tracker size:', usedPromptsTracker[combinationKey].length);
  
  // Personalize the affirmations if a name is provided
  return selectedPrompts.map(baseAffirmation => {
    if (name) {
      const personalizations = [
        `${name}, ${baseAffirmation.toLowerCase()}`,
        `${baseAffirmation} This is your truth, ${name}.`,
        `Remember, ${name}: ${baseAffirmation.toLowerCase()}`,
      ];
      return personalizations[Math.floor(Math.random() * personalizations.length)];
    }
    return baseAffirmation;
  });
};

// Get the emoji for a specific category
export const getCategoryEmoji = (category: string): string => {
  const emojiMap: Record<string, string> = {
    "self-love": "💗",
    "health": "🌿",
    "career": "⭐",
    "relationship": "💌",
    "gratitude": "🙏",
    "stress": "🧘",
    "motivation": "🚀",
    "abundance": "✨",
    "mindfulness": "🕊️",
    "goals": "🎯",
  };
  
  return emojiMap[category] || "✨";
};
