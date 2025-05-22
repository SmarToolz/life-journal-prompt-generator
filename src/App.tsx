
import React from 'react';
import Index from './pages/Index';
import { Toaster } from "@/components/ui/toaster";
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Index />
      <Toaster />
    </FavoritesProvider>
  );
}

export default App;
