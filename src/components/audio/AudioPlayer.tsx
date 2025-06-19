
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AudioPlayer = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-blue-200">
      <CardContent className="p-6 text-center">
        <p className="text-gray-700 font-medium">
          Audio functionality has been removed for better performance.
        </p>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
