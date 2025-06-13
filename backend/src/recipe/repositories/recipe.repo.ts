import { Injectable } from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { title } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationResponse } from 'src/utils/types/pagination.type';
import { RecipeFilter } from '../dtos/recipeQueryFilter.dto';
import { RecipePaginationView } from 'src/utils/types/recipe.types';

@Injectable()
export class RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  private PaginationView = {
    id: true,
    title: true,
    imageUrl: true,
    tags: true,
    cookTime: true,
    likes: true,
    source: true,
    serving: true,
  };
  async getRecipeById(id: string): Promise<Recipe | null> {
    return this.prisma.recipe.findUnique({
      where: { id },
    });
  }

  async getFilteredRecipes(
    filter: RecipeFilter,
  ): Promise<PaginationResponse<RecipePaginationView>> {
    const {
      search,
      cuisine,
      mealType,
      tags,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
    } = filter ?? {};

    const where: Record<string, any> = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { ingredients: { has: search } },
      ];
    }

    if (cuisine) {
      where.cuisine = cuisine;
    }

    if (mealType) {
      where.mealType = mealType;
    }

    if (tags?.length) {
      where.tags = {
        hasSome: tags,
      };
    }

    const skip = (page - 1) * limit;

    const [total, recipes] = await Promise.all([
      this.prisma.recipe.count({ where }),
      this.prisma.recipe.findMany({
        where,
        skip,
        take: +limit,
        orderBy: {
          [sort]: order,
        },
        select: this.PaginationView,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items: recipes,
      meta: {
        totalPages,
        totalItems: total,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async deleteRecipe(id: string): Promise<void> {
    await this.prisma.recipe.delete({
      where: { id },
    });
  }

  async likeRecipe(id: string): Promise<void> {
    await this.prisma.recipe.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  async saveRecipe(userId: string, recipeId: string): Promise<void> {
    // Check if recipe is already saved
    const existingSavedRecipe = await this.prisma.savedRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    if (existingSavedRecipe) {
      throw new Error('Recipe already saved');
    }

    await this.prisma.savedRecipe.create({
      data: {
        userId,
        recipeId,
      },
    });
  }

  async unsaveRecipe(userId: string, recipeId: string): Promise<void> {
    // Check if recipe is saved before unsaving
    const existingSavedRecipe = await this.prisma.savedRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    if (!existingSavedRecipe) {
      throw new Error('Recipe not saved');
    }

    await this.prisma.savedRecipe.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });
  }

  async getSavedRecipes(
    userId: string,
    page = 1,
    limit = 10,
  ): Promise<PaginationResponse<RecipePaginationView>> {
    const skip = (page - 1) * limit;

    const [total, savedRecipes] = await Promise.all([
      this.prisma.savedRecipe.count({
        where: { userId },
      }),
      this.prisma.savedRecipe.findMany({
        where: { userId },
        skip,
        take: +limit,
        orderBy: {
          savedAt: 'desc',
        },
        select: {
          recipe: {
            select: this.PaginationView,
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items: savedRecipes.map((sr) => sr.recipe),
      meta: {
        totalPages,
        totalItems: total,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
