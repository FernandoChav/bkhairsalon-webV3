'use client';

import { FC } from 'react';

import { RegisterForm } from '@/views/register/components';

export const RegisterView: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <RegisterForm />
    </div>
  );
};
