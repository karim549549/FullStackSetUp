import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar as CalendarIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { DietPlan } from '@/lib/types/diet.types';
import { RecipeCard } from './RecipeCard';

interface MealsSectionProps {
  dietPlan: DietPlan;
  currentDay: number;
  onPreviousDay: () => void;
  onNextDay: () => void;
}

export function MealsSection({ dietPlan, currentDay, onPreviousDay, onNextDay }: MealsSectionProps) {
  const [api, setApi] = React.useState<any>();

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Day {currentDay + 1} Meals</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onPreviousDay}
              disabled={currentDay === 0}
              className="h-8 w-8 cursor-pointer"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {currentDay + 1} / {dietPlan.dietDays.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={onNextDay}
              disabled={currentDay === dietPlan.dietDays.length - 1}
              className="h-8 w-8 cursor-pointer"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: false,
          }}
        >
          <CarouselContent>
            {dietPlan.dietDays[currentDay].meals.map((meal) => (
              <CarouselItem key={meal.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="space-y-2">
                  <h3 className="text-base font-medium text-muted-foreground">
                    {meal.mealType}
                  </h3>
                  <RecipeCard recipe={meal.recipe} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0 translate-x-0" />
            <CarouselNext className="static translate-y-0 translate-x-0" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
} 