'use client';

import { FC } from 'react';

import { LoginForm } from '@/views/login/components';

export const LoginView: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <LoginForm />
    </div>
  );
};
