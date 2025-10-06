'use client';

import { FC } from 'react';

import { useWorkspaceView } from './hooks';

export const WorkspaceView: FC = () => {
  const { welcomeText } = useWorkspaceView();

  return (
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="mb-12">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {welcomeText}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Gestiona tus citas, explora nuestros servicios y mantente al día con
          las últimas tendencias en belleza.
        </p>
      </div>
    </div>
  );
};
