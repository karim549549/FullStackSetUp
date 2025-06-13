'use client';

import React, { useState , useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  ChefHat, 
  Pizza, 
  Salad, 
  Soup, 
  Fish,
  Coffee, 
  Beer, 
  Wine,
  Plus,
  Minus,
  AlertCircle,
  Info
} from 'lucide-react';
import { CUISINE, DietFormData } from '@/lib/types/diet.types';

interface Step2CuisineProps {
  handleFieldChange: <K extends keyof DietFormData>(key: K, value: DietFormData[K]) => void;
  cuisines: { name: CUISINE; percentage: number }[];
}

const cuisineIcons: Record<CUISINE, React.ReactNode> = {
  [CUISINE.ITALIAN]: <Pizza className="w-5 h-5 text-red-500" />,
  [CUISINE.MEDITERRANEAN]: <Salad className="w-5 h-5 text-green-500" />,
  [CUISINE.ASIAN]: <Fish className="w-5 h-5 text-orange-500" />,
  [CUISINE.MIDDLE_EASTERN]: <Soup className="w-5 h-5 text-yellow-500" />,
  [CUISINE.MEXICAN]: <ChefHat className="w-5 h-5 text-red-600" />,
  [CUISINE.AMERICAN]: <Utensils className="w-5 h-5 text-blue-500" />,
  [CUISINE.INDIAN]: <Coffee className="w-5 h-5 text-amber-500" />,
  [CUISINE.THAI]: <Beer className="w-5 h-5 text-orange-400" />,
  [CUISINE.JAPANESE]: <Wine className="w-5 h-5 text-purple-500" />,
  [CUISINE.FRENCH]: <Fish className="w-5 h-5 text-orange-500" />,
  [CUISINE.OTHER]: <Fish className="w-5 h-5 text-orange-500" />,
};

const defaultCuisines = [
  { name: CUISINE.MEDITERRANEAN, percentage: 40 },
  { name: CUISINE.ASIAN, percentage: 30 },
  { name: CUISINE.AMERICAN, percentage: 30 },
];

export default function Step2Cuisine({ handleFieldChange, cuisines }: Step2CuisineProps) {
  const [localCuisines, setLocalCuisines] = useState(cuisines.length ? cuisines : defaultCuisines);
  const [totalPercentage, setTotalPercentage] = useState(100);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    const total = localCuisines.reduce((sum, cuisine) => sum + cuisine.percentage, 0);
    setTotalPercentage(total);
    
    if (total !== 100) {
      setWarning(`Total must be 100% (current: ${total}%). If not adjusted, we'll use a balanced distribution.`);
    } else {
      setWarning(null);
      handleFieldChange('cuisine', localCuisines);
    }
  }, [localCuisines]);

  const handlePercentageChange = (index: number, value: number) => {
    const newCuisines = [...localCuisines];
    newCuisines[index].percentage = value;
    setLocalCuisines(newCuisines);
  };

  const addCuisine = () => {
    if (localCuisines.length >= Object.keys(CUISINE).length) return;
    
    const availableCuisines = Object.values(CUISINE).filter(
      cuisine => !localCuisines.some(c => c.name === cuisine)
    );
    
    if (availableCuisines.length > 0) {
      setLocalCuisines([...localCuisines, { name: availableCuisines[0], percentage: 0 }]);
    }
  };

  const removeCuisine = (index: number) => {
    if (localCuisines.length <= 1) return;
    const newCuisines = localCuisines.filter((_, i) => i !== index);
    setLocalCuisines(newCuisines);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Cuisine Preferences</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Select your preferred cuisines and adjust their percentages. Total must equal 100%.
        </p>
      </div>

      <div className="space-y-4">
        {localCuisines.map((cuisine, index) => (
          <motion.div
            key={cuisine.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-3 min-w-[200px]">
              <div className="p-2 rounded-lg bg-white/10">
                {cuisineIcons[cuisine.name]}
              </div>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {cuisine.name.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-1">
              <button
                onClick={() => handlePercentageChange(index, Math.max(0, cuisine.percentage - 5))}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                disabled={cuisine.percentage <= 0}
              >
                <Minus className="w-4 h-4 text-neutral-500" />
              </button>
              
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cuisine.percentage}
                  onChange={(e) => handlePercentageChange(index, parseInt(e.target.value))}
                  className="w-full cursor-pointer"
                />
              </div>

              <button
                onClick={() => handlePercentageChange(index, Math.min(100, cuisine.percentage + 5))}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                disabled={cuisine.percentage >= 100}
              >
                <Plus className="w-4 h-4 text-neutral-500" />
              </button>

              <span className="w-12 text-right font-medium text-neutral-900 dark:text-neutral-100">
                {cuisine.percentage}%
              </span>
            </div>

            <button
              onClick={() => removeCuisine(index)}
              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
              disabled={localCuisines.length <= 1}
            >
              <Minus className="w-4 h-4 text-red-500" />
            </button>
          </motion.div>
        ))}

        {warning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-amber-500 bg-amber-500/10 p-3 rounded-lg"
          >
            <Info className="w-4 h-4" />
            <span>{warning}</span>
          </motion.div>
        )}

        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <ChefHat className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Total Distribution</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {totalPercentage}% of 100%
              </p>
            </div>
          </div>

          <button
            onClick={addCuisine}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors cursor-pointer"
            disabled={localCuisines.length >= Object.keys(CUISINE).length}
          >
            <Plus className="w-4 h-4" />
            <span>Add Cuisine</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
