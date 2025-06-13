import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChefHat as ChefIcon,
  UtensilsCrossed,
  Salad as SaladIcon,
  Soup as SoupIcon,
  Pizza as PizzaIcon,
  Fish as FishIcon,
  Coffee as CoffeeIcon,
  Beer as BeerIcon,
  Wine as WineIcon,
} from 'lucide-react';
import { DietPlan } from '@/lib/types/diet.types';

interface CuisineSectionProps {
  dietPlan: DietPlan;
}

const cuisineIcons: Record<string, React.ReactNode> = {
  ITALIAN: <PizzaIcon className="h-4 w-4" />,
  MEDITERRANEAN: <SaladIcon className="h-4 w-4" />,
  ASIAN: <SoupIcon className="h-4 w-4" />,
  AMERICAN: <ChefIcon className="h-4 w-4" />,
  MEXICAN: <UtensilsCrossed className="h-4 w-4" />,
  INDIAN: <FishIcon className="h-4 w-4" />,
  JAPANESE: <CoffeeIcon className="h-4 w-4" />,
  THAI: <BeerIcon className="h-4 w-4" />,
  FRENCH: <WineIcon className="h-4 w-4" />,
};

export function CuisineSection({ dietPlan }: CuisineSectionProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-3">Cuisine Distribution</h2>
        <div className="space-y-3">
          {dietPlan.cuisine.map((cuisine, index) => (
            <div
              key={cuisine.name}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-2 min-w-[140px]">
                <div className="p-1.5 rounded-lg bg-white/10">
                  {cuisineIcons[cuisine.name]}
                </div>
                <span className="text-sm font-medium">
                  {cuisine.name.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                </span>
              </div>

              <div className="flex-1">
                <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${cuisine.percentage}%` }}
                  />
                </div>
              </div>

              <span className="w-10 text-right text-sm font-medium">
                {cuisine.percentage}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 