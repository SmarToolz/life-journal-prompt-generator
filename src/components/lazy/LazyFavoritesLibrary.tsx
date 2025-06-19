
import { lazy, Suspense } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const FavoritesLibrary = lazy(() => import('../favorites/FavoritesLibrary'));

interface LazyFavoritesLibraryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LazyFavoritesLibrary: React.FC<LazyFavoritesLibraryProps> = (props) => {
  return (
    <Suspense fallback={
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse">Loading favorites...</div>
        </CardContent>
      </Card>
    }>
      <FavoritesLibrary {...props} />
    </Suspense>
  );
};

export default LazyFavoritesLibrary;
