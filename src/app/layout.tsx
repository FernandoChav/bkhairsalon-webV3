import type { Metadata } from 'next';

import type { ReactNode } from 'react';

import { Montserrat, Playfair_Display } from 'next/font/google';

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
      <body className="font-sans antialiased">
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
