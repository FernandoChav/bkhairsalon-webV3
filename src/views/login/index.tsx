'use client';

import { LoginForm } from './login-form';

const LoginView = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-serif">
            BK Hair Salon
          </h1>
          <p className="text-lg text-gray-600">
            Únete a nuestra comunidad de belleza
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex md:items-center md:justify-center md:min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="w-full max-w-sm mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 BK Hair Salon. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
