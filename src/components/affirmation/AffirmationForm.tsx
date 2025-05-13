
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

const AffirmationForm: React.FC<AffirmationFormProps> = ({ onGenerate, isGenerating, className }) => {
  const [category, setCategory] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      onGenerate(category, goal, name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <label htmlFor="category" className="text-lg font-medium">
          Choose Your Affirmation Category
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="bg-white/70 backdrop-blur-sm">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent position="popper">
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
        <label htmlFor="goal" className="text-lg font-medium">
          Describe your current goal or intention
        </label>
        <Textarea
          id="goal"
          placeholder="e.g., 'I want to feel more confident at work'"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="resize-none bg-white/70 backdrop-blur-sm"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="text-lg font-medium">
          Your name (optional)
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name for personalized affirmations"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/70 backdrop-blur-sm"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!category || isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Affirmation"}
      </Button>
    </form>
  );
};

export default AffirmationForm;
