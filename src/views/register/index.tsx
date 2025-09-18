'use client';

import { RegisterForm, RegisterHeader } from '@/views/register/components';

export const RegisterView = () => {
  return (
    <div>
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <RegisterHeader />

        {/* Desktop Layout */}
        <div className="hidden md:flex md:items-center md:justify-center md:min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="w-full max-w-sm mx-auto">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};
