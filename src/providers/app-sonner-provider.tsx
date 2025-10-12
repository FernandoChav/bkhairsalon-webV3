'use client';

import { Toaster } from 'sonner';

import type { FC, ReactNode } from 'react';

interface AppSonnerProviderProps {
  children: ReactNode;
}

export const AppSonnerProvider: FC<AppSonnerProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        expand={true}
        richColors
        closeButton
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  );
};
