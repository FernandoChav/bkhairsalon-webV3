'use client';

import { EditUserForm } from './edit-user-form';

const EditUserView = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex md:items-center md:justify-center md:min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md">
            <EditUserForm />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="w-full max-w-sm mx-auto">
            <EditUserForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserView;
