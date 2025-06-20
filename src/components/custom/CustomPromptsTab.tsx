
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Plus, Heart, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useFavorites } from '@/contexts/FavoritesContext';

interface CustomPrompt {
  id: string;
  text: string;
  createdAt: Date;
}

const CustomPromptsTab: React.FC = () => {
  const [customPrompts, setCustomPrompts] = useState<CustomPrompt[]>([]);
  const [newPromptText, setNewPromptText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();

  // Load custom prompts from localStorage on component mount
  useEffect(() => {
    const savedPrompts = localStorage.getItem('customPrompts');
    if (savedPrompts) {
      try {
        const parsed = JSON.parse(savedPrompts);
        setCustomPrompts(parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        })));
      } catch (error) {
        console.error('Error loading custom prompts:', error);
      }
    }
  }, []);

  // Save custom prompts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customPrompts', JSON.stringify(customPrompts));
  }, [customPrompts]);

  const addCustomPrompt = () => {
    if (!newPromptText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt text.",
        variant: "destructive"
      });
      return;
    }

    const newPrompt: CustomPrompt = {
      id: Date.now().toString(),
      text: newPromptText.trim(),
      createdAt: new Date()
    };

    setCustomPrompts(prev => [newPrompt, ...prev]);
    setNewPromptText('');
    
    toast({
      title: "Custom Prompt Added",
      description: "Your custom prompt has been saved.",
    });
  };

  const deleteCustomPrompt = (id: string) => {
    const promptToDelete = customPrompts.find(p => p.id === id);
    if (promptToDelete && isFavorite(promptToDelete.text)) {
      removeFavorite(promptToDelete.text);
    }
    
    setCustomPrompts(prev => prev.filter(p => p.id !== id));
    
    toast({
      title: "Prompt Deleted",
      description: "Custom prompt has been removed.",
    });
  };

  const startEditing = (prompt: CustomPrompt) => {
    setEditingId(prompt.id);
    setEditingText(prompt.text);
  };

  const saveEdit = () => {
    if (!editingText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt text.",
        variant: "destructive"
      });
      return;
    }

    setCustomPrompts(prev => prev.map(p => 
      p.id === editingId 
        ? { ...p, text: editingText.trim() }
        : p
    ));
    
    setEditingId(null);
    setEditingText('');
    
    toast({
      title: "Prompt Updated",
      description: "Your custom prompt has been updated.",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleFavoriteToggle = (prompt: CustomPrompt) => {
    const isFavorited = isFavorite(prompt.text);
    
    if (isFavorited) {
      removeFavorite(prompt.text);
      toast({
        title: "Removed from Favorites",
        description: "Prompt removed from your favorites.",
      });
    } else {
      addFavorite(prompt.text);
      toast({
        title: "Added to Favorites",
        description: "Prompt saved to your favorites.",
      });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Journal prompt copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Add New Prompt Section */}
      <Card className="bg-gradient-to-r from-pink-100 to-yellow-100 border-2 border-pink-200 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-enhanced">Add New Custom Prompt</h3>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your custom journal prompt..."
              value={newPromptText}
              onChange={(e) => setNewPromptText(e.target.value)}
              className="min-h-[100px] resize-none bg-gradient-to-r from-pink-50 to-yellow-50 border-2 border-pink-200 text-gray-800 placeholder:text-gray-500 focus:border-pink-300 font-medium"
            />
            <Button 
              onClick={addCustomPrompt}
              className="bg-gradient-to-r from-blue-200 to-green-200 hover:from-blue-300 hover:to-green-300 text-gray-800 font-semibold border-2 border-blue-200 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Prompt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Custom Prompts List */}
      <div className="space-y-4">
        {customPrompts.length === 0 ? (
          <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-medium mb-3 text-enhanced">
                No custom prompts yet
              </h3>
              <p className="text-enhanced">
                Create your first custom prompt using the form above
              </p>
            </CardContent>
          </Card>
        ) : (
          customPrompts.map((prompt) => (
            <Card key={prompt.id} className="bg-gradient-to-r from-green-100 to-purple-100 border-2 border-green-200 shadow-lg overflow-hidden">
              <div className="relative h-8 overflow-hidden">
                <div className="breathing-wave-animation absolute inset-0 h-full w-full"></div>
              </div>
              <CardContent className="p-6">
                {editingId === prompt.id ? (
                  <div className="space-y-4">
                    <Textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="min-h-[100px] resize-none bg-gradient-to-r from-green-50 to-purple-50 border-2 border-green-200 text-gray-800 placeholder:text-gray-500 focus:border-green-300 font-medium"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={saveEdit}
                        size="sm"
                        className="bg-gradient-to-r from-blue-200 to-yellow-200 hover:from-blue-300 hover:to-yellow-300 text-gray-800 font-medium"
                      >
                        Save
                      </Button>
                      <Button 
                        onClick={cancelEdit}
                        variant="outline"
                        size="sm"
                        className="bg-gradient-to-r from-yellow-50 to-blue-50 border-2 border-yellow-200 text-gray-800 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-blue-100 font-medium"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-lg md:text-xl font-medium leading-relaxed tracking-wide text-enhanced mb-4">
                      {prompt.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-enhanced">
                        Created: {prompt.createdAt.toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleCopy(prompt.text)}
                          variant="outline"
                          size="sm"
                          className="bg-gradient-to-r from-yellow-50 to-blue-50 border-2 border-yellow-200 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-blue-100 text-gray-800 font-medium"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleFavoriteToggle(prompt)}
                          variant={isFavorite(prompt.text) ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            isFavorite(prompt.text) 
                              ? "bg-red-400/90 hover:bg-red-500/90 text-white font-medium" 
                              : "bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 hover:bg-red-50/60 text-gray-800 font-medium"
                          )}
                        >
                          <Heart className={cn("h-4 w-4", isFavorite(prompt.text) ? "fill-white text-white" : "text-red-500")} />
                        </Button>
                        <Button
                          onClick={() => startEditing(prompt)}
                          variant="outline"
                          size="sm"
                          className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-green-100 text-gray-800 font-medium"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteCustomPrompt(prompt.id)}
                          variant="outline"
                          size="sm"
                          className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 hover:bg-red-200/60 text-red-600 font-medium"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomPromptsTab;
