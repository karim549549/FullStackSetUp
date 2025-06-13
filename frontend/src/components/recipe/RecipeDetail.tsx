"use client";

import { Recipe } from '@/lib/types/recipe.types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { recipeApi } from '@/services/apis/recipe.apis';
import { toast } from 'sonner';
import { ApiError } from '@/lib/types/api.types';
import { RecipeHero } from './RecipeHero';
import { RecipeHeader } from './RecipeHeader';
import { RecipeIngredients } from './RecipeIngredients';
import { RecipeInstructions } from './RecipeInstructions';
import { RecipeNutrition } from './RecipeNutrition';
import { RecipeComments } from './RecipeComments';

interface RecipeDetailProps {
  recipe: Recipe;
}

// Default values for recipe
const defaultCreator = {
  name: "Chef John",
  avatar: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=100&q=80",
  verified: true
};

// Mock comments data
const mockComments = [
  {
    id: 1,
    user: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
    text: "Made this for meal prep this week and it's absolutely delicious! The lemon dressing really makes it pop.",
    time: "1 hour ago"
  },
  {
    id: 2,
    user: { name: "Mike Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
    text: "Perfect recipe! I added some feta cheese for extra protein. Will definitely make again.",
    time: "3 hours ago"
  },
  {
    id: 3,
    user: { name: "Sophia Lee", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" },
    text: "The quinoa came out perfectly fluffy! I'll be making this for my weekly lunches.",
    time: "5 hours ago"
  },
  {
    id: 4,
    user: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
    text: "Great recipe! I substituted the olives with sun-dried tomatoes and it worked really well.",
    time: "1 day ago"
  },
  {
    id: 5,
    user: { name: "Olivia Martinez", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80" },
    text: "This is now my go-to meal prep recipe. So healthy and filling!",
    time: "2 days ago"
  }
];

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Use default values if not provided in recipe
  const creator = recipe.creator || defaultCreator;
  const createdAt = recipe.createdAt || new Date().toISOString();

  const handleSaveRecipe = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      if (isSaved) {
        await recipeApi.unsaveRecipe(recipe.id);
        setIsSaved(false);
        toast.success("Recipe unsaved", {
          description: "Recipe has been removed from your saved recipes.",
        });
      } else {
        await recipeApi.saveRecipe(recipe.id);
        setIsSaved(true);
        toast.success("Recipe saved", {
          description: "Recipe has been added to your saved recipes.",
        });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          toast.error("Already saved", {
            description: "This recipe is already in your saved recipes.",
          });
        } else if (error.status === 404) {
          toast.error("Not saved", {
            description: "This recipe is not in your saved recipes.",
          });
        } else {
          toast.error("Error", {
            description: error.message || "Failed to update saved status. Please try again.",
          });
        }
      } else {
        toast.error("Error", {
          description: "Failed to update saved status. Please try again.",
        });
      }
    } finally {
      setTimeout(() => setIsSaving(false), 1000); // Prevent spam clicking
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white dark:bg-zinc-900"
    >
      <RecipeHero
        recipe={recipe}
        isExpanded={isExpanded}
        onExpandToggle={() => setIsExpanded(!isExpanded)}
      />

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <RecipeHeader
              creator={creator}
              createdAt={createdAt}
              cookTime={recipe.cookTime}
              serving={recipe.serving}
              likes={recipe.likes}
              isSaved={isSaved}
              isSaving={isSaving}
              onSaveToggle={handleSaveRecipe}
            />
            <RecipeIngredients ingredients={recipe.ingredients} />
            <RecipeInstructions instructions={recipe.instructions} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RecipeNutrition
              calories={recipe.calories}
              protein={recipe.protein}
              carbohydrates={recipe.carbohydrates}
              fat={recipe.fat}
            />
            <RecipeComments comments={mockComments} />
          </div>
        </div>
      </div>
    </motion.div>
  );
} 