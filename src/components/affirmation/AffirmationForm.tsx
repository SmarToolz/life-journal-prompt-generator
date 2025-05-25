
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AffirmationFormProps {
  onGenerate: (category: string, goal: string, promptFocus: string) => void;
  isGenerating: boolean;
  className?: string;
}

type JournalGoalOption = {
  value: string;
  label: string;
  emoji: string;
};

type JournalTypeOption = {
  value: string;
  label: string;
  emoji: string;
};

const journalGoals: JournalGoalOption[] = [
  { value: "standard-entry", label: "Standard Entry", emoji: "📝" },
  { value: "self-reflection", label: "Self-Reflection", emoji: "🪞" },
  { value: "stress-reduction", label: "Stress Reduction", emoji: "🧘" },
  { value: "problem-solving", label: "Problem Solving", emoji: "🧩" },
  { value: "goal-setting", label: "Goal Setting", emoji: "🎯" },
  { value: "boosting-memory", label: "Boosting Memory", emoji: "🧠" },
  { value: "emotional-release", label: "Emotional Release", emoji: "💔" },
  { value: "enhancing-creativity", label: "Enhancing Creativity", emoji: "🎨" },
  { value: "tracking-development", label: "Tracking Development", emoji: "📊" },
  { value: "improving-writing-skills", label: "Improving Writing Skills", emoji: "✍️" },
  { value: "capturing-memories", label: "Capturing Memories", emoji: "📸" },
];

const journalTypes: JournalTypeOption[] = [
  { value: "standard", label: "Standard", emoji: "📔" },
  { value: "gratitude", label: "Gratitude Journal", emoji: "🙏" },
  { value: "bullet", label: "Bullet Journal", emoji: "•️" },
  { value: "dream", label: "Dream Journal", emoji: "💤" },
  { value: "travel", label: "Travel Journal", emoji: "✈️" },
  { value: "art", label: "Art Journal", emoji: "🎭" },
  { value: "prayer", label: "Prayer Journal", emoji: "📿" },
  { value: "food", label: "Food Journal", emoji: "🍽️" },
  { value: "health", label: "Health and Wellness Journal", emoji: "💪" },
  { value: "project", label: "Project Journal", emoji: "📋" },
  { value: "learning", label: "Learning Journal", emoji: "📚" },
  { value: "reading", label: "Reading Journal", emoji: "📖" },
];

const AffirmationForm: React.FC<AffirmationFormProps> = ({ onGenerate, isGenerating, className }) => {
  const [journalGoal, setJournalGoal] = useState<string>("");
  const [journalType, setJournalType] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (journalGoal && journalType) {
      onGenerate(journalType, journalGoal, "");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <label htmlFor="journalGoal" className="text-lg font-medium text-charcoal">
          Journal Goal:
        </label>
        <Select value={journalGoal} onValueChange={setJournalGoal}>
          <SelectTrigger id="journalGoal" className="bg-pastel-pink border-gray-200 text-charcoal">
            <SelectValue placeholder="Select a journal goal" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-white border-gray-200">
            {journalGoals.map((goal) => (
              <SelectItem key={goal.value} value={goal.value}>
                <span className="inline-flex items-center gap-2">
                  <span className="text-2xl">{goal.emoji}</span> <span className="text-charcoal">{goal.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="journalType" className="text-lg font-medium text-charcoal">
          Journal Type:
        </label>
        <Select value={journalType} onValueChange={setJournalType}>
          <SelectTrigger id="journalType" className="bg-pastel-orange border-gray-200 text-charcoal">
            <SelectValue placeholder="Select a journal type" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-white border-gray-200">
            {journalTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <span className="inline-flex items-center gap-2">
                  <span className="text-2xl">{type.emoji}</span> <span className="text-charcoal">{type.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        disabled={!journalGoal || !journalType || isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Journal Prompts"}
      </Button>
    </form>
  );
};

export default AffirmationForm;
