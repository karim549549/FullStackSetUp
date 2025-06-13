import { Controller, Get, Post, Body, UseGuards, Req, Param, Query, Delete, UseInterceptors, Patch } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { DietplanService } from './dietplan.service';
import { CreateDietPlanDto } from './dtos/CreateDietPlanDto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CustomRequest } from '../utils/types/auth.types';
import { DietApiService } from './diet.api';
import { DietPlanDetail } from '../utils/types/diet.types';

@Controller('dietplan')
@UseInterceptors(CacheInterceptor)
export class DietplanController {
  constructor(
    private readonly dietApiService: DietApiService,
    private readonly dietplanService: DietplanService
  ) {}

  @Get('health')
  @CacheKey('diet-health')
  @CacheTTL(300) // Cache for 5 minutes
  async healthCheck() {
    console.log('🔍 Health check endpoint called');
    const mealPlanRequest = {
      user_profile: {
        'daily_calorie_target': 2000,
        'daily_nutrients': {
            'fats': 0.30,      
            'carbs': 0.45,     
            'protein': 0.25   
        },
        'meal_frequency': {
            'breakfast': 1,
            'lunch': 1,
            'dinner': 1,
            'snack': 2,
            'dessert':1
        },
        'dietary_preferences': {
            'diet_type': 'omnivore',
            'avoid_foods': [],
            'preferred_cuisines': ['American', 'Asian', 'European']
        }
      },
    };

    try {
      console.log('📤 Sending request to diet API:', JSON.stringify(mealPlanRequest, null, 2));
      const response = await this.dietApiService.getDietPlan(mealPlanRequest);
      console.log('📥 Received response from diet API:', JSON.stringify(response, null, 2));
      return {
        status: 'success',
        data: response
      };
    } catch (error) {
      console.error('❌ Error in health check:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      return {
        status: 'error',
        message: error.message,
        error: error.response?.data || error
      };
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async generateMealPlan(@Body() dto: CreateDietPlanDto, @Req() req: CustomRequest) {
    console.log('🔍 Generate meal plan endpoint called');
    console.log('📦 Request DTO:', JSON.stringify(dto, null, 2));
    console.log('👤 User ID:', req.user.sub);

    await this.dietplanService.createDietPlan(dto, req.user.sub);
    return {
      success: true,
      message: 'Diet plan created successfully',
      data: null
    };
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @CacheKey('user-diet-plans')
  @CacheTTL(300) // Cache for 5 minutes
  async getUserDietPlans(
    @Req() req: CustomRequest,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ) {
    return await this.dietplanService.getUserDietPlans(req.user.sub, page, pageSize);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @CacheKey('diet-plan')
  @CacheTTL(3600) // Cache for 1 hour
  async getDietPlanById(
    @Param('id') id: string,
    @Query('dayPage') dayPage: number = 1,
    @Query('dayPageSize') dayPageSize: number = 1
  ): Promise<DietPlanDetail> {
    console.log('🔍 Get diet plan by id endpoint called' , id);
    return this.dietplanService.getDietPlanById(id, dayPage, dayPageSize);
  }

  @Delete('user/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUserDietPlan(
    @Param('id') dietPlanId: string,
    @Req() req: CustomRequest
  ) {
    return await this.dietplanService.deleteUserDietPlan(dietPlanId, req.user.sub);
  }

  @Patch('user/:id/toggle-active')
  @UseGuards(JwtAuthGuard)
  async toggleUserDietPlanActive(
    @Param('id') dietPlanId: string,
    @Req() req: CustomRequest
  ) {
    const result = await this.dietplanService.toggleUserDietPlanActive(dietPlanId, req.user.sub);
    console.log('📥 Response data:', JSON.stringify(result, null, 2));
    return result;
  }
}
