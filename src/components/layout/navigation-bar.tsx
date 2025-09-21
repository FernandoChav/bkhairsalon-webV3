'use client';

import { HiMenu } from 'react-icons/hi';

import { FC } from 'react';

import Link from 'next/link';

import { Button } from '@/components/shadcn';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shadcn';

export const NavigationBar: FC = () => {
  return (
    <nav className="fixed w-full bg-background/95 backdrop-blur-sm z-50 shadow-sm top-0 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-foreground cursor-pointer hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            BK Hair Salon
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs uppercase tracking-wider"
                asChild
              >
                <Link href="/register">Registrarse</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden p-2"
                  aria-label="Abrir menú"
                >
                  <HiMenu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] [&>button]:focus:ring-0 [&>button]:focus:ring-offset-0 p-0"
              >
                <div className="p-6 h-full flex flex-col">
                  <SheetHeader className="p-0 mb-8">
                    <SheetTitle
                      className="text-left text-xl font-bold text-foreground"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      BK Hair Salon
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col space-y-4 flex-1">
                    <div className="flex flex-col space-y-3">
                      <Button
                        variant="ghost"
                        className="justify-center text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground"
                        asChild
                      >
                        <Link href="/login">Iniciar sesión</Link>
                      </Button>
                      <Button
                        className="justify-center bg-primary hover:bg-primary/90 text-primary-foreground text-sm uppercase tracking-wider"
                        asChild
                      >
                        <Link href="/register">Registrarse</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
