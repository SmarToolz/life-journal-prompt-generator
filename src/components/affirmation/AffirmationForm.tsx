
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
        <label htmlFor="journalGoal" className="text-lg font-medium text-white drop-shadow-lg">
          Journal Goal:
        </label>
        <Select value={journalGoal} onValueChange={setJournalGoal}>
          <SelectTrigger id="journalGoal" className="glass-morphism border-white/30 text-white placeholder:text-white/70">
            <SelectValue placeholder="Select a journal goal" />
          </SelectTrigger>
          <SelectContent position="popper" className="glass-morphism border-white/30 backdrop-blur-md">
            {journalGoals.map((goal) => (
              <SelectItem key={goal.value} value={goal.value} className="text-white hover:bg-white/20">
                <span className="inline-flex items-center gap-2">
                  <span className="text-2xl">{goal.emoji}</span> <span className="text-white">{goal.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="journalType" className="text-lg font-medium text-white drop-shadow-lg">
          Journal Type:
        </label>
        <Select value={journalType} onValueChange={setJournalType}>
          <SelectTrigger id="journalType" className="glass-morphism border-white/30 text-white placeholder:text-white/70">
            <SelectValue placeholder="Select a journal type" />
          </SelectTrigger>
          <SelectContent position="popper" className="glass-morphism border-white/30 backdrop-blur-md">
            {journalTypes.map((type) => (
              <SelectItem key={type.value} value={type.value} className="text-white hover:bg-white/20">
                <span className="inline-flex items-center gap-2">
                  <span className="text-2xl">{type.emoji}</span> <span className="text-white">{type.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-600/80 hover:to-pink-600/80 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 backdrop-blur-sm border border-white/20"
        disabled={!journalGoal || !journalType || isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Journal Prompts"}
      </Button>
    </form>
  );
};

export default AffirmationForm;
