'use client';

import { useAtomValue, useSetAtom } from 'jotai';

import { FC, useEffect } from 'react';

import { usePathname } from 'next/navigation';

import {
  completeProgressAtom,
  progressValueAtom,
  progressVisibilityAtom,
  startProgressAtom,
} from '@/atoms';

interface ProgressBarProps {
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({ className = '' }) => {
  const pathname = usePathname();
  const progress = useAtomValue(progressValueAtom);
  const isVisible = useAtomValue(progressVisibilityAtom);
  const start = useSetAtom(startProgressAtom);
  const complete = useSetAtom(completeProgressAtom);

  useEffect(() => {
    start(100);

    const timer = setTimeout(() => {
      complete();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, start, complete]);

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
