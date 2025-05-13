
import React, { createContext, useState, useContext, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (affirmation: string) => void;
  removeFavorite: (affirmation: string) => void;
  clearAllFavorites: () => void;
  isFavorite: (affirmation: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  clearAllFavorites: () => {},
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoritesContext);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem('affirmation_favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('affirmation_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (affirmation: string) => {
    if (!favorites.includes(affirmation)) {
      setFavorites([...favorites, affirmation]);
    }
  };

  const removeFavorite = (affirmation: string) => {
    setFavorites(favorites.filter(fav => fav !== affirmation));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (affirmation: string) => {
    return favorites.includes(affirmation);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite, 
        clearAllFavorites, 
        isFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
