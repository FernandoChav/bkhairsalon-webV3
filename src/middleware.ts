import { withAuth } from 'next-auth/middleware';

import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    const protectedRoutes = ['/home'];
    const authRoutes = ['/login', '/register'];

    // Función para verificar si el token es válido o puede ser refrescado
    const isTokenValidOrRefreshable = (
      token: { accessToken?: string } | null
    ): boolean => {
      if (!token?.accessToken) return false;

      try {
        const payload = JSON.parse(atob(token.accessToken.split('.')[1]));
        const currentTime = Date.now() / 1000;

        // Token es válido si no ha expirado completamente
        // Permitir acceso si está próximo a expirar (el refresh se manejará en el cliente)
        return payload.exp > currentTime;
      } catch {
        return false;
      }
    };

    // Verificar rutas protegidas
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      if (!token || !isTokenValidOrRefreshable(token)) {
        const callbackUrl = encodeURIComponent(pathname + req.nextUrl.search);
        return NextResponse.redirect(
          new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
        );
      }
    }

    // Verificar rutas de autenticación
    if (authRoutes.some(route => pathname.startsWith(route))) {
      if (token && isTokenValidOrRefreshable(token)) {
        return NextResponse.redirect(new URL('/home', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req }) => {
        const { pathname } = req.nextUrl;

        const alwaysAllowedPaths = [
          '/',
          '/about',
          '/services',
          '/contact',
          '/login',
          '/register',
        ];

        if (
          pathname.startsWith('/api/auth') ||
          pathname.startsWith('/_next') ||
          pathname.startsWith('/favicon') ||
          pathname.includes('.well-known') ||
          alwaysAllowedPaths.some(
            path => pathname === path || pathname.startsWith(path + '/')
          )
        ) {
          return true;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
