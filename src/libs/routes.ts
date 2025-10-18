import { UserRole } from '@/models/entities';

// Rutas públicas
export const PUBLIC_ROUTES = ['/', '/login', '/register'] as const;

// Configuración de acceso para cada ruta (basada en la estructura actual)
export const ROUTE_ACCESS_CONFIG = {
  // Área pública
  '/': [
    UserRole.ADMIN,
    UserRole.STYLIST,
    UserRole.RECEPTIONIST,
    UserRole.CLIENT,
  ],
  '/login': [
    UserRole.ADMIN,
    UserRole.STYLIST,
    UserRole.RECEPTIONIST,
    UserRole.CLIENT,
  ],
  '/register': [
    UserRole.ADMIN,
    UserRole.STYLIST,
    UserRole.RECEPTIONIST,
    UserRole.CLIENT,
  ],

  // Área de cuenta (usuarios autenticados)
  '/account': [
    UserRole.ADMIN,
    UserRole.STYLIST,
    UserRole.RECEPTIONIST,
    UserRole.CLIENT,
  ],
  '/account/edit': [
    UserRole.ADMIN,
    UserRole.STYLIST,
    UserRole.RECEPTIONIST,
    UserRole.CLIENT,
  ],

  // Área de workspace (trabajadores)
  '/workspace': [UserRole.ADMIN, UserRole.STYLIST, UserRole.RECEPTIONIST],
  '/workspace/service': [
    UserRole.ADMIN,
    UserRole.STYLIST,
    UserRole.RECEPTIONIST,
  ],
} as const;

// Función para verificar acceso
export const hasRouteAccess = (
  userRoles: UserRole[],
  route: string
): boolean => {
  const allowedRoles =
    ROUTE_ACCESS_CONFIG[route as keyof typeof ROUTE_ACCESS_CONFIG];

  if (!allowedRoles) {
    return false; // Ruta no configurada = sin acceso
  }

  // Verificar si el usuario tiene al menos uno de los roles permitidos
  return userRoles.some(role =>
    (allowedRoles as readonly UserRole[]).includes(role)
  );
};

// Función para obtener la ruta de redirección por defecto según el rol
export const getDefaultRoute = (userRoles: UserRole[]): string => {
  if (userRoles.includes(UserRole.CLIENT)) {
    return '/'; // Los clientes van a la página principal por ahora
  }

  if (
    userRoles.some(role =>
      [UserRole.ADMIN, UserRole.STYLIST, UserRole.RECEPTIONIST].includes(role)
    )
  ) {
    return '/workspace';
  }

  return '/login';
};
