'use client';

import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { type ReactNode, useEffect } from 'react';

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

  // Función para validar si el token está completamente expirado
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000; // Convert to seconds
      return payload.exp < currentTime;
    } catch {
      return true; // Consider invalid tokens as expired
    }
  };

  // Función para manejar la expiración de sesión (solo cuando está completamente expirado)
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

  // Función para manejar errores de autenticación
  const handleAuthError = () => {
    toast.error('Error de autenticación', {
      description:
        'No se pudo renovar tu sesión. Por favor, inicia sesión nuevamente.',
      duration: 5000,
    });

    signOut({
      callbackUrl: '/login',
      redirect: true,
    });
  };

  // Validar sesión cuando cambie - solo actuar si está completamente expirado
  useEffect(() => {
    if (status === 'authenticated' && session?.accessToken) {
      // Solo forzar logout si está completamente expirado
      if (isTokenExpired(session.accessToken)) {
        handleSessionExpiration();
      }
    }
  }, [session, status]);

  // Listener para errores de autenticación desde el BaseClient
  useEffect(() => {
    // Escuchar eventos de error de autenticación
    window.addEventListener('auth-error', handleAuthError);

    return () => {
      window.removeEventListener('auth-error', handleAuthError);
    };
  }, []);

  // Computed values
  const isLoading = status === 'loading';

  if (isLoading) {
    return <LoadingPage message={loadingMessage} />;
  }

  return <>{children}</>;
};
