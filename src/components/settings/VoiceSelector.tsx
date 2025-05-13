
import React from 'react';
import { useTranslation } from '@/utils/translations';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Speaker } from "lucide-react";

export type VoiceType = 'male' | 'female';

interface VoiceSelectorProps {
  selectedVoice: VoiceType;
  onVoiceChange: (voice: VoiceType) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ selectedVoice, onVoiceChange }) => {
  const { t } = useTranslation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Speaker className="h-4 w-4" />
          <span>{t('voiceSelection')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuLabel>{t('voiceSelection')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={selectedVoice === 'male' ? "bg-secondary font-medium" : ""}
          onClick={() => onVoiceChange('male')}
        >
          {t('maleVoice')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={selectedVoice === 'female' ? "bg-secondary font-medium" : ""}
          onClick={() => onVoiceChange('female')}
        >
          {t('femaleVoice')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VoiceSelector;
