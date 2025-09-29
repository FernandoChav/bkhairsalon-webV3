import type { Metadata } from 'next';

import { EditUserView } from '@/views';

export const metadata: Metadata = {
  title: 'Editar Usuario - BK Hair Salon',
  description: 'Edita la información de tu cuenta en BK Hair Salon',
  keywords: ['editar', 'cuenta', 'BK Hair Salon', 'belleza', 'salon'],
  openGraph: {
    title: 'Editar Usuario - BK Hair Salon',
    description: 'Edita la información de tu cuenta en BK Hair Salon',
    type: 'website',
  },
};

export default function EditUserPage() {
  return <EditUserView />;
}
