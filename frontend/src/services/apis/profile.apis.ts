import { DietFormProfile } from '@/lib/types/profile.types';
import { apiClientMethods } from '@/lib/utils/apiClient';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const ProfileApis = {
    getUserProfile: async (): Promise<DietFormProfile | null> => {
        try {
            const response = await apiClientMethods.get<ApiResponse<DietFormProfile>>(
                `${process.env.NEXT_PUBLIC_API_URL}/profile`
            );
            return response.data;
        } catch (error) {
            if (error instanceof Error && error.message.includes('404')) {
                return null;
            }
            console.error('Error fetching profile:', error);
            throw error;
        }
    },
    updateUserProfile: async (data: Partial<DietFormProfile>): Promise<DietFormProfile> => {
        try {
            const response = await apiClientMethods.patch<ApiResponse<DietFormProfile>>(
                `${process.env.NEXT_PUBLIC_API_URL}/profile`,
                data
            );
            return response.data;
        } catch (error) {
            throw new Error('Unable to update profile. Please try again later.');
        }
    },
    createOrUpdateUserProfile: async (dto: DietFormProfile): Promise<ApiResponse<DietFormProfile>> => {
        try {
            return await apiClientMethods.put<ApiResponse<DietFormProfile>>(
                `${process.env.NEXT_PUBLIC_API_URL}/profile`,
                dto
            );
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }
}