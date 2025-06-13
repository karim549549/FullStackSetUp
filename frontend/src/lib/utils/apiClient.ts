import { UserApis } from '@/services/apis/user.apis';
import { useAuthStore } from '@/services/stores/authStore';

interface FetchOptions extends RequestInit {
    retryCount?: number;
}

const MAX_RETRIES = 1;

export async function apiClient<T>(
    url: string,
    options: FetchOptions = {}
): Promise<T> {
    const { retryCount = 0, ...fetchOptions } = options;

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            credentials: 'include',
        });

        // If unauthorized and we haven't retried yet, try to refresh the token
        if (response.status === 401 && retryCount < MAX_RETRIES) {
            const refreshResponse = await UserApis.refreshToken();
            
            if (refreshResponse.success && refreshResponse.data) {
                // Update the auth store with the new user data
                const authStore = useAuthStore.getState();
                authStore.login(refreshResponse.data);
                
                // Retry the original request with the new token
                return apiClient<T>(url, {
                    ...options,
                    retryCount: retryCount + 1,
                });
            }
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
}

// Helper methods for common HTTP methods
export const apiClientMethods = {
    get: <T>(url: string, options?: FetchOptions) => 
        apiClient<T>(url, { ...options, method: 'GET' }),
    
    post: <T>(url: string, data?: any, options?: FetchOptions) =>
        apiClient<T>(url, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            body: data ? JSON.stringify(data) : undefined,
        }),
    
    put: <T>(url: string, data?: any, options?: FetchOptions) =>
        apiClient<T>(url, {
            ...options,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            body: data ? JSON.stringify(data) : undefined,
        }),
    
    patch: <T>(url: string, data?: any, options?: FetchOptions) =>
        apiClient<T>(url, {
            ...options,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            body: data ? JSON.stringify(data) : undefined,
        }),
    
    delete: <T>(url: string, options?: FetchOptions) =>
        apiClient<T>(url, { ...options, method: 'DELETE' }),
}; 