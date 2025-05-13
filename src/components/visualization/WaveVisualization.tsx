
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface WaveVisualizationProps {
  isPlaying: boolean;
  className?: string;
}

const WaveVisualization: React.FC<WaveVisualizationProps> = ({
  isPlaying,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let phase = 0;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Wave drawing function
    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Only animate if music is playing
      if (isPlaying) {
        phase += 0.05; // Speed of wave movement
      }
      
      // Define wave parameters
      const amplitude = canvas.height / 4;
      const frequency = 0.02;
      const waves = 3; // Number of overlapping waves
      
      // Wave colors
      const colors = [
        'rgba(0, 170, 255, 0.3)',
        'rgba(80, 140, 255, 0.3)',
        'rgba(130, 110, 255, 0.3)'
      ];
      
      // Draw each wave with different parameters
      for (let i = 0; i < waves; i++) {
        ctx.beginPath();
        
        // Different phase shift and amplitude for each wave
        const currentPhase = phase + i * 2;
        const waveAmplitude = amplitude * (0.7 + (i * 0.3));
        
        ctx.moveTo(0, canvas.height / 2);
        
        // Draw wave path
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * frequency + currentPhase) * waveAmplitude + canvas.height / 2;
          ctx.lineTo(x, y);
        }
        
        // Complete the wave path
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Fill wave
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
      }
      
      // Request next frame
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);
  
  return (
    <canvas 
      ref={canvasRef}
      className={cn("w-full h-24 rounded-t-xl", className)}
    />
  );
};

export default WaveVisualization;
