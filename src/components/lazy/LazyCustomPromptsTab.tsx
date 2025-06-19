
import { lazy, Suspense } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const CustomPromptsTab = lazy(() => import('../custom/CustomPromptsTab'));

const LazyCustomPromptsTab: React.FC = () => {
  return (
    <Suspense fallback={
      <Card className="w-full bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse">Loading custom prompts...</div>
        </CardContent>
      </Card>
    }>
      <CustomPromptsTab />
    </Suspense>
  );
};

export default LazyCustomPromptsTab;
