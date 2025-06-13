import { Role } from '../types/user.type';

interface RouteConfig {
  path: string;
  roles: Role[];
}

export const PROTECTED_ROUTES: RouteConfig[] = [
  {
    path: '/user/profile',
    roles: [Role.USER, Role.ADMIN]
  },
  {
    path: '/user/settings',
    roles: [Role.USER, Role.ADMIN]
  },
  {
    path: '/user/dashboard',
    roles: [Role.USER, Role.ADMIN]
  },
  {
    path: '/recipe/*',
    roles: [Role.USER, Role.ADMIN]
  },
  {
    path: '/admin/*',
    roles: [Role.ADMIN]
  }
];

export const isProtectedRoute = (path: string, userRole?: Role): boolean => {
  if (!userRole) {
    return PROTECTED_ROUTES.some(route => {
      const regexPattern = route.path.replace('*', '.*').replace('[id]', '[^/]+');
      return new RegExp(`^${regexPattern}$`).test(path);
    });
  }
  return PROTECTED_ROUTES.some(route => {
    const regexPattern = route.path.replace('*', '.*').replace('[id]', '[^/]+');
    const pathMatches = new RegExp(`^${regexPattern}$`).test(path);
    const hasRole = route.roles.includes(userRole);
    return pathMatches && hasRole;
  });
};

