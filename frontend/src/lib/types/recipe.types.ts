export type MEAL_TYPE = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"; // Sync with your backend enum
export type RECIPE_SOURCE = "COMMUNITY" | "ADMIN" | "AI"; // Example, update based on your schema

export interface RecipeCreator {
  name: string;
  avatar: string;
  verified: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  ingredients: string[];
  instructions: string[];
  cuisine: string | null;
  mealType: MEAL_TYPE;
  prepTime: string | null;
  cookTime: string | null;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  saturated_fat: number | null;
  cholesterol: number | null;
  sodium: number | null;
  fiber: number | null;
  sugar: number | null;
  vitaminC: number | null;
  calcium: number | null;
  iron: number | null;
  potassium: number | null;
  carbohydrates: number | null;
  serving: number | null;
  tags: string[];
  source: RECIPE_SOURCE;
  createdById: string;
  isPublished: boolean;
  likes: number;
  comments: any | null;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  rating?: number;
  creator?: RecipeCreator;
}

export interface RecipeFilter {
  search?: string;
  serving?: number;
  cuisine?: string;
  mealType?: MEAL_TYPE;
  tags?: string[];
  sort?: "popular" | "likes" | "recent";
  page?: number;
  limit?: number;
}

export interface RecipePaginationView {
  id: string;
  title: string;
  imageUrl: string | null;
  tags: string[];
  cookTime: string | null;
  likes: number;
  source: RECIPE_SOURCE;
  serving: number | null;
}

export interface RecipeResponse {
  items: RecipePaginationView[];
  meta: {
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
