import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './mocks/server';

// Mock window.matchMedia para next-themes
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Establecer MSW antes de todos los tests
beforeAll(() => server.listen());

// Resetear handlers después de cada test
afterEach(() => server.resetHandlers());

// Limpiar después de todos los tests
afterAll(() => server.close());
