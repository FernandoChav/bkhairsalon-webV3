import { FC } from 'react';

import { LoadingSpinner } from '@/components/ui';

interface LoadingPageProps {
  message?: string;
}

export const LoadingPage: FC<LoadingPageProps> = ({
  message = 'Cargando...',
}) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground text-lg">{message}</p>
    </div>
  );
};
