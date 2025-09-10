'use client';

import { ThemeProvider } from 'next-themes';

import { type ReactNode } from 'react';

interface AppNextThemesProviderProps {
  children: ReactNode;
}

export const AppNextThemesProvider = ({
  children,
}: AppNextThemesProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
