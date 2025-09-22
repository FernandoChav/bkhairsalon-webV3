'use client';

import { useSession } from 'next-auth/react';

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
  const { status } = useSession();

  if (status === 'loading') {
    return <LoadingPage message={loadingMessage} />;
  }

  return <>{children}</>;
};
