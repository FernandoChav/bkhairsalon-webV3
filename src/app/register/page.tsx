import type { Metadata } from 'next';

import RegisterView from '@/views/register';

export const metadata: Metadata = {
  title: 'Registro - BK Hair Salon',
  description:
    'Crea tu cuenta en BK Hair Salon y únete a nuestra comunidad de belleza',
  keywords: ['registro', 'cuenta', 'BK Hair Salon', 'belleza', 'salon'],
  openGraph: {
    title: 'Registro - BK Hair Salon',
    description:
      'Crea tu cuenta en BK Hair Salon y únete a nuestra comunidad de belleza',
    type: 'website',
  },
};

export default function RegisterPage() {
  return <RegisterView />;
}
