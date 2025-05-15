
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AffirmationFormProps {
  onGenerate: (category: string, goal: string, name: string) => void;
  isGenerating: boolean;
  className?: string;
}

type CategoryOption = {
  value: string;
  label: string;
  emoji: string;
};

type GoalOption = {
  value: string;
  label: string;
};

const categories: CategoryOption[] = [
  { value: "self-love", label: "Self-Love & Confidence", emoji: "💗" },
  { value: "health", label: "Health & Wellness", emoji: "🌿" },
  { value: "career", label: "Career & Success", emoji: "⭐" },
  { value: "relationship", label: "Relationship & Love", emoji: "💌" },
  { value: "gratitude", label: "Gratitude & Positivity", emoji: "🙏" },
  { value: "stress", label: "Stress & Anxiety Relief", emoji: "🧘" },
  { value: "motivation", label: "Motivation & Productivity", emoji: "🚀" },
  { value: "abundance", label: "Abundance & Wealth", emoji: "✨" },
  { value: "mindfulness", label: "Mindfulness & Inner Peace", emoji: "🕊️" },
  { value: "goals", label: "Goal Achievement", emoji: "🎯" },
];

const goals: GoalOption[] = [
  { value: "self-reflection", label: "Self-Reflection" },
  { value: "standard-entry", label: "Standard Entry" },
  { value: "stress-reduction", label: "Stress Reduction" },
  { value: "problem-solving", label: "Problem Solving" },
  { value: "goal-setting", label: "Goal Setting" },
  { value: "boosting-memory", label: "Boosting Memory" },
  { value: "emotional-release", label: "Emotional Release" },
  { value: "enhancing-creativity", label: "Enhancing Creativity" },
  { value: "tracking-development", label: "Tracking Development" },
  { value: "improving-writing-skills", label: "Improving Writing Skills" },
  { value: "capturing-memories", label: "Capturing Memories" },
];

const AffirmationForm: React.FC<AffirmationFormProps> = ({ onGenerate, isGenerating, className }) => {
  const [category, setCategory] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && goal) {
      onGenerate(category, goal, name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <label htmlFor="category" className="text-lg font-medium text-purple-800">
          Choose Your Affirmation Category
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="bg-white/90 backdrop-blur-sm border-purple-200">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-white border-purple-200">
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                <span className="inline-flex items-center gap-2">
                  <span>{cat.emoji}</span> {cat.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="goal" className="text-lg font-medium text-purple-800">
          Choose Your Goal or Intention
        </label>
        <Select value={goal} onValueChange={setGoal}>
          <SelectTrigger id="goal" className="bg-white/90 backdrop-blur-sm border-purple-200">
            <SelectValue placeholder="Select your goal or intention" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-white border-purple-200">
            {goals.map((goalOption) => (
              <SelectItem key={goalOption.value} value={goalOption.value}>
                {goalOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="text-lg font-medium text-purple-800">
          Your name (optional)
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name for personalized affirmations"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/90 backdrop-blur-sm border-purple-200"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        disabled={!category || !goal || isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Affirmation"}
      </Button>
    </form>
  );
};

export default AffirmationForm;
