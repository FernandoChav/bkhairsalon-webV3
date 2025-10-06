import { FC } from 'react';

import { cn } from '@/libs';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const sizeClassName = cn(
    'animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary',
    sizeClasses[size],
    className
  );

  return <div className={sizeClassName} />;
};
