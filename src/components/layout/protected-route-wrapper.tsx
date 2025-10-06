'use client';

import { type ReactNode } from 'react';

import { LoadingPage } from '@/components/ui';

import { useProtectedRouteWrapper } from './hooks';

interface ProtectedRouteWrapperProps {
  children: ReactNode;
  loadingMessage?: string;
}

export const ProtectedRouteWrapper = ({
  children,
  loadingMessage = 'Cargando tu información...',
}: ProtectedRouteWrapperProps) => {
  const { status } = useProtectedRouteWrapper();

  // Computed values
  const isLoading = status === 'loading';

  if (isLoading) {
    return <LoadingPage message={loadingMessage} />;
  }

  return <>{children}</>;
};
