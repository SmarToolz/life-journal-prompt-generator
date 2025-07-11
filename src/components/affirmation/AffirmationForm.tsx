import React, { useState, useCallback, useMemo } from 'react';
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

// Memoize static data to prevent re-creation on re-renders
const journalGoals: JournalGoalOption[] = [{
  value: "Standard Entry",
  label: "Standard Entry",
  emoji: "📝"
}, {
  value: "Self-Reflection",
  label: "Self-Reflection",
  emoji: "🪞"
}, {
  value: "Stress Reduction",
  label: "Stress Reduction",
  emoji: "🧘"
}, {
  value: "Problem Solving",
  label: "Problem Solving",
  emoji: "🧩"
}, {
  value: "Goal Setting",
  label: "Goal Setting",
  emoji: "🎯"
}, {
  value: "Boosting Memory",
  label: "Boosting Memory",
  emoji: "🧠"
}, {
  value: "Emotional Release",
  label: "Emotional Release",
  emoji: "💔"
}, {
  value: "Enhancing Creativity",
  label: "Enhancing Creativity",
  emoji: "🎨"
}, {
  value: "Tracking Development",
  label: "Tracking Development",
  emoji: "📊"
}, {
  value: "Improving Writing Skills",
  label: "Improving Writing Skills",
  emoji: "✍️"
}, {
  value: "Capturing Memories",
  label: "Capturing Memories",
  emoji: "📸"
}];
const journalTypes: JournalTypeOption[] = [{
  value: "Standard",
  label: "Standard",
  emoji: "📔"
}, {
  value: "Gratitude Journal",
  label: "Gratitude Journal",
  emoji: "🙏"
}, {
  value: "Bullet Journal",
  label: "Bullet Journal",
  emoji: "•️"
}, {
  value: "Dream Journal",
  label: "Dream Journal",
  emoji: "💤"
}, {
  value: "Travel Journal",
  label: "Travel Journal",
  emoji: "✈️"
}, {
  value: "Art Journal",
  label: "Art Journal",
  emoji: "🎭"
}, {
  value: "Prayer Journal",
  label: "Prayer Journal",
  emoji: "📿"
}, {
  value: "Food Journal",
  label: "Food Journal",
  emoji: "🍽️"
}, {
  value: "Health and Wellness Journal",
  label: "Health and Wellness Journal",
  emoji: "💪"
}, {
  value: "Project Journal",
  label: "Project Journal",
  emoji: "📋"
}, {
  value: "Learning Journal",
  label: "Learning Journal",
  emoji: "📚"
}, {
  value: "Reading Journal",
  label: "Reading Journal",
  emoji: "📖"
}];
const AffirmationForm: React.FC<AffirmationFormProps> = ({
  onGenerate,
  isGenerating,
  className
}) => {
  const [journalGoal, setJournalGoal] = useState<string>("");
  const [journalType, setJournalType] = useState<string>("");

  // Memoize button disabled state to prevent unnecessary re-renders
  const isButtonDisabled = useMemo(() => !journalGoal || !journalType || isGenerating, [journalGoal, journalType, isGenerating]);

  // Use useCallback to prevent function recreation on every render
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', {
      journalGoal,
      journalType
    });
    if (journalGoal && journalType) {
      console.log('Calling onGenerate with:', journalType, journalGoal, journalType);
      onGenerate(journalType, journalGoal, journalType);
    } else {
      console.log('Missing required fields:', {
        journalGoal: !!journalGoal,
        journalType: !!journalType
      });
    }
  }, [journalGoal, journalType, onGenerate]);
  const handleButtonClick = useCallback((e: React.MouseEvent) => {
    console.log('Button clicked');
    handleSubmit(e as any);
  }, [handleSubmit]);
  return <form onSubmit={handleSubmit} className={cn("space-y-4 sm:space-y-6", className)}>
      <div className="space-y-2">
        <label htmlFor="journalGoal" className="text-base sm:text-lg font-medium text-enhanced">
          Journal Goal:
        </label>
        <Select value={journalGoal} onValueChange={setJournalGoal}>
          <SelectTrigger id="journalGoal" className="colorful-select text-enhanced placeholder:text-gray-600 transition-all duration-200">
            <SelectValue placeholder="Select a journal goal" />
          </SelectTrigger>
          <SelectContent position="popper" className="colorful-dropdown">
            {journalGoals.map(goal => <SelectItem key={goal.value} value={goal.value} className="dropdown-option-text hover:bg-white/50 transition-all duration-200 rounded-md">
                <span className="inline-flex items-center gap-2">
                  <span className="text-xl sm:text-2xl drop-shadow-sm">{goal.emoji}</span> 
                  <span className="text-sm sm:text-base">{goal.label}</span>
                </span>
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="journalType" className="text-base sm:text-lg font-medium text-enhanced">
          Journal Type:
        </label>
        <Select value={journalType} onValueChange={setJournalType}>
          <SelectTrigger id="journalType" className="colorful-select text-enhanced placeholder:text-gray-600 transition-all duration-200">
            <SelectValue placeholder="Select a journal type" />
          </SelectTrigger>
          <SelectContent position="popper" className="colorful-dropdown">
            {journalTypes.map(type => <SelectItem key={type.value} value={type.value} className="dropdown-option-text hover:bg-white/50 transition-all duration-200 rounded-md">
                <span className="inline-flex items-center gap-2">
                  <span className="text-xl sm:text-2xl drop-shadow-sm">{type.emoji}</span> 
                  <span className="text-sm sm:text-base">{type.label}</span>
                </span>
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isButtonDisabled} onClick={handleButtonClick} className="w-full btn-gradient-primary font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-white sm:text-white text-sm sm:text-base">
        {isGenerating ? "Generating..." : "Generate Journal Prompts"}
      </Button>
    </form>;
};
export default AffirmationForm;