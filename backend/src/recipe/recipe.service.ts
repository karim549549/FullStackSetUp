import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { RecipeRepository } from './repositories/recipe.repo';
import { Recipe } from '@prisma/client';
import { RecipeFilter } from './dtos/recipeQueryFilter.dto';
import { PaginationResponse } from 'src/utils/types/pagination.type';
import { RecipePaginationView } from 'src/utils/types/recipe.types';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepo: RecipeRepository) {}

  async getRecipeById(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepo.getRecipeById(id);

    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async getFilteredRecipes(
    filter: RecipeFilter,
  ): Promise<PaginationResponse<RecipePaginationView>> {
    return await this.recipeRepo.getFilteredRecipes(filter);
  }

  async deleteRecipe(id: string): Promise<void> {
    await this.recipeRepo.deleteRecipe(id);
  }

  async likeRecipe(id: string): Promise<void> {
    console.log('likeRecipe', id);
    await this.recipeRepo.likeRecipe(id);
  }

  async saveRecipe(userId: string, recipeId: string): Promise<void> {
    try {
      const recipe = await this.getRecipeById(recipeId);
      await this.recipeRepo.saveRecipe(userId, recipeId);
    } catch (error) {
      if (error.message === 'Recipe already saved') {
        throw new ConflictException('Recipe already saved');
      }
      throw error;
    }
  }

  async unsaveRecipe(userId: string, recipeId: string): Promise<void> {
    try {
      await this.recipeRepo.unsaveRecipe(userId, recipeId);
    } catch (error) {
      if (error.message === 'Recipe not saved') {
        throw new NotFoundException('Recipe not saved');
      }
      throw error;
    }
  }

  async getSavedRecipes(
    userId: string,
    page?: number,
    limit?: number,
  ): Promise<PaginationResponse<RecipePaginationView>> {
    return await this.recipeRepo.getSavedRecipes(userId, page, limit);
  }
}
