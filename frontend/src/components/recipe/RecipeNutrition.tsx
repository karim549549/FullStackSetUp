"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Scale } from 'lucide-react';

interface RecipeNutritionProps {
  calories?: string;
  protein?: string;
  carbohydrates?: string;
  fat?: string;
}

export function RecipeNutrition({
  calories,
  protein,
  carbohydrates,
  fat,
}: RecipeNutritionProps) {
  return (
    <Card className="bg-white dark:bg-zinc-800">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="h-5 w-5 text-violet-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nutritional Information</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {calories && (
            <div className="text-center p-3 rounded-lg bg-violet-50 dark:bg-violet-900/50">
              <p className="text-xs text-violet-600 dark:text-violet-400">Calories</p>
              <p className="text-base font-semibold text-violet-700 dark:text-violet-300">{calories}</p>
            </div>
          )}
          {protein && (
            <div className="text-center p-3 rounded-lg bg-pink-50 dark:bg-pink-900/50">
              <p className="text-xs text-pink-600 dark:text-pink-400">Protein</p>
              <p className="text-base font-semibold text-pink-700 dark:text-pink-300">{protein}g</p>
            </div>
          )}
          {carbohydrates && (
            <div className="text-center p-3 rounded-lg bg-violet-50 dark:bg-violet-900/50">
              <p className="text-xs text-violet-600 dark:text-violet-400">Carbs</p>
              <p className="text-base font-semibold text-violet-700 dark:text-violet-300">{carbohydrates}g</p>
            </div>
          )}
          {fat && (
            <div className="text-center p-3 rounded-lg bg-pink-50 dark:bg-pink-900/50">
              <p className="text-xs text-pink-600 dark:text-pink-400">Fat</p>
              <p className="text-base font-semibold text-pink-700 dark:text-pink-300">{fat}g</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 