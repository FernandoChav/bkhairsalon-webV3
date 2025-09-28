import type { Metadata } from 'next';

import { HomeView } from '@/views';

export const metadata: Metadata = {
  title: 'Inicio - BK Hair Salon',
  description:
    'Bienvenido a tu cuenta en BK Hair Salon. Agenda tus citas y gestiona tu perfil.',
  keywords: ['inicio', 'cuenta', 'citas', 'BK Hair Salon', 'agenda'],
  openGraph: {
    title: 'Inicio - BK Hair Salon',
    description: 'Bienvenido a tu cuenta en BK Hair Salon',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeView />;
}
