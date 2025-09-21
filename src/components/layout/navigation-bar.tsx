'use client';

import { signOut, useSession } from 'next-auth/react';
import { HiLogout, HiUser } from 'react-icons/hi';

import { FC } from 'react';

import Link from 'next/link';

import { Button } from '@/components/shadcn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn';

export const NavigationBar: FC = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true,
    });
  };

  return (
    <nav className="fixed w-full bg-background/95 backdrop-blur-sm z-50 shadow-sm top-0 border-b border-border/50 h-16">
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo/Brand */}
        <Link
          href={session ? '/home' : '/'}
          className="text-2xl font-light text-foreground cursor-pointer hover:text-primary transition-colors duration-300 flex items-center"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          BK Hair Salon
        </Link>

        {/* Navigation */}
        {status === 'loading' ? null : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0 hover:bg-muted/50 transition-colors duration-200 border border-border/50 hover:border-border"
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
                  {session?.user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session?.user?.email}
                </p>
              </div>
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
        ) : (
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              className="h-10 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground px-4"
              asChild
            >
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button
              className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground text-xs uppercase tracking-wider px-4"
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
