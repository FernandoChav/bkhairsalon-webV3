import type { Metadata } from 'next';

import { PaymentConfirmationView } from '@/views';

export const metadata: Metadata = {
  title: 'Iniciar Sesión - BK Hair Salon',
  description: 'Entra a tu cuenta en BK Hair Salon y agenda tu cita de belleza',
  keywords: [
    'iniciar',
    'sesion',
    'perfil',
    'cuenta',
    'BK Hair Salon',
    'belleza',
    'salon',
  ],
  openGraph: {
    title: 'Iniciar Sesión - BK Hair Salon',
    description:
      'Entra a tu cuenta en BK Hair Salon y agenda tu cita de belleza',
    type: 'website',
  },
};

export default function PaymentConfirmationPage() {
  return <PaymentConfirmationView />;
}
