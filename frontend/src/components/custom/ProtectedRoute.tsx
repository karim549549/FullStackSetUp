'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isProtectedRoute } from '@/lib/constants/protectedRoutes';
import { UserApis } from '@/services/apis/user.apis';
import { useAuthStore } from '@/services/stores/authStore';
import { StoredUser } from '@/lib/types/user.type';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, login } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      // Check if current route is protected
      if (!isProtectedRoute(pathname)) {
        return;
      }

      try {
        // First try to get user info
        const meResponse = await UserApis.me();
        
        if (meResponse.success && meResponse.data) {
          // Store user data
          const userData: StoredUser = {
            id: meResponse.data.id,
            email: meResponse.data.email,
            name: meResponse.data.name,
            role: meResponse.data.role
          };
          login(userData);

          // Check if user has access to this route
          if (!isProtectedRoute(pathname, userData.role)) {
            router.push('/404');
            return;
          }
          return;
        }

        // If me fails, try to refresh token
        const refreshResponse = await UserApis.refreshToken();
        
        if (refreshResponse.success && refreshResponse.data) {
          const userData: StoredUser = {
            id: refreshResponse.data.id,
            email: refreshResponse.data.email,
            name: refreshResponse.data.name,
            role: refreshResponse.data.role
          };
          login(userData);

          // Check if user has access to this route
          if (!isProtectedRoute(pathname, userData.role)) {
            router.push('/404');
            return;
          }
          return;
        }

        // If both attempts fail, redirect to login
        router.push('/auth/login');
      } catch (error) {
        router.push('/auth/login');
      }
    };

    verifyAuth();
  }, [pathname, router, login]);

  // If not authenticated and on a protected route, show loading
  if (!user && isProtectedRoute(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-lg font-medium text-foreground">Verifying your session...</p>
          <p className="text-sm text-muted-foreground">Please wait while we check your authentication</p>
        </div>
      </div>
    );
  }

  // If user is authenticated but doesn't have access to this route, redirect to 404
  if (user && isProtectedRoute(pathname) && !isProtectedRoute(pathname, user.role)) {
    router.push('/404');
    return null;
  }

  return <>{children}</>;
} 