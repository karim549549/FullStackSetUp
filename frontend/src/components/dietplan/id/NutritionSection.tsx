import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DietPlan } from '@/lib/types/diet.types';

interface NutritionSectionProps {
  dietPlan: DietPlan;
}

export function NutritionSection({ dietPlan }: NutritionSectionProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-3">Daily Nutrition</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
            <p className="text-xs text-red-600 dark:text-red-400">Calories</p>
            <p className="text-sm font-bold text-red-700 dark:text-red-300">{dietPlan.macros.total_calories}</p>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <p className="text-xs text-blue-600 dark:text-blue-400">Protein</p>
            <p className="text-sm font-bold text-blue-700 dark:text-blue-300">{dietPlan.macros.total_protein}g</p>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
            <p className="text-xs text-green-600 dark:text-green-400">Carbs</p>
            <p className="text-sm font-bold text-green-700 dark:text-green-300">{dietPlan.macros.total_carbs}g</p>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
            <p className="text-xs text-yellow-600 dark:text-yellow-400">Fats</p>
            <p className="text-sm font-bold text-yellow-700 dark:text-yellow-300">{dietPlan.macros.total_fats}g</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 