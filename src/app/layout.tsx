import { Provider } from 'jotai';
import type { Metadata } from 'next';

import type { ReactNode } from 'react';

import { Montserrat, Playfair_Display } from 'next/font/google';

import { FooterBar, NavigationBar, ProgressBar } from '@/components/layout';
import {
  AppNextAuthProvider,
  AppNextThemesProvider,
  AppReactQueryProvider,
  AppSonnerProvider,
} from '@/providers';

import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Banguelia Karamanos | Estilista & Colorista Internacional',
  description:
    'Estilista y colorista profesional en Antofagasta con más de 10 años de experiencia. Especialista en coloración avanzada, cortes modernos y tratamientos capilares premium.',
  keywords:
    'Banguelia Karamanos, peluquería, estilista, colorista, Antofagasta, balayage, cortes modernos, coloración profesional, salón de belleza premium, Fashion Week Antofagasta',
  openGraph: {
    title: 'Banguelia Karamanos | Estilista & Colorista Internacional',
    description: 'Tu estilo es mi compromiso, tu confianza mi mayor logro.',
    type: 'website',
    locale: 'es_CL',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="font-montserrat antialiased bg-background text-foreground">
        <Provider>
          <AppNextAuthProvider>
            <AppReactQueryProvider>
              <AppNextThemesProvider>
                <AppSonnerProvider>
                  <ProgressBar />
                  <NavigationBar />
                  <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
                    <main className="pt-20 pb-8 flex-1">{children}</main>
                    <FooterBar />
                  </div>
                </AppSonnerProvider>
              </AppNextThemesProvider>
            </AppReactQueryProvider>
          </AppNextAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
