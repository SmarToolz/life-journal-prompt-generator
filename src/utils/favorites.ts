
// Utility functions for managing favorites in localStorage

export interface FavoriteAffirmation {
  id: string;
  text: string;
  category: string;
  timestamp: number;
  language: string;
}

const STORAGE_KEY = 'affirmation_favorites';

export const getFavorites = (): FavoriteAffirmation[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error retrieving favorites from localStorage:", error);
    return [];
  }
};

export const addFavorite = (affirmation: FavoriteAffirmation): void => {
  try {
    const favorites = getFavorites();
    
    // Check if this affirmation is already a favorite
    if (!favorites.some(fav => fav.id === affirmation.id)) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...favorites, affirmation])
      );
    }
  } catch (error) {
    console.error("Error adding favorite to localStorage:", error);
  }
};

export const removeFavorite = (id: string): void => {
  try {
    const favorites = getFavorites();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favorites.filter(fav => fav.id !== id))
    );
  } catch (error) {
    console.error("Error removing favorite from localStorage:", error);
  }
};

export const clearFavorites = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.error("Error clearing favorites from localStorage:", error);
  }
};
