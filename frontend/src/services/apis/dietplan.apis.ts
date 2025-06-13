import { DietFormData, ApiResponse, PaginatedResponse, UserDietPlan } from '@/lib/types/diet.types';
import { apiClientMethods } from '@/lib/utils/apiClient';

interface DietPlanResponse {
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
    dietDays: {
        id: string;
        dayOrder: number;
        meals: {
            id: string;
            mealType: string;
            recipe: {
                id: string;
                title: string;
                imageUrl: string;
                tags: string[];
                cookTime: string;
                likes: number;
                source: string;
                serving: number;
            };
        }[];
    }[];
}

export const DietPlanApis = {
    generateDietPlan: async (data: DietFormData & { name: string; description?: string }): Promise<ApiResponse<null>> => {
        try {
            return await apiClientMethods.post<ApiResponse<null>>(
                `${process.env.NEXT_PUBLIC_API_URL}/dietplan`,
                data
            );
        } catch (error) {
            console.error('Error generating diet plan:', error);
            throw error;
        }
    },

    getDietPlanById: async (id: string, dayPage: number = 1, dayPageSize: number = 1): Promise<ApiResponse<DietPlanResponse>> => {
        try {
            return await apiClientMethods.get<ApiResponse<DietPlanResponse>>(
                `${process.env.NEXT_PUBLIC_API_URL}/dietplan/${id}?dayPage=${dayPage}&dayPageSize=${dayPageSize}`
            );
        } catch (error) {
            console.error('Error fetching diet plan:', error);
            throw error;
        }
    },

    getUserDietPlans: async (page: number = 1, pageSize: number = 10): Promise<ApiResponse<PaginatedResponse<UserDietPlan>>> => {
        try {
            return await apiClientMethods.get<ApiResponse<PaginatedResponse<UserDietPlan>>>(
                `${process.env.NEXT_PUBLIC_API_URL}/dietplan/user?page=${page}&pageSize=${pageSize}`
            );
        } catch (error) {
            console.error('Error fetching diet plans:', error);
            throw error;
        }
    },

    toggleUserDietPlanActive: async (dietPlanId: string): Promise<ApiResponse<UserDietPlan>> => {
        try {
            console.log('📤 API: Toggling diet plan active status for ID:', dietPlanId);
            const response = await apiClientMethods.patch<ApiResponse<UserDietPlan>>(
                `${process.env.NEXT_PUBLIC_API_URL}/dietplan/user/${dietPlanId}/toggle-active`
            );
            console.log('📥 API: Raw response:', JSON.stringify(response, null, 2));
            console.log('📥 API: Response data structure:', {
                success: response.success,
                hasData: !!response.data,
                dataKeys: response.data ? Object.keys(response.data) : [],
                dataStatus: response.data?.status,
                dataActivatedAt: response.data?.activatedAt
            });
            return response;
        } catch (error) {
            console.error('❌ API: Error toggling diet plan status:', error);
            throw error;
        }
    },

    deleteUserDietPlan: async (dietPlanId: string): Promise<ApiResponse<null>> => {
        try {
            return await apiClientMethods.delete<ApiResponse<null>>(
                `${process.env.NEXT_PUBLIC_API_URL}/dietplan/user/${dietPlanId}`
            );
        } catch (error) {
            console.error('Error deleting diet plan:', error);
            throw error;
        }
    }
}; 