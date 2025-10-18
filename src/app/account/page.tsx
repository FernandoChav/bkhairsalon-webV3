import type { Metadata } from 'next';

import { AccountView } from '@/views';

export const metadata: Metadata = {
  title: 'Cuenta - BK Hair Salon',
  description: 'Configura tu cuenta de BK Hair Salon',
  keywords: ['configurar', 'cuenta', 'BK Hair Salon', 'belleza', 'salon'],
  openGraph: {
    title: 'Cuenta - BK Hair Salon',
    description: 'Configura tu cuenta de BK Hair Salon',
    type: 'website',
  },
};

export default function AccountPage() {
  return <AccountView />;
}
