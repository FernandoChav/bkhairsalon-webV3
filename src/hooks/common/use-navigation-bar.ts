'use client';

import { signOut, useSession } from 'next-auth/react';

export const useNavigationBar = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true,
    });
  };

  return {
    session,
    status,
    handleLogout,
  };
};
