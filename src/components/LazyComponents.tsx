
import { lazy } from 'react';

// Lazy load heavy components that aren't immediately needed
export const LazyFavoritesLibrary = lazy(() => import('@/components/favorites/FavoritesLibrary'));
export const LazyCustomPromptsTab = lazy(() => import('@/components/custom/CustomPromptsTab'));
export const LazyAudioPlayer = lazy(() => import('@/components/audio/AudioPlayer'));

// Loading fallback component
export const ComponentLoader = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
  </div>
);
