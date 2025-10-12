import type { Metadata } from 'next';

import { ServicesView } from '@/views';

export const metadata: Metadata = {
  title: 'Servicios - BK Hair Salon',
  description: 'Lista de todos los servicios disponibles en BK Hair Salon',
  keywords: [
    'servicios',
    'salon',
    'belleza',
    'BK Hair Salon',
    'cortes',
    'coloracion',
    'tratamientos',
  ],
  openGraph: {
    title: 'Servicios - BK Hair Salon',
    description: 'Lista de todos los servicios disponibles en BK Hair Salon',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesView />;
}
