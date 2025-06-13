"use client";

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

interface RecipeIngredientsProps {
  ingredients: string[];
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  return (
    <Card className="bg-white dark:bg-zinc-800">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <ClipboardList className="h-5 w-5 text-violet-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Ingredients</h2>
          <span className="text-sm text-muted-foreground">({ingredients.length})</span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ingredients.map((ingredient, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full"></span>
              {ingredient}
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 