'use client';

import { signOut, useSession } from 'next-auth/react';
import { HiCog, HiLogout, HiUser } from 'react-icons/hi';

import { FC } from 'react';

import Link from 'next/link';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn';
import { getDefaultRoute } from '@/libs';

export const NavigationBar: FC = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true,
    });
  };

  // Computed values
  const isAuthenticated = status !== 'loading' && !!session;
  const isNotLoading = status !== 'loading';
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const userRoles = session?.user?.roles || [];
  const defaultRoute = getDefaultRoute(userRoles);

  return (
    <nav className="fixed w-full bg-background/95 backdrop-blur-sm z-50 shadow-sm top-0 border-b border-border/50 h-16">
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        <Link
          href={defaultRoute}
          className="text-2xl font-light text-foreground cursor-pointer hover:text-primary transition-colors duration-300 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          <span className="block sm:hidden">BK</span>
          <span className="hidden sm:block">BK Hair Salon</span>
        </Link>

        {isNotLoading && isAuthenticated && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0 hover:bg-muted/50 transition-colors duration-200 border border-border/50 hover:border-border cursor-pointer"
              >
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <HiUser className="h-5 w-5 text-primary-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 border border-border shadow-lg bg-card"
              align="end"
              forceMount
            >
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-card-foreground">
                  {userName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/workspace/profile/edit"
                  className="cursor-pointer flex items-center space-x-2 focus:bg-accent focus:text-accent-foreground"
                >
                  <HiCog className="h-4 w-4" />
                  <span>Editar Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5 flex items-center space-x-2"
                onClick={handleLogout}
              >
                <HiLogout className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {isNotLoading && !isAuthenticated && (
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground px-4 cursor-pointer"
              asChild
            >
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs uppercase tracking-wider px-4 cursor-pointer"
              asChild
            >
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
