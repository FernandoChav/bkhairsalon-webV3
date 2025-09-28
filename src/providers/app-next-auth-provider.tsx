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
      refetchInterval={5 * 60} // Refetch every 5 minutes to check session validity
      refetchOnWindowFocus={true} // Refetch when window gains focus
    >
      {children}
    </SessionProvider>
  );
};
