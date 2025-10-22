import { ReactNode } from 'react';

import { ProtectedRouteWrapper, WorkspaceSidebar } from '@/components/layout';
import { SidebarInset, SidebarProvider } from '@/components/shadcn';

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ProtectedRouteWrapper loadingMessage="Cargando la aplicación...">
      <SidebarProvider>
        <WorkspaceSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </ProtectedRouteWrapper>
  );
}
