
import { lazy } from 'react';

// Optimized lazy loading with better error boundaries
export const LazyFavoritesLibrary = lazy(() => 
  import('@/components/favorites/FavoritesLibrary').then(module => ({
    default: module.default
  }))
);

export const LazyCustomPromptsTab = lazy(() => 
  import('@/components/custom/CustomPromptsTab').then(module => ({
    default: module.default
  }))
);

// Minimal loading component to reduce bundle size
export const ComponentLoader = () => (
  <div className="flex items-center justify-center p-4" role="status" aria-label="Loading">
    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);
