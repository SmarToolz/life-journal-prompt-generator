
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useTranslation } from '@/utils/translations';

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

const AffirmationForm: React.FC<AffirmationFormProps> = ({ onGenerate, isGenerating, className }) => {
  const [category, setCategory] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { t } = useTranslation();

  const categories: CategoryOption[] = [
    { value: "self-love", label: t('self-love'), emoji: "💗" },
    { value: "health", label: t('health'), emoji: "🌿" },
    { value: "career", label: t('career'), emoji: "⭐" },
    { value: "relationship", label: t('relationship'), emoji: "💌" },
    { value: "gratitude", label: t('gratitude'), emoji: "🙏" },
    { value: "stress", label: t('stress'), emoji: "🧘" },
    { value: "motivation", label: t('motivation'), emoji: "🚀" },
    { value: "abundance", label: t('abundance'), emoji: "✨" },
    { value: "mindfulness", label: t('mindfulness'), emoji: "🕊️" },
    { value: "goals", label: t('goals'), emoji: "🎯" },
  ];

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
          {t('chooseCategory')}
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="bg-white/70 backdrop-blur-sm">
            <SelectValue placeholder={t('selectCategory')} />
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
          {t('describeGoal')}
        </label>
        <Textarea
          id="goal"
          placeholder={t('goalPlaceholder')}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="resize-none bg-white/70 backdrop-blur-sm"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="text-lg font-medium">
          {t('yourName')} <span className="text-sm text-muted-foreground ml-1">({t('nameOptional')})</span>
        </label>
        <Input
          id="name"
          type="text"
          placeholder={t('namePlaceholder')}
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
        {isGenerating ? t('generating') : t('generateAffirmation')}
      </Button>
    </form>
  );
};

export default AffirmationForm;
