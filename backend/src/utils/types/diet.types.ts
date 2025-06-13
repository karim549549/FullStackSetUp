import { DIET_PLAN_STATUS } from "@prisma/client";

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';

export interface DailyNutrients {
  fats: number;
  carbs: number;
  protein: number;
}

export interface MealFrequency {
  breakfast: number;
  lunch: number;
  dinner: number;
  snack: number;
  dessert: number;
}

export interface DietaryPreferences {
  diet_type: string;
  avoid_foods: string[];
  preferred_cuisines: string[];
}

export interface UserProfile {
  daily_calorie_target: number;
  daily_nutrients: DailyNutrients;
  meal_frequency: MealFrequency;
  dietary_preferences: DietaryPreferences;
}

export interface MealPlanRequest {
  user_profile: UserProfile;
}

export interface Meal {
  title: string;
  score: number;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  meal_type: MealType;
}

export type DailyMealPlan = Meal[];

export interface MealPlanSummary {
  total_days: number;
  total_meals: number;
  unique_recipes: number;
  variety_score: number;
  avg_daily_calories: number;
}

export interface MealPlanResponseData {
  success: boolean;
  meal_plan: DailyMealPlan[];
  summary: MealPlanSummary;
  message: string;
}

export interface MealPlanAPIResponse {
  success: boolean;
  data: {
    status: 'success';
    data: MealPlanResponseData;
    message: string;
  };
  message: string;
}

// If you want a lightweight prediction version (without summary), keep this:
export interface PredictMealPlanResponse {
  success: true;
  data: {
    status: 'success';
    data: {
      success: true;
      meal_plan: DailyMealPlan[];
    };
  };
}

// Base types for meal data
export interface BaseMeal {
  title: string;
  meal_type: string;
  calories?: number;
  fat?: number;
  carbs?: number;
  protein?: number;
  score?: number;
  [key: string]: any; // Allow any additional properties
}

// Flexible meal plan response
export interface FlexibleMealPlanResponse {
  success: boolean;
  data?: {
    status?: string;
    data?: {
      success?: boolean;
      meal_plan?: BaseMeal[][];
      summary?: {
        total_days?: number;
        total_meals?: number;
        unique_recipes?: number;
        variety_score?: number;
        avg_daily_calories?: number;
        [key: string]: any; // Allow any additional summary properties
      };
      message?: string;
      [key: string]: any; // Allow any additional data properties
    };
    message?: string;
    [key: string]: any; // Allow any additional data properties
  };
  message?: string;
  [key: string]: any; // Allow any additional top-level properties
}

// Database compatible types
export interface DietPlanMacros {
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fats: number;
  [key: string]: any; // Allow additional macro properties
}

// Request types remain strict for API calls
export interface MealPlanRequest {
  user_profile: {
    daily_calorie_target: number;
    daily_nutrients: {
      fats: number;
      carbs: number;
      protein: number;
    };
    meal_frequency: {
      breakfast: number;
      lunch: number;
      dinner: number;
      snack: number;
      dessert: number;
    };
    dietary_preferences: {
      diet_type: string;
      avoid_foods: string[];
      preferred_cuisines: string[];
    };
  };
}

// Paginated Diet Plan View Types
export interface DietPlanListView {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  goal: string;
  durationInWeeks: number;
  mealPerDay: number;
  includeSnacks: boolean;
  isPublished: boolean;
  liked: number;
  averageRating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedDietPlansResponse {
  items: DietPlanListView[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

/*export enum DIET_PLAN_STATUS {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE'
}
*/
export interface UserDietPlanView {
  id: string;
  userId: string;
  dietPlanId: string;
  status: DIET_PLAN_STATUS;
  activatedAt?: Date | null;
  dietPlan: DietPlanListView;
}

export interface DietPlanRecipeCard {
  id: string;
  title: string;
  imageUrl: string;
  tags: string[];
  cookTime: string;
  likes: number;
  source: string;
  serving: number;
}

export interface DietPlanMeal {
  id: string;
  mealType: string;
  recipe: DietPlanRecipeCard;
}

export interface DietPlanDay {
  id: string;
  dayOrder: number;
  meals: DietPlanMeal[];
}

export interface DietPlanDetail {
  id: string;
  name: string;
  description: string;
  goal: string;
  macros: {
    total_calories: number;
    total_protein: number;
    total_carbs: number;
    total_fats: number;
  };
  durationInWeeks: number;
  liked: number;
  ratingCount: number;
  averageRating: number;
  savedCount: number;
  createdAt: string;
  cuisine: { name: string; percentage: number }[];
  dietDays: DietPlanDay[];
}
