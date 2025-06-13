import { Recipe, RecipeFilter, RecipeResponse } from "@/lib/types/recipe.types";
import { ApiError } from "@/lib/types/api.types";
import { apiClientMethods } from '@/lib/utils/apiClient';

export const recipeApi = {
  async getRecipeById(id: string): Promise<Recipe> {
    try {
      const response = await apiClientMethods.get<{ data: Recipe }>(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Failed to fetch recipe");
    }
  },

  async getFilteredRecipes(filter: RecipeFilter): Promise<RecipeResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (filter.search) queryParams.append("search", filter.search);
      if (filter.cuisine) queryParams.append("cuisine", filter.cuisine);
      if (filter.mealType) queryParams.append("mealType", filter.mealType);
      if (filter.tags) queryParams.append("tags", filter.tags.join(","));
      queryParams.append("page", filter.page?.toString() || "1");
      queryParams.append("limit", filter.limit?.toString() || "9");

      const response = await apiClientMethods.get<{ data: RecipeResponse }>(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Failed to fetch recipes");
    }
  },

  async saveRecipe(id: string): Promise<void> {
    try {
      await apiClientMethods.post(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}/save`
      );
    } catch (error) {
      if (error instanceof Error && error.message.includes('409')) {
        throw new ApiError("Recipe already saved", 409);
      }
      throw new ApiError("Failed to save recipe");
    }
  },

  async unsaveRecipe(id: string): Promise<void> {
    try {
      await apiClientMethods.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}/save`
      );
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        throw new ApiError("Recipe not saved", 404);
      }
      throw new ApiError("Failed to unsave recipe");
    }
  },

  async getSavedRecipes(page = 1, limit = 9): Promise<RecipeResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());

      const response = await apiClientMethods.get<{ data: RecipeResponse }>(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/saved?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Failed to fetch saved recipes");
    }
  },
};
