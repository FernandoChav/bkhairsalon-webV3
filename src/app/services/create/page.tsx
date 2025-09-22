import type { Metadata } from 'next';

import { CreateServiceView } from '@/views/create-service';

export const metadata: Metadata = {
  title: 'Crear Servicio - BK Hair Salon',
  description: 'Crea un nuevo servicio para tu catálogo en BK Hair Salon',
  keywords: [
    'crear',
    'servicio',
    'salon',
    'belleza',
    'BK Hair Salon',
    'gestión',
    'catálogo',
  ],
  openGraph: {
    title: 'Crear Servicio - BK Hair Salon',
    description: 'Crea un nuevo servicio para tu catálogo en BK Hair Salon',
    type: 'website',
  },
};

export default function CreateServicePage() {
  return <CreateServiceView />;
}
