import { atom } from 'jotai';

export interface ProgressState {
  progress: number;
  isVisible: boolean;
}

export const progressAtom = atom<ProgressState>({
  progress: 0,
  isVisible: false,
});

export const progressValueAtom = atom(
  get => get(progressAtom).progress,
  (get, set, newProgress: number) => {
    set(progressAtom, {
      ...get(progressAtom),
      progress: Math.max(0, Math.min(100, newProgress)),
      isVisible: true,
    });
  }
);

export const progressVisibilityAtom = atom(
  get => get(progressAtom).isVisible,
  (get, set, isVisible: boolean) => {
    set(progressAtom, {
      ...get(progressAtom),
      isVisible,
    });
  }
);

export const startProgressAtom = atom(
  null,
  (get, set, targetProgress: number = 100) => {
    set(progressAtom, {
      progress: 0,
      isVisible: true,
    });

    const increment = targetProgress / 50;
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= targetProgress) {
        set(progressValueAtom, targetProgress);
        clearInterval(interval);
      } else {
        set(progressValueAtom, currentProgress);
      }
    }, 20);
  }
);

export const completeProgressAtom = atom(null, (get, set) => {
  set(progressValueAtom, 100);
  setTimeout(() => {
    set(progressVisibilityAtom, false);
  }, 500);
});

export const resetProgressAtom = atom(null, (get, set) => {
  set(progressAtom, {
    progress: 0,
    isVisible: false,
  });
});

export const incrementProgressAtom = atom(null, (get, set, value: number) => {
  const current = get(progressValueAtom);
  set(progressValueAtom, current + value);
});
