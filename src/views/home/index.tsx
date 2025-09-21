'use client';

import { useSession } from 'next-auth/react';

import { FC } from 'react';

export const HomeView: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="mb-12">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Bienvenido/a{session?.user?.name ? `, ${session.user.name}` : ''}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Gestiona tus citas, explora nuestros servicios y mantente al día con
          las últimas tendencias en belleza.
        </p>
      </div>
    </div>
  );
};
