import type { Metadata } from 'next';

import HomeView from '@/views/home';

export const metadata: Metadata = {
  title: 'Inicio - BK Hair Salon',
  description: 'BK Hair Salon',
  keywords: ['inicio', 'agenda', 'cita', 'BK Hair Salon', 'belleza', 'salon'],
  openGraph: {
    title: 'Inicio - BK Hair Salon',
    description: 'BK Hair Salon',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeView />;
}
