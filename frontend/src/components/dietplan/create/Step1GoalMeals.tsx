'use client';

import React from 'react';
import {
  Calendar,
  ChevronRight,
  CoffeeIcon,
  Goal,
  Utensils,
  Scale,
  Dumbbell,
  Heart,
  TrendingUp,
  Target,
  Cookie,
  Clock
} from 'lucide-react';
import { DietFormData, GOAL as GOALENUM } from '@/lib/types/diet.types';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

const goalDescriptions: Record<GOALENUM, { description: string; icon: React.ReactNode }> = {
  [GOALENUM.LOSE_WEIGHT]: {
    description: 'Lose weight with balanced, calorie-controlled meals.',
    icon: <Scale className="w-6 h-6 text-red-500" />
  },
  [GOALENUM.BUILD_MUSCLE]: {
    description: 'Build muscle with protein-rich, nutrient-dense meals.',
    icon: <Dumbbell className="w-6 h-6 text-blue-500" />
  },
  [GOALENUM.MAINTAIN]: {
    description: 'Maintain your current weight with balanced meals.',
    icon: <Target className="w-6 h-6 text-green-500" />
  },
  [GOALENUM.IMPROVE_HEALTH]: {
    description: 'Improve overall health with clean, nutritious food.',
    icon: <Heart className="w-6 h-6 text-pink-500" />
  },
  [GOALENUM.INCREASE_ENERGY]: {
    description: 'Boost your daily energy and reduce fatigue.',
    icon: <TrendingUp className="w-6 h-6 text-orange-500" />
  },
};

interface Step1GoalMealsProps {
  handleFieldChange: <K extends keyof DietFormData>(key: K, value: DietFormData[K]) => void;
  goal?: GOALENUM;
  includeSnacks: boolean;
  mealsPerDay: number;
  durationInWeeks: number;
}

export default function Step1GoalMeals({
  handleFieldChange,
  goal,
  includeSnacks,
  mealsPerDay,
  durationInWeeks,
}: Step1GoalMealsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">What&apos;s your main goal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(goalDescriptions).map(([goalKey , { description, icon }]) => (
            <motion.button
              key={goalKey}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFieldChange('goal', goalKey)}
              className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                goal === goalKey
                  ? 'bg-violet-500/10 border-violet-500/30 shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)]'
                  : 'bg-white/5 dark:bg-white/5 border-white/10 hover:border-violet-500/20 hover:bg-violet-500/5'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className={`absolute inset-0 bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 ${
                  goal === goalKey ? 'opacity-100' : 'group-hover:opacity-50'
                }`} />
              </div>
              <div className="relative flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-lg transition-colors duration-300 ${
                  goal === goalKey ? 'bg-violet-500/20' : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  {icon}
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                    {goalKey.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <Cookie className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Include Snacks</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Add healthy snacks between meals</p>
            </div>
          </div>
          <Switch
            checked={includeSnacks}
            onCheckedChange={(checked) => handleFieldChange('includeSnacks', checked)}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-4 p-4 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-white/10">
              <Utensils className="w-5 h-5 text-violet-500" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Meals per Day</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Number of main meals in your plan</p>
            </div>
          </div>
          <Slider
            value={[mealsPerDay]}
            onValueChange={(value) => handleFieldChange('mealsPerDay', value[0])}
            min={2}
            max={5}
            step={1}
            className="w-full cursor-pointer"
          />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">{mealsPerDay} meals</p>
        </div>

        <div className="space-y-4 p-4 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-white/10">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Diet Duration</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">How long do you want to follow this plan?</p>
            </div>
          </div>
          <Slider
            value={[durationInWeeks]}
            onValueChange={(value) => handleFieldChange('durationInWeeks', value[0])}
            min={1}
            max={12}
            step={1}
            className="w-full cursor-pointer"
          />
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Clock className="w-4 h-4" />
            <span>{durationInWeeks} weeks</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
