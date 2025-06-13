import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GOAL, MEAL_TYPE, CUISINE, Recipe } from '@prisma/client';
import { DietPlanListView, PaginatedDietPlansResponse, DietPlanDetail } from '../../utils/types/diet.types';
import { DIET_PLAN_STATUS } from '@prisma/client';

@Injectable()
export class DietPlanRepository {
    private readonly logger = new Logger(DietPlanRepository.name);

    constructor(private readonly prisma: PrismaService) {}

    private selectDietPlanDetail(dayPage: number = 1, dayPageSize: number = 1) {
        return {
            id: true,
            name: true,
            description: true,
            goal: true,
            macros: true,
            durationInWeeks: true,
            liked: true,
            ratingCount: true,
            averageRating: true,
            createdAt: true,
            cuisine: true,
            _count: { select: { savedByUsers: true } },
            dietDays: {
                orderBy: [{ dayOrder: 'asc' as const }],
                skip: (dayPage - 1) * dayPageSize,
                take: +dayPageSize,
                include: {
                    meals: {
                        include: {
                            recipe: {
                                select: {
                                    id: true,
                                    title: true,
                                    imageUrl: true,
                                    tags: true,
                                    cookTime: true,
                                    likes: true,
                                    source: true,
                                    serving: true,
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    async create(data: {
        name: string;
        description?: string;
        goal: GOAL;
        durationInWeeks: number;
        mealPerDay: number;
        includeSnacks: boolean;
        cuisine: any;
        creatorId: string;
        macros: any;
        isPublished: boolean;
    }) {
        return this.prisma.dietPlan.create({
            data: {
                name: data.name,
                description: data.description,
                goal: data.goal,
                durationInWeeks: data.durationInWeeks,
                mealPerDay: data.mealPerDay,
                includeSnacks: data.includeSnacks,
                cuisine: data.cuisine,
                creatorId: data.creatorId,
                macros: data.macros,
                isPublished: data.isPublished
            }
        });
    }

    async createRecipe(data: {
        title: string;
        description: string;
        ingredients: string[];
        instructions: string[];
        cuisine: string;
        mealType: MEAL_TYPE;
        prepTime: string;
        cookTime: string;
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        serving: number;
        imageUrl?: string;
        createdById: string;
        tags: string[];
        isPublished: boolean;
    }) {
        return this.prisma.recipe.create({
            data: {
                title: data.title,
                description: data.description,
                ingredients: data.ingredients,
                instructions: data.instructions,
                cuisine: data.cuisine as CUISINE,
                mealType: data.mealType,
                prepTime: data.prepTime,
                cookTime: data.cookTime,
                calories: data.calories,
                protein: data.protein,
                carbohydrates: data.carbs,
                fat: data.fat,
                serving: data.serving,
                imageUrl: data.imageUrl,
                createdById: data.createdById,
                tags: data.tags,
                isPublished: data.isPublished
            }
        });
    }

    async createDietDay(data: {
        dietPlanId: string;
        dayOrder: number;
    }) {
        return this.prisma.dietDay.create({
            data: {
                dietPlanId: data.dietPlanId,
                dayOrder: data.dayOrder
            }
        });
    }

    async createMeal(data: {
        dayId: string;
        mealType: MEAL_TYPE;
        recipeId: string;
    }) {
        return this.prisma.meal.create({
            data: {
                dayId: data.dayId,
                mealType: data.mealType,
                recipeId: data.recipeId
            }
        });
    }

    async getDietPlanById(id: string) {
        return this.prisma.dietPlan.findUnique({
            where: { id },
            include: {
                dietDays: {
                    include: {
                        meals: {
                            include: {
                                recipe: true
                            }
                        }
                    }
                }
            }
        });
    }

    async getUserDietPlans(userId: string, page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;
        const [total, items] = await Promise.all([
            this.prisma.userDietPlan.count({
                where: { userId }
            }),
            this.prisma.userDietPlan.findMany({
                where: { userId },
                include: {
                    dietPlan: {
                        include: {
                            dietDays: {
                                include: {
                                    meals: {
                                        include: {
                                            recipe: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                skip,
                take: +pageSize,
                orderBy: { activatedAt: 'desc' }
            })
        ]);
        const totalPages = Math.ceil(total / pageSize);
        const hasMore = page < totalPages;
        return {
            items,
            total,
            page,
            pageSize,
            totalPages,
            hasMore
        };
    }

    async findRecipeByTitle(title: string): Promise<Recipe | null> {
        this.logger.debug(`🔍 Finding recipe by title: ${title}`);
        const recipe = await this.prisma.recipe.findFirst({
            where: {
                title: {
                    equals: title,
                    mode: 'insensitive' 
                }
            }
        });
        
        if (recipe) {
            this.logger.debug(`✅ Found recipe: ${recipe.title}`);
        } else {
            this.logger.warn(`⚠️ No recipe found with title: ${title}`);
        }
        
        return recipe;
    }

    async createUserDietPlan(data: {
        dietPlanId: string;
        userId: string;
    }) {
        return this.prisma.userDietPlan.create({
            data: {
                dietPlanId: data.dietPlanId,
                userId: data.userId,
                status: DIET_PLAN_STATUS.NEW
            }
        });
    }

    async getUserDietPlanById(id: string) {
        return this.prisma.userDietPlan.findUnique({
            where: { id },
            include: {
                dietPlan: true,
                progressLogs: true
            }
        });
    }

    async deleteUserDietPlan(id: string) {
        // First delete associated progress logs
        await this.prisma.progressLogs.deleteMany({
            where: { userDietPlanId: id }
        });

        // Then delete the user diet plan
        return this.prisma.userDietPlan.delete({
            where: { id }
        });
    }

    async toggleUserDietPlanActive(id: string) {
        // First get the current state
        const currentPlan = await this.prisma.userDietPlan.findUnique({
            where: { id },
            include: {
                dietPlan: {
                    include: {
                        dietDays: {
                            include: {
                                meals: {
                                    include: {
                                        recipe: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!currentPlan) {
            throw new Error('User diet plan not found');
        }

        // If we're activating a plan
        if (currentPlan.status !== DIET_PLAN_STATUS.ACTIVE) {
            // First deactivate any other active plans for this user
            await this.prisma.userDietPlan.updateMany({
                where: {
                    userId: currentPlan.userId,
                    status: DIET_PLAN_STATUS.ACTIVE,
                    id: { not: id } // Exclude the current plan
                },
                data: {
                    status: DIET_PLAN_STATUS.NOT_ACTIVE
                }
            });

            // Activate the current plan
            return this.prisma.userDietPlan.update({
                where: { id },
                data: {
                    status: DIET_PLAN_STATUS.ACTIVE,
                    activatedAt: new Date()
                },
                include: {
                    dietPlan: {
                        include: {
                            dietDays: {
                                include: {
                                    meals: {
                                        include: {
                                            recipe: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        } else {
            // Deactivate the current plan
            return this.prisma.userDietPlan.update({
                where: { id },
                data: {
                    status: DIET_PLAN_STATUS.NOT_ACTIVE
                },
                include: {
                    dietPlan: {
                        include: {
                            dietDays: {
                                include: {
                                    meals: {
                                        include: {
                                            recipe: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    async getDietPlanDetailById(id: string, dayPage: number = 1, dayPageSize: number = 1): Promise<any> {
        return this.prisma.dietPlan.findUnique({
            where: { id },
            select: this.selectDietPlanDetail(dayPage, dayPageSize),
        });
    }
}
