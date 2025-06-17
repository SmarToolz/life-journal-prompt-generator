
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
  { value: "Standard Entry", label: "Standard Entry", emoji: "📝" },
  { value: "Self-Reflection", label: "Self-Reflection", emoji: "🪞" },
  { value: "Stress Reduction", label: "Stress Reduction", emoji: "🧘" },
  { value: "Problem Solving", label: "Problem Solving", emoji: "🧩" },
  { value: "Goal Setting", label: "Goal Setting", emoji: "🎯" },
  { value: "Boosting Memory", label: "Boosting Memory", emoji: "🧠" },
  { value:"Emotional Release", label: "Emotional Release", emoji: "💔" },
  { value: "Enhancing Creativity", label: "Enhancing Creativity", emoji: "🎨" },
  { value: "Tracking Development", label: "Tracking Development", emoji: "📊" },
  { value: "Improving Writing Skills", label: "Improving Writing Skills", emoji: "✍️" },
  { value: "Capturing Memories", label: "Capturing Memories", emoji: "📸" },
];

const journalTypes: JournalTypeOption[] = [
  { value: "Standard", label: "Standard", emoji: "📔" },
  { value: "Gratitude Journal", label: "Gratitude Journal", emoji: "🙏" },
  { value: "Bullet Journal", label: "Bullet Journal", emoji: "•️" },
  { value:"Dream Journal", label: "Dream Journal", emoji: "💤" },
  { value: "Travel Journal", label: "Travel Journal", emoji: "✈️" },
  { value: "Art Journal", label: "Art Journal", emoji: "🎭" },
  { value: "Prayer Journal", label: "Prayer Journal", emoji: "📿" },
  { value: "Food Journal", label: "Food Journal", emoji: "🍽️" },
  { value: "Health and Wellness Journal", label: "Health and Wellness Journal", emoji: "💪" },
  { value: "Project Journal", label: "Project Journal", emoji: "📋" },
  { value:  "Learning Journal", label: "Learning Journal", emoji: "📚" },
  { value: "Reading Journal", label: "Reading Journal", emoji: "📖" },
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
        <label htmlFor="journalGoal" className="text-lg font-medium text-enhanced text-shadow">
          Journal Goal:
        </label>
        <Select value={journalGoal} onValueChange={setJournalGoal}>
          <SelectTrigger id="journalGoal" className="glass-morphism border-white/50 text-enhanced placeholder:text-gray-500 focus:border-blue-300/60 shadow-lg transition-all duration-200 hover:shadow-xl">
            <SelectValue placeholder="Select a journal goal" />
          </SelectTrigger>
          <SelectContent position="popper" className="glass-morphism border-white/50 backdrop-blur-md shadow-2xl">
            {journalGoals.map((goal) => (
              <SelectItem key={goal.value} value={goal.value} className="dropdown-option-text hover:bg-gradient-to-r hover:from-blue-100/50 hover:to-purple-100/50 transition-all duration-200 rounded-md">
                <span className="inline-flex items-center gap-2">
                  <span className="text-2xl drop-shadow-sm">{goal.emoji}</span> <span>{goal.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="journalType" className="text-lg font-medium text-enhanced text-shadow">
          Journal Type:
        </label>
        <Select value={journalType} onValueChange={setJournalType}>
          <SelectTrigger id="journalType" className="glass-morphism border-white/50 text-enhanced placeholder:text-gray-500 focus:border-purple-300/60 shadow-lg transition-all duration-200 hover:shadow-xl">
            <SelectValue placeholder="Select a journal type" />
          </SelectTrigger>
          <SelectContent position="popper" className="glass-morphism border-white/50 backdrop-blur-md shadow-2xl">
            {journalTypes.map((type) => (
              <SelectItem key={type.value} value={type.value} className="dropdown-option-text hover:bg-gradient-to-r hover:from-purple-100/50 hover:to-pink-100/50 transition-all duration-200 rounded-md">
                <span className="inline-flex items-center gap-2">
                  <span className="text-2xl drop-shadow-sm">{type.emoji}</span> <span>{type.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full btn-gradient-primary font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 backdrop-blur-sm border border-white/40"
        disabled={!journalGoal || !journalType || isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Journal Prompts"}
      </Button>
    </form>
  );
};

export default AffirmationForm;
