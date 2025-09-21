import { withAuth } from 'next-auth/middleware';

import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Rutas que requieren autenticación
    const protectedRoutes = [
      '/home',
      '/profile',
      '/appointments',
      '/dashboard',
    ];

    // Rutas públicas que no requieren autenticación

    // Rutas de autenticación
    const authRoutes = ['/login', '/register'];

    // Si el usuario no está autenticado y trata de acceder a rutas protegidas
    if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
      const callbackUrl = encodeURIComponent(pathname + req.nextUrl.search);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
      );
    }

    // Si el usuario está autenticado y trata de acceder a rutas de autenticación
    if (token && authRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/home', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req }) => {
        const { pathname } = req.nextUrl;

        // Siempre permitir rutas públicas, API routes, recursos estáticos
        const alwaysAllowedPaths = [
          '/',
          '/about',
          '/services',
          '/contact',
          '/login',
          '/register',
        ];

        // Permitir recursos de Next.js y API
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

        // Para rutas protegidas, el middleware principal manejará la lógica
        // Retornamos true aquí para que withAuth no bloquee antes de llegar al middleware
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
