import { RecipeFilter } from '@/lib/types/recipe.types';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

interface RecipeFilterBarProps {
  filter: RecipeFilter;
  onFilterChange: (key: keyof RecipeFilter, value: string | string[] | undefined) => void;
}

const CUISINE_OPTIONS = [
  { value: "ITALIAN", label: "Italian" },
  { value: "MEXICAN", label: "Mexican" },
  { value: "CHINESE", label: "Chinese" },
  { value: "INDIAN", label: "Indian" },
  { value: "JAPANESE", label: "Japanese" },
  { value: "THAI", label: "Thai" },
  { value: "AMERICAN", label: "American" },
  { value: "MEDITERRANEAN", label: "Mediterranean" }
];

const MEAL_TYPE_OPTIONS = [
  { value: "BREAKFAST", label: "Breakfast" },
  { value: "LUNCH", label: "Lunch" },
  { value: "DINNER", label: "Dinner" },
  { value: "SNACK", label: "Snack" },
  { value: "DESSERT", label: "Dessert" }
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "likes", label: "Most Liked" },
  { value: "recent", label: "Most Recent" }
];

export function RecipeFilterBar({ filter, onFilterChange }: RecipeFilterBarProps) {
  const handleCheckboxChange = (key: keyof RecipeFilter, value: string, checked: boolean) => {
    const currentValues = filter[key] as string[] || [];
    let newValues: string[];

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }

    onFilterChange(key, newValues.length > 0 ? newValues : undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Filter Recipes
      </h1>

      {/* Search Input */}
      <div className="space-y-2">
        <Label className="text-gray-700 dark:text-white">Search</Label>
        <Input
          placeholder="Search recipes..."
          value={filter.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="w-full bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white focus:border-violet-500"
        />
      </div>

      {/* Sort Options */}
      <div className="space-y-2">
        <Label className="text-gray-700 dark:text-white">Sort By</Label>
        <div className="flex flex-col space-y-2">
          {SORT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`sort-${option.value}`}
                checked={Array.isArray(filter.sort) ? filter.sort.includes(option.value) : false}
                onCheckedChange={(checked) => handleCheckboxChange('sort', option.value, checked as boolean)}
                className="border-gray-300 dark:border-zinc-700 data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"
              />
              <Label htmlFor={`sort-${option.value}`} className="text-gray-700 dark:text-white cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Cuisine Filter */}
      <div className="space-y-2">
        <Label className="text-gray-700 dark:text-white">Cuisine</Label>
        <div className="flex flex-col space-y-2">
          {CUISINE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`cuisine-${option.value}`}
                checked={Array.isArray(filter.cuisine) ? filter.cuisine.includes(option.value) : false}
                onCheckedChange={(checked) => handleCheckboxChange('cuisine', option.value, checked as boolean)}
                className="border-gray-300 dark:border-zinc-700 data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"
              />
              <Label htmlFor={`cuisine-${option.value}`} className="text-gray-700 dark:text-white cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Type Filter */}
      <div className="space-y-2">
        <Label className="text-gray-700 dark:text-white">Meal Type</Label>
        <div className="flex flex-col space-y-2">
          {MEAL_TYPE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`meal-${option.value}`}
                checked={Array.isArray(filter.mealType) ? filter.mealType.includes(option.value) : false}
                onCheckedChange={(checked) => handleCheckboxChange('mealType', option.value, checked as boolean)}
                className="border-gray-300 dark:border-zinc-700 data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"
              />
              <Label htmlFor={`meal-${option.value}`} className="text-gray-700 dark:text-white cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 