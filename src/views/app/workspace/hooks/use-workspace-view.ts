'use client';

import { useSession } from 'next-auth/react';

export const useWorkspaceView = () => {
  const { data: session } = useSession();

  // Computed values
  const welcomeText = session?.user?.name
    ? `Bienvenido/a, ${session.user.name}`
    : 'Bienvenido/a';

  return {
    welcomeText,
  };
};
