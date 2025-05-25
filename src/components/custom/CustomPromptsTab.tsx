
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
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

  return (
    <div className="space-y-6">
      {/* Add New Prompt Section */}
      <Card className="bg-pastel-green border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-charcoal">Add New Custom Prompt</h3>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your custom journal prompt..."
              value={newPromptText}
              onChange={(e) => setNewPromptText(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <Button 
              onClick={addCustomPrompt}
              className="bg-charcoal hover:bg-charcoal/90 text-white"
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
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-medium mb-3 text-charcoal">
                No custom prompts yet
              </h3>
              <p className="text-charcoal/70">
                Create your first custom prompt using the form above
              </p>
            </CardContent>
          </Card>
        ) : (
          customPrompts.map((prompt) => (
            <Card key={prompt.id} className="bg-white border border-gray-200 overflow-hidden">
              <div className="relative h-8 overflow-hidden">
                <div className="breathing-wave-animation absolute inset-0 h-full w-full"></div>
              </div>
              <CardContent className="p-6">
                {editingId === prompt.id ? (
                  <div className="space-y-4">
                    <Textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={saveEdit}
                        size="sm"
                        className="bg-charcoal hover:bg-charcoal/90 text-white"
                      >
                        Save
                      </Button>
                      <Button 
                        onClick={cancelEdit}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-lg md:text-xl font-medium leading-relaxed tracking-wide text-charcoal mb-4">
                      {prompt.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-charcoal/60">
                        Created: {prompt.createdAt.toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEditing(prompt)}
                          variant="outline"
                          size="sm"
                          className="border-gray-200 hover:bg-gray-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteCustomPrompt(prompt.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-200 hover:bg-red-50 text-red-600"
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
