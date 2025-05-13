
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { VoiceType } from '@/components/settings/VoiceSelector';
import { useTranslation } from '@/utils/translations';

interface AudioPlayerProps {
  isPlaying: boolean;
  selectedVoice: VoiceType;
  affirmations: string[];
}

const AudioPlayer = ({ isPlaying, selectedVoice, affirmations = [] }: AudioPlayerProps) => {
  const [musicVolume, setMusicVolume] = useState(50);
  const [sfxVolume, setSfxVolume] = useState(30);
  const [brainVolume, setBrainVolume] = useState(40);
  const [voiceVolume, setVoiceVolume] = useState(70);
  
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);
  const brainRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useTranslation();
  
  // Initialize audio elements
  useEffect(() => {
    if (!musicRef.current) {
      musicRef.current = new Audio('/ambient-calm-waves.mp3');
      musicRef.current.loop = true;
    }
    
    if (!sfxRef.current) {
      sfxRef.current = new Audio('/beach-waves-crashing.mp3');
      sfxRef.current.loop = true;
    }
    
    if (!brainRef.current) {
      brainRef.current = new Audio('/alpha-tap.mp3');
      brainRef.current.loop = true;
    }
    
    return () => {
      // Cleanup function
      musicRef.current?.pause();
      sfxRef.current?.pause();
      brainRef.current?.pause();
    };
  }, []);
  
  // Handle play/pause
  useEffect(() => {
    const musicAudio = musicRef.current;
    const sfxAudio = sfxRef.current;
    const brainAudio = brainRef.current;
    
    if (isPlaying) {
      const playPromises = [
        musicAudio?.play(),
        sfxAudio?.play(),
        brainAudio?.play()
      ];
      
      // Handle promise rejections (required for browsers that return promises from play())
      playPromises.forEach(promise => {
        if (promise) {
          promise.catch(error => console.log("Playback prevented: ", error));
        }
      });
      
      // Text to speech would be implemented here
      if (affirmations.length > 0) {
        // Placeholder for TTS implementation
        console.log(`Speaking affirmations with ${selectedVoice} voice`);
        
        // This is where you would integrate a TTS service
        // For example with the Web Speech API:
        if ('speechSynthesis' in window) {
          // Cancel any ongoing speech
          window.speechSynthesis.cancel();
          
          // Create utterance for each affirmation
          setTimeout(() => {
            affirmations.forEach((affirmation, index) => {
              const utterance = new SpeechSynthesisUtterance(affirmation);
              
              // Set voice based on selectedVoice
              const voices = window.speechSynthesis.getVoices();
              const voiceOptions = voices.filter(voice => 
                selectedVoice === 'male' ? !voice.name.includes('Female') : voice.name.includes('Female')
              );
              
              if (voiceOptions.length > 0) {
                utterance.voice = voiceOptions[0];
              }
              
              utterance.volume = voiceVolume / 100;
              utterance.rate = 0.9; // slightly slower for better clarity
              
              // Add delay between affirmations
              utterance.onstart = () => {
                console.log(`Speaking affirmation ${index + 1}`);
              };
              
              window.speechSynthesis.speak(utterance);
            });
          }, 1000); // Delay to allow background audio to start first
        }
      }
    } else {
      musicAudio?.pause();
      sfxAudio?.pause();
      brainAudio?.pause();
      
      // Stop any ongoing speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isPlaying, affirmations, selectedVoice, voiceVolume]);
  
  // Update volumes when sliders change
  useEffect(() => {
    if (musicRef.current) musicRef.current.volume = musicVolume / 100;
    if (sfxRef.current) sfxRef.current.volume = sfxVolume / 100;
    if (brainRef.current) brainRef.current.volume = brainVolume / 100;
  }, [musicVolume, sfxVolume, brainVolume]);

  // Function to get the appropriate volume icon based on level
  const getVolumeIcon = (volume: number) => {
    if (volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 33) return <Volume className="h-4 w-4" />;
    if (volume < 66) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-6 p-4 bg-secondary/30 rounded-lg backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {getVolumeIcon(musicVolume)}
        <span className="w-32 text-sm">Music</span>
        <Slider
          value={[musicVolume]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setMusicVolume(value[0])}
          className="flex-grow"
        />
      </div>
      
      <div className="flex items-center gap-3">
        {getVolumeIcon(sfxVolume)}
        <span className="w-32 text-sm">Beach Waves</span>
        <Slider
          value={[sfxVolume]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setSfxVolume(value[0])}
          className="flex-grow"
        />
      </div>
      
      <div className="flex items-center gap-3">
        {getVolumeIcon(brainVolume)}
        <span className="w-32 text-sm">Alpha Tap</span>
        <Slider
          value={[brainVolume]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setBrainVolume(value[0])}
          className="flex-grow"
        />
      </div>
      
      <div className="flex items-center gap-3">
        {getVolumeIcon(voiceVolume)}
        <span className="w-32 text-sm">Voice</span>
        <Slider
          value={[voiceVolume]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setVoiceVolume(value[0])}
          className="flex-grow"
        />
      </div>
      
      <div className="text-xs text-center text-muted-foreground mt-2">
        {t('deepBreath')}
      </div>
    </div>
  );
};

export default AudioPlayer;
