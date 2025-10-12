import { ReactNode } from 'react';

import { ProtectedRouteWrapper } from '@/components/layout';

export default function WorkspaceLayout({
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
