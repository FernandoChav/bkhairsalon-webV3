'use client';

import { FC } from 'react';

import { RegisterForm } from './components';

export const RegisterView: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <RegisterForm />
    </div>
  );
};
