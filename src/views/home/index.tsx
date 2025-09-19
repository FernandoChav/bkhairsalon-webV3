'use client';

import { Home } from './home';

const HomeView = () => {
  return (
    <div className="min-h-screen">
      <Home></Home>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 BK Hair Salon. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
