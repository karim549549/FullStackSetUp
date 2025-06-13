"use client";

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ListOrdered } from 'lucide-react';

interface RecipeInstructionsProps {
  instructions: string[];
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  return (
    <Card className="bg-white dark:bg-zinc-800">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <ListOrdered className="h-5 w-5 text-violet-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Instructions</h2>
          <span className="text-sm text-muted-foreground">({instructions.length})</span>
        </div>
        <div className="space-y-2">
          {instructions.map((instruction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="grid grid-cols-[auto_1fr] gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700/50"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{instruction}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 