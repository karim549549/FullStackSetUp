import { DietPlanDetail } from '@/components/dietplan/id/DietPlanDetail';
import { notFound } from 'next/navigation';
import { CUISINE } from '@/lib/types/diet.types';
import { DietPlanApis } from '@/services/apis/dietplan.apis';

// Temporary mock data
const mockDietPlan = {
  id: '1',
  name: 'Mediterranean Weight Loss Plan',
  description: 'A balanced diet plan focusing on Mediterranean cuisine for healthy weight loss.',
  imageUrl: '/placeholder-diet.jpg',
  goal: 'LOSE_WEIGHT',
  cuisine: [
    { name: CUISINE.MEDITERRANEAN, percentage: 60 },
    { name: CUISINE.ASIAN, percentage: 40 }
  ],
  includeSnacks: true,
  mealPerDay: 4,
  macros: {
    total_calories: 2000,
    total_protein: 120,
    total_carbs: 200,
    total_fats: 70
  },
  durationInWeeks: 4,
  creator: {
    name: 'FitAI'
  },
  likes: 0,
  averageRating: 0,
  comments: [
    {
      user: { name: 'FitAI' },
      content: 'Great diet plan! Really helped me achieve my goals.',
      createdAt: new Date().toISOString()
    },
    {
      user: { name: 'FitAI' },
      content: 'The meal variety is excellent.',
      createdAt: new Date().toISOString()
    }
  ],
  dietDays: [
    {
      id: '1',
      dayOrder: 1,
      meals: [
        {
          id: '1',
          mealType: 'BREAKFAST',
          recipe: {
            id: '1',
            title: 'Greek Yogurt with Berries',
            imageUrl: '/placeholder-recipe.jpg',
            tags: ['breakfast', 'healthy'],
            cookTime: '0 mins',
            likes: 0,
            source: 'COMMUNITY' as const,
            serving: 1
          }
        },
        {
          id: '2',
          mealType: 'LUNCH',
          recipe: {
            id: '2',
            title: 'Mediterranean Salad',
            imageUrl: '/placeholder-recipe.jpg',
            tags: ['lunch', 'salad'],
            cookTime: '0 mins',
            likes: 0,
            source: 'COMMUNITY' as const,
            serving: 1
          }
        }
      ]
    }
  ]
};

interface DietPlanPageProps {
  params: {
    id: string;
  };
}

export default async function DietPlanPage({ params }: DietPlanPageProps) {
  // This will be replaced with API call
  const { id } = await  params;

  const dietPlan2 = await  DietPlanApis.getDietPlanById(id);
  console.log('🔍 Diet plan:', dietPlan2);

  return <DietPlanDetail dietPlan={mockDietPlan} />;
}
