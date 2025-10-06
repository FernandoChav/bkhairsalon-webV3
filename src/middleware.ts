import { getToken } from 'next-auth/jwt';

import { NextRequest, NextResponse } from 'next/server';

import { PUBLIC_ROUTES, getDefaultRoute, hasRouteAccess } from '@/libs/routes';
import { UserRole } from '@/models/entities';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtener token JWT
  const token = await getToken({ req: request });

  if (!token) {
    // Usuario no autenticado - solo permitir rutas públicas
    if (!PUBLIC_ROUTES.includes(pathname as (typeof PUBLIC_ROUTES)[number])) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // Extraer roles del token
  const userRoles: UserRole[] = [];
  if (token.Roles) {
    try {
      const rolesData = JSON.parse(token.Roles as string);
      userRoles.push(
        ...rolesData.map((role: { Name: string }) => role.Name as UserRole)
      );
    } catch (error) {
      console.error('Error parsing roles from token:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Verificar acceso a la ruta
  if (!hasRouteAccess(userRoles, pathname)) {
    // Redirigir a la ruta por defecto del usuario
    const defaultRoute = getDefaultRoute(userRoles);
    return NextResponse.redirect(new URL(defaultRoute, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/workspace/:path*',
    // Futuras rutas (descomentar cuando las crees):
    // '/client/:path*',
  ],
};
