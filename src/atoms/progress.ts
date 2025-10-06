import { atom } from 'jotai';

/**
 * Estado del progreso de la aplicación
 * @interface ProgressState
 */
export interface ProgressState {
  /** Valor del progreso (0-100) */
  progress: number;
  /** Indica si la barra de progreso es visible */
  isVisible: boolean;
}

/**
 * Atom principal que contiene el estado completo del progreso
 * Incluye el valor del progreso y la visibilidad de la barra
 */
export const progressAtom = atom<ProgressState>({
  progress: 0,
  isVisible: false,
});

/**
 * Atom derivado para leer y escribir el valor del progreso
 * Automáticamente hace visible la barra cuando se actualiza el valor
 * @param newProgress - Nuevo valor de progreso (0-100)
 */
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

/**
 * Atom derivado para leer y escribir la visibilidad de la barra de progreso
 * @param isVisible - Indica si la barra debe ser visible
 */
export const progressVisibilityAtom = atom(
  get => get(progressAtom).isVisible,
  (get, set, isVisible: boolean) => {
    set(progressAtom, {
      ...get(progressAtom),
      isVisible,
    });
  }
);

/**
 * Atom de acción para iniciar la animación de progreso
 * Inicia la barra de progreso y la anima hasta el valor objetivo
 * @param targetProgress - Valor objetivo del progreso (por defecto 100)
 */
export const startProgressAtom = atom(
  null,
  (get, set, targetProgress: number = 100) => {
    set(progressAtom, {
      progress: 0,
      isVisible: true,
    });

    // Calcular incremento para animación suave (50 pasos)
    const increment = targetProgress / 50;
    let currentProgress = 0;

    // Animar progreso cada 20ms para efecto suave
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

/**
 * Atom de acción para completar el progreso
 * Establece el progreso al 100% y oculta la barra después de 500ms
 */
export const completeProgressAtom = atom(null, (get, set) => {
  set(progressValueAtom, 100);
  setTimeout(() => {
    set(progressVisibilityAtom, false);
  }, 500);
});

/**
 * Atom de acción para incrementar el progreso
 * Suma un valor al progreso actual
 * @param value - Valor a incrementar
 */
export const incrementProgressAtom = atom(null, (get, set, value: number) => {
  const current = get(progressValueAtom);
  set(progressValueAtom, current + value);
});
