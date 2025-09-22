'use client';

import { FC } from 'react';

import { useProgress } from '@/hooks/common';

interface ProgressBarProps {
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({ className = '' }) => {
  const { progress, isVisible } = useProgress();

  if (!isVisible) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
