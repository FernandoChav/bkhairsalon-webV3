import { withAuth } from 'next-auth/middleware';

import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    const protectedRoutes = ['/home'];

    const authRoutes = ['/login', '/register'];

    if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
      const callbackUrl = encodeURIComponent(pathname + req.nextUrl.search);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
      );
    }

    if (token && authRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/home', req.url));
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
