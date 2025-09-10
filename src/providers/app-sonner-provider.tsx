'use client';

import { Toaster } from 'sonner';

import { type ReactNode } from 'react';

interface AppSonnerProviderProps {
  children: ReactNode;
}

export const AppSonnerProvider = ({ children }: AppSonnerProviderProps) => {
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
