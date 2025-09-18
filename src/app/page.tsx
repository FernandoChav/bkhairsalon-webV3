import type { Metadata } from 'next';

import { LandingView } from '@/views';

export const metadata: Metadata = {
  title: 'BK Hair Salon - Banguelia Karamanos',
  description:
    'Salón de belleza profesional en Antofagasta. Especialistas en coloración, cortes y tratamientos capilares. Más de 10 años de experiencia.',
  keywords: [
    'salon de belleza',
    'coloracion profesional',
    'cortes de cabello',
    'tratamientos capilares',
    'Antofagasta',
    'Banguelia Karamanos',
    'BK Hair Salon',
  ],
  openGraph: {
    title: 'BK Hair Salon - Banguelia Karamanos',
    description:
      'Salón de belleza profesional en Antofagasta. Especialistas en coloración, cortes y tratamientos capilares.',
    type: 'website',
  },
};

export default function LandingPage() {
  return <LandingView />;
}
