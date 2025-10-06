'use client';

import { ThemeProvider } from 'next-themes';

import type { FC, ReactNode } from 'react';

interface AppNextThemesProviderProps {
  children: ReactNode;
}

export const AppNextThemesProvider: FC<AppNextThemesProviderProps> = ({
  children,
}) => {
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
