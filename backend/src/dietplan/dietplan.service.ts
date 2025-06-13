import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DietPlanRepository } from './repositories/dietPlan.repo';
import { DietApiService } from './diet.api';
import { CreateDietPlanDto } from './dtos/CreateDietPlanDto';
import { MealPlanRequest, DietPlanDetail } from '../utils/types/diet.types';
import { ProfileService } from 'src/profile/profile.service';
import { ACTIVITY_LEVEL, GENDER, GOAL, MEAL_TYPE, UserDietPlan } from '@prisma/client';
import { ProfileUserView } from 'src/utils/types/profile.types';
import { ApiResponse } from '../common/types/api.types';

@Injectable()
export class DietplanService {
  constructor(
    private readonly dietPlanRepository: DietPlanRepository,
    private readonly dietApiService: DietApiService,
    private readonly profileService: ProfileService
  ) {}

  private calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    
    return age;
  }

  private calculateBMR(weight: number , height : number , age : number , gender : GENDER) {
    if(gender === GENDER.MALE) {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }
  private getGoalAdjustments(goal : GOAL) {
    switch(goal) {
      case GOAL.LOSE_WEIGHT:
        return 0.8;
      case GOAL.GAIN_WEIGHT:
        return 1.2;
      case GOAL.MAINTAIN_WEIGHT:
        return 1;
      case GOAL.BUILD_MUSCLE:
        return 1.2;
      case GOAL.IMPROVE_ENDURANCE:
        return 1.2;
      default:
        return 1;
    }
  }

  private getActivityLevelMultiplier(activityLevel : ACTIVITY_LEVEL) {
    switch(activityLevel) {
      case ACTIVITY_LEVEL.SEDENTARY:
        return 1.2;
      case ACTIVITY_LEVEL.LIGHTLY_ACTIVE:
        return 1.375;
      case ACTIVITY_LEVEL.MODERATELY_ACTIVE:
        return 1.55;
      case ACTIVITY_LEVEL.VERY_ACTIVE:
        return 1.725;
      case ACTIVITY_LEVEL.EXTRA_ACTIVE:
        return 1.9;
      default:
        return 1;
    }
  }
  private calculateMacroDistribution(
    totalCalories: number,
    goal: GOAL
  ): { protein: number; carbs: number; fats: number } {
    let proteinPercentage: number;
    let carbsPercentage: number;
    let fatsPercentage: number;

    switch (goal) {
      case GOAL.LOSE_WEIGHT:
        proteinPercentage = 0.4; 
        carbsPercentage = 0.3;   
        fatsPercentage = 0.3;   
        break;
      case GOAL.BUILD_MUSCLE:
        proteinPercentage = 0.35;
        carbsPercentage = 0.45;   
        fatsPercentage = 0.2;     
        break;
      case GOAL.MAINTAIN_WEIGHT:
        proteinPercentage = 0.3;  
        carbsPercentage = 0.4;    
        fatsPercentage = 0.3;     
        break;
      case GOAL.IMPROVE_ENDURANCE:
        proteinPercentage = 0.25; 
        carbsPercentage = 0.55;   
        fatsPercentage = 0.2;     
        break;
      default:
        proteinPercentage = 0.3;
        carbsPercentage = 0.4;
        fatsPercentage = 0.3;
    }    return {
      protein: Math.round((totalCalories * proteinPercentage) / 4), 
      carbs: Math.round((totalCalories * carbsPercentage) / 4),   
      fats: Math.round((totalCalories * fatsPercentage) / 9),     
    };
  }
  async calculateDailyCalories(
    weight: number,
    height: number,
    age: number,
    gender: GENDER,
    activityLevel: ACTIVITY_LEVEL,
    goal: GOAL
  ): Promise<{
    bmr: number;
    tdee: number;
    targetCalories: number;
    macros: { protein: number; carbs: number; fats: number };
  }> {
    // Calculate BMR
    const bmr = this.calculateBMR(weight, height, age, gender);

    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityMultiplier = this.getActivityLevelMultiplier(activityLevel);
    const tdee = bmr * activityMultiplier;

    // Adjust calories based on goal
    const goalAdjustment = this.getGoalAdjustments(goal);
    const targetCalories = Math.round(tdee + goalAdjustment);

    // Calculate macro distribution
    const macros = this.calculateMacroDistribution(targetCalories, goal);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      macros,
    };
  }

  async createDietPlan(createDietPlanDto: CreateDietPlanDto, userId: string) {
    let profileData: ProfileUserView;

    if (createDietPlanDto.useProfile) {
      try {
        profileData = await this.profileService.getProfile(userId);
      } catch (error) {
        throw new NotFoundException('User profile not found');
      }
    } else {
      profileData = {
        ...createDietPlanDto.profile,
        smoke: createDietPlanDto.profile.smoker || false,
        birthdate: new Date(createDietPlanDto.profile.birthdate)
      };
    }

    // Calculate age from birthdate
    const age = this.calculateAge(profileData.birthdate);

    // Calculate daily calories and macros
    const { targetCalories, macros } = await this.calculateDailyCalories(
      profileData.weight,
      profileData.height,
      age,
      profileData.gender,
      profileData.activityLevel,
      createDietPlanDto.goal
    );

    // Prepare meal plan request
    const mealPlanRequest: MealPlanRequest = {
      user_profile: {
        daily_calorie_target: targetCalories,
        daily_nutrients: {
          fats: macros.fats,      
          carbs: macros.carbs,     
          protein:macros.protein  
        },
        meal_frequency: {
          breakfast: 1,
          lunch: 1,
          dinner: 1,
          snack: 2,
          dessert: 1
        },
        dietary_preferences: {
          diet_type: profileData.vegetarian ? 'vegetarian' : profileData.vegan ? 'vegan' : 'omnivore',
          avoid_foods: [],
          preferred_cuisines: createDietPlanDto.cuisine.flatMap(c => c.name)
        }
      }
    };

    // Generate meal plan using the API service
    const mealPlanResponse = await this.dietApiService.getDietPlan(mealPlanRequest);
    // Log the response for debugging
    console.log('Meal Plan Response:', JSON.stringify(mealPlanResponse, null, 2));

    // Handle both direct and nested response structures
    let meal_plan, summary;
    if (mealPlanResponse.meal_plan && mealPlanResponse.summary) {
      // Direct structure (create endpoint)
      meal_plan = mealPlanResponse.meal_plan;
      summary = mealPlanResponse.summary;
      console.log('✅ Using direct meal_plan structure');
    } else if (mealPlanResponse.data?.data?.meal_plan && mealPlanResponse.data?.data?.summary) {
      // Nested structure (health check endpoint)
      meal_plan = mealPlanResponse.data.data.meal_plan;
      summary = mealPlanResponse.data.data.summary;
      console.log('✅ Using nested meal_plan structure');
    } else {
      console.error('❌ Invalid meal plan response structure:', mealPlanResponse);
      throw new Error('Invalid meal plan response structure');
    }

    // Create and save the diet plan
    const dietPlan = await this.dietPlanRepository.create({
      name: createDietPlanDto.name,
      description: createDietPlanDto.description,
      goal: createDietPlanDto.goal,
      durationInWeeks: createDietPlanDto.durationInWeeks,
      mealPerDay: createDietPlanDto.mealPerDay,
      includeSnacks: createDietPlanDto.includeSnacks,
      cuisine: createDietPlanDto.cuisine,
      creatorId: userId,
      macros: {
        total_calories: summary.avg_daily_calories * summary.total_days,
        total_protein: 0,
        total_carbs: 0,
        total_fats: 0
      },
      isPublished: false
    });

    // Create user diet plan
    await this.dietPlanRepository.createUserDietPlan({
      dietPlanId: dietPlan.id,
      userId: userId
    });

    // Create diet days and meals
    for (let i = 0; i < meal_plan.length; i++) {
      const day = await this.dietPlanRepository.createDietDay({
        dietPlanId: dietPlan.id,
        dayOrder: i
      });

      for (const meal of meal_plan[i]) {
        // Find existing recipe by title
        const recipe = await this.dietPlanRepository.findRecipeByTitle(meal.title);
        if (!recipe) {
          console.error(`Recipe not found: ${meal.title}`);
          continue;
        }

        // Create meal with recipe reference
        await this.dietPlanRepository.createMeal({
          dayId: day.id,
          mealType: meal.meal_type.toUpperCase() as MEAL_TYPE,
          recipeId: recipe.id
        });
      }
    }
  }

  async getUserDietPlans(userId: string, page: number = 1, pageSize: number = 10) {
    const userDietPlans  = await this.dietPlanRepository.getUserDietPlans(userId, page, pageSize); 
    if (!userDietPlans) {
      throw new NotFoundException('No diet plans found for this user');
    }
    return userDietPlans;
  }

  async getDietPlanById(id: string, dayPage: number = 1, dayPageSize: number = 1): Promise<DietPlanDetail> {
    const result = await this.dietPlanRepository.getDietPlanDetailById(id, dayPage, dayPageSize);
    if (!result) throw new NotFoundException('Diet plan not found');
    // Map to DietPlanDetail type
    return {
      ...result,
      savedCount: result._count.savedByUsers,
      _count: undefined,
    } as DietPlanDetail;
  }

  async deleteUserDietPlan(userDietPlanId: string, userId: string) {
    // First check if the user diet plan exists and belongs to the user
    const userDietPlan = await this.dietPlanRepository.getUserDietPlanById(userDietPlanId);
    
    if (!userDietPlan) {
      throw new NotFoundException('User diet plan not found');
    }

    if (userDietPlan.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this diet plan');
    }

    // Delete the user diet plan and its associated progress logs
    await this.dietPlanRepository.deleteUserDietPlan(userDietPlanId);

    return {
      success: true,
      message: 'Diet plan deleted successfully'
    };
  }

  async toggleUserDietPlanActive(dietPlanId: string, userId: string): Promise<ApiResponse<UserDietPlan>> {
    const userDietPlan = await this.dietPlanRepository.toggleUserDietPlanActive(dietPlanId);
    console.log('📥 Toggle response:', JSON.stringify(userDietPlan, null, 2));
    return {
      success: true,
      message: userDietPlan.status === 'ACTIVE' ? 'Diet plan activated successfully' : 'Diet plan deactivated successfully',
      data: userDietPlan
    };
  }

  async createUserDietPlan(data: {
    dietPlanId: string;
    userId: string;
  }) {
    return this.dietPlanRepository.createUserDietPlan({
      dietPlanId: data.dietPlanId,
      userId: data.userId
    });
  }
}
