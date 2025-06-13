import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RecipeService } from './recipe.service';
import { Recipe } from '@prisma/client';
import { RecipePaginationView } from 'src/utils/types/recipe.types';
import { PaginationResponse } from 'src/utils/types/pagination.type';
import { RecipeFilter } from './dtos/recipeQueryFilter.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CustomRequest } from 'src/utils/types/auth.types';

@Controller('recipes')
@UseInterceptors(CacheInterceptor)
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('saved')
  @CacheKey('saved-recipes')
  @CacheTTL(300) 
  async getSavedRecipes(
    @Req() req: CustomRequest,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<PaginationResponse<RecipePaginationView>> {
    console.log('getSavedRecipes controller', { page, limit, userId: req.user.sub });
    return await this.recipeService.getSavedRecipes(
      req.user.sub,
      page,
      limit,
    );
  }

  @Get(':id')
  @CacheKey('recipe')
  @CacheTTL(3600) // Cache for 1 hour
  async getRecipeById(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.getRecipeById(id);
  }

  @Get()
  @CacheKey('recipes')
  @CacheTTL(1800) // Cache for 30 minutes
  async getRecipes(
    @Query() filter: RecipeFilter,
  ): Promise<PaginationResponse<RecipePaginationView>> {
    return this.recipeService.getFilteredRecipes(filter);
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') id: string): Promise<void> {
    return this.recipeService.deleteRecipe(id);
  }

  @Post(':id/like')
  async likeRecipe(@Param('id') id: string): Promise<void> {
    return this.recipeService.likeRecipe(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/save')
  @HttpCode(HttpStatus.CREATED)
  async saveRecipe(
    @Param('id') recipeId: string,
    @Req() req: CustomRequest,
  ): Promise<void> {
    await this.recipeService.saveRecipe(req.user.sub, recipeId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/save')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unsaveRecipe(
    @Param('id') recipeId: string,
    @Req() req: CustomRequest,
  ): Promise<void> {
    await this.recipeService.unsaveRecipe(req.user.sub, recipeId);
  }
}
