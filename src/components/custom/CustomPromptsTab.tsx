
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import AffirmationCard from '../affirmation/AffirmationCard';

const CustomPromptsTab = () => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const handleGenerateCustom = () => {
    if (customPrompt.trim()) {
      setGeneratedPrompt(customPrompt.trim());
      setCustomPrompt("");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-emerald-100 via-teal-50 to-sky-100 border-2 border-emerald-300 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800 font-bold">
            <Sparkles className="h-6 w-6 text-emerald-600" />
            Create Your Own Prompt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your custom journal prompt..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="min-h-[120px] bg-white/70 border-2 border-emerald-200 text-gray-800 placeholder:text-gray-600 focus:border-emerald-400 focus:ring-emerald-200 font-medium resize-none"
          />
          <Button
            onClick={handleGenerateCustom}
            disabled={!customPrompt.trim()}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Use This Prompt
          </Button>
        </CardContent>
      </Card>

      {generatedPrompt && (
        <AffirmationCard affirmation={generatedPrompt} />
      )}

      {!generatedPrompt && (
        <Card className="bg-gradient-to-br from-violet-100 to-indigo-100 border-2 border-violet-300 shadow-lg">
          <CardContent className="p-8 text-center">
            <p className="text-gray-700 font-medium text-lg">
              Write your own journal prompt above and click "Use This Prompt" to get started!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomPromptsTab;
