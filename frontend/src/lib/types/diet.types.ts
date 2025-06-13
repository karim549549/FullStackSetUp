import { DietFormProfile } from "./profile.types";

export enum GOAL {
  LOSE_WEIGHT = "LOSE_WEIGHT",
  BUILD_MUSCLE = "BUILD_MUSCLE",
  MAINTAIN = "MAINTAIN",
  IMPROVE_HEALTH = "IMPROVE_HEALTH",
  INCREASE_ENERGY = "INCREASE_ENERGY"
}

export enum CUISINE {
  AMERICAN = "american",
  ASIAN = "asian",
  ITALIAN = "italian",
  MEXICAN = "mexican",
  MIDDLE_EASTERN = "middle eastern",
  FRENCH = "french",
  INDIAN = "indian",
  OTHER = "other",
  MEDITERRANEAN = "mediterranean",
  THAI = "thai",
  JAPANESE = "japanese",
}

export enum DIET_PLAN_STATUS {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE'
}

export interface DietFormData {
  goal?: GOAL;
  includeSnacks: boolean;
  durationInWeeks: number;
  mealsPerDay: number;
  cuisine: {
    name: CUISINE;
    percentage: number;
  }[];
  useProfile: boolean;
  profile: DietFormProfile;
}

export interface UserDietPlan {
  id: string;
  userId: string;
  dietPlanId: string;
  status: DIET_PLAN_STATUS;
  activatedAt: string | null;
  dietPlan: {
    id: string;
    name: string;
    description: string | null;
    goal: string;
    durationInWeeks: number;
    mealPerDay: number;
    includeSnacks: boolean;
    cuisine: string[];
    creatorId: string;
    macros: {
      total_calories: number;
      total_protein: number;
      total_carbs: number;
      total_fats: number;
    };
    isPublished: boolean;
    likes?: number;
    averageRating?: number;
    ratingCount?: number;
    savedByUsers?: number;
    dietDays: {
      id: string;
      dayOrder: number;
      meals: {
        id: string;
        mealType: string;
        recipe: {
          id: string;
          title: string;
          description: string;
          ingredients: string[];
          instructions: string[];
          prepTime: number;
          cookTime: number;
          servings: number;
          calories: number;
          protein: number;
          carbs: number;
          fats: number;
          imageUrl: string;
        };
      }[];
    }[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface RecipePaginationView {
  id: string;
  title: string;
  imageUrl: string;
  tags: string[];
  cookTime: string;
  likes: number;
  source: 'COMMUNITY' | 'SYSTEM';
  serving: number;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface CuisineDistribution {
  name: string;
  percentage: number;
}

export interface DietPlan {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  goal: string;
  cuisine: CuisineDistribution[];
  includeSnacks: boolean;
  mealPerDay: number;
  macros: {
    total_calories: number;
    total_protein: number;
    total_carbs: number;
    total_fats: number;
  };
  durationInWeeks: number;
  dietDays: {
    id: string;
    dayOrder: number;
    meals: {
      id: string;
      mealType: string;
      recipe: RecipePaginationView;
    }[];
  }[];
  creator: {
    avatar?: string;
    name: string;
  };
  likes: number;
  averageRating: number;
  comments?: Comment[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}
