'use client';

import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { useEffect } from 'react';
import { type ReactNode } from 'react';

import { LoadingPage } from '@/components/ui';

interface ProtectedRouteWrapperProps {
  children: ReactNode;
  loadingMessage?: string;
}

export const ProtectedRouteWrapper = ({
  children,
  loadingMessage = 'Cargando tu información...',
}: ProtectedRouteWrapperProps) => {
  const { data: session, status } = useSession();

  // Función para validar si el token está expirado
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000; // Convert to seconds
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error validating token expiration:', error);
      return true; // Consider invalid tokens as expired
    }
  };

  // Función para manejar la expiración de sesión
  const handleSessionExpiration = async (): Promise<void> => {
    toast.error('Sesión expirada', {
      description:
        'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      duration: 5000,
    });

    // Sign out and redirect to login
    await signOut({
      callbackUrl: '/login',
      redirect: true,
    });
  };

  // Validar sesión cuando cambie
  useEffect(() => {
    if (status === 'authenticated' && session?.accessToken) {
      if (isTokenExpired(session.accessToken)) {
        handleSessionExpiration();
      }
    }
  }, [session, status]);

  if (status === 'loading') {
    return <LoadingPage message={loadingMessage} />;
  }

  return <>{children}</>;
};
