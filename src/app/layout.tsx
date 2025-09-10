import type { Metadata } from 'next';

import type { ReactNode } from 'react';

import { Playfair_Display } from 'next/font/google';

import {
  AppNextAuthProvider,
  AppNextThemesProvider,
  AppReactQueryProvider,
  AppSonnerProvider,
} from '@/providers';

import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'BK Hair Salon',
  description: 'Salon de belleza de Bangelia Karamanos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${playfair.variable} antialiased`}>
        <AppNextAuthProvider>
          <AppReactQueryProvider>
            <AppNextThemesProvider>
              <AppSonnerProvider>{children}</AppSonnerProvider>
            </AppNextThemesProvider>
          </AppReactQueryProvider>
        </AppNextAuthProvider>
      </body>
    </html>
  );
}
