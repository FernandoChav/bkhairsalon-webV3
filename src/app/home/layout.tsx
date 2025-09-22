import { ReactNode } from 'react';

import { ProtectedRouteWrapper } from '@/components/layout';

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ProtectedRouteWrapper loadingMessage="Cargando la aplicación...">
      {children}
    </ProtectedRouteWrapper>
  );
}
