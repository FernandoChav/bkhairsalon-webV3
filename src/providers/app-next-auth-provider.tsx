'use client';

import { SessionProvider } from 'next-auth/react';

import { type ReactNode } from 'react';

interface AppNextAuthProviderProps {
  children: ReactNode;
}

export const AppNextAuthProvider = ({ children }: AppNextAuthProviderProps) => {
  return (
    <SessionProvider
      basePath="/api/auth"
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
};
