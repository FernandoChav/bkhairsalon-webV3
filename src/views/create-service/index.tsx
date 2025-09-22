'use client';

import { FC } from 'react';

import { CreateServiceForm } from './components';

export const CreateServiceView: FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <CreateServiceForm />
    </div>
  );
};
