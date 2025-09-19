'use client';

import { useAtomValue, useSetAtom } from 'jotai';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import {
  completeProgressAtom,
  incrementProgressAtom,
  progressValueAtom,
  progressVisibilityAtom,
  resetProgressAtom,
  startProgressAtom,
} from '@/atoms';

export function useProgress() {
  const pathname = usePathname();
  const progress = useAtomValue(progressValueAtom);
  const isVisible = useAtomValue(progressVisibilityAtom);
  const start = useSetAtom(startProgressAtom);
  const complete = useSetAtom(completeProgressAtom);
  const reset = useSetAtom(resetProgressAtom);
  const increment = useSetAtom(incrementProgressAtom);
  const set = useSetAtom(progressValueAtom);

  // Auto navigation progress
  useEffect(() => {
    start(100);

    const timer = setTimeout(() => {
      complete();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, start, complete]);

  return {
    progress,
    isVisible,
    start,
    set,
    increment,
    complete,
    reset,
  };
}
