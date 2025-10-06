import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ReactNode } from 'react';

import { useRegisterMutation } from '@/hooks/api/use-auth-client';
import { useRegisterView } from '@/views/app/register/hooks/use-register-view';

// Mock de las dependencias
vi.mock('@/hooks/api/use-auth-client');
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

const mockUseRegisterMutation = vi.mocked(useRegisterMutation);

// Helper para crear QueryClient de test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

// Wrapper para renderHook
const wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useRegisterView', () => {
  const mockMutate = vi.fn();
  const mockRegisterData = {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@example.com',
    phoneNumber: '912345678',
    dateOfBirth: '1990-01-01',
    password: 'password123',
    confirmPassword: 'password123',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock por defecto del hook de mutación
    mockUseRegisterMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
      isSuccess: false,
      data: undefined,
      variables: undefined,
      isError: false,
      isIdle: true,
      failureCount: 0,
      failureReason: null,
      mutateAsync: vi.fn(),
      reset: vi.fn(),
      status: 'idle',
      context: undefined,
      isPaused: false,
      submittedAt: undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  });

  describe('Inicialización', () => {
    it('debe inicializar el hook correctamente', () => {
      const { result } = renderHook(() => useRegisterView(), { wrapper });

      expect(result.current).toHaveProperty('form');
      expect(result.current).toHaveProperty('handleSubmit');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('error');
      expect(result.current).toHaveProperty('isSuccess');
    });

    it('debe inicializar con estado de loading en false', () => {
      const { result } = renderHook(() => useRegisterView(), { wrapper });

      expect(result.current.isLoading).toBe(false);
    });

    it('debe inicializar sin errores', () => {
      const { result } = renderHook(() => useRegisterView(), { wrapper });

      expect(result.current.error).toBeNull();
    });

    it('debe inicializar con isSuccess en false', () => {
      const { result } = renderHook(() => useRegisterView(), { wrapper });

      expect(result.current.isSuccess).toBe(false);
    });
  });

  describe('onSubmit', () => {
    it('debe llamar a mutate con los datos del formulario', async () => {
      const { result } = renderHook(() => useRegisterView(), { wrapper });

      await act(async () => {
        result.current.handleSubmit(mockRegisterData);
      });

      // El phoneNumber se formatea automáticamente
      const expectedData = {
        ...mockRegisterData,
        phoneNumber: '+56912345678', // Formateado por formatPhoneNumber
      };

      expect(mockMutate).toHaveBeenCalledWith(
        expectedData,
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        })
      );
    });
  });

  describe('Estados de la mutación', () => {
    it('debe reflejar estado de loading cuando isPending es true', () => {
      mockUseRegisterMutation.mockReturnValue({
        mutate: mockMutate,
        isPending: true,
        error: null,
        isSuccess: false,
        data: undefined,
        variables: mockRegisterData,
        isError: false,
        isIdle: false,
        failureCount: 0,
        failureReason: null,
        mutateAsync: vi.fn(),
        reset: vi.fn(),
        status: 'pending',
        context: undefined,
        isPaused: false,
        submittedAt: Date.now(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      const { result } = renderHook(() => useRegisterView(), { wrapper });

      expect(result.current.isLoading).toBe(true);
    });

    it('debe reflejar estado de loading cuando isPending es false', () => {
      mockUseRegisterMutation.mockReturnValue({
        mutate: mockMutate,
        isPending: false,
        error: null,
        isSuccess: false,
        data: undefined,
        variables: undefined,
        isError: false,
        isIdle: true,
        failureCount: 0,
        failureReason: null,
        mutateAsync: vi.fn(),
        reset: vi.fn(),
        status: 'idle',
        context: undefined,
        isPaused: false,
        submittedAt: undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      const { result } = renderHook(() => useRegisterView(), { wrapper });

      expect(result.current.isLoading).toBe(false);
    });

    it('debe reflejar error de la mutación', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockError: any = {
        isAxiosError: true,
        message: 'Error de red',
        toJSON: () => ({}),
        name: 'AxiosError',
        config: { headers: {} },
        code: 'NETWORK_ERROR',
        request: {},
        response: undefined,
      };

      mockUseRegisterMutation.mockReturnValue({
        mutate: mockMutate,
        isPending: false,
        error: mockError,
        isSuccess: false,
        data: undefined,
        variables: mockRegisterData,
        isError: true,
        isIdle: false,
        failureCount: 1,
        failureReason: mockError,
        mutateAsync: vi.fn(),
        reset: vi.fn(),
        status: 'error',
        context: undefined,
        isPaused: false,
        submittedAt: Date.now(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      const { result } = renderHook(() => useRegisterView(), { wrapper });

      expect(result.current.error).toBe(mockError);
    });

    it('debe reflejar éxito de la mutación', () => {
      mockUseRegisterMutation.mockReturnValue({
        mutate: mockMutate,
        isPending: false,
        error: null,
        isSuccess: true,
        data: {
          message: 'Success',
          data: null,
          errorData: null,
        },
        variables: mockRegisterData,
        isError: false,
        isIdle: false,
        failureCount: 0,
        failureReason: null,
        mutateAsync: vi.fn(),
        reset: vi.fn(),
        status: 'success',
        context: undefined,
        isPaused: false,
        submittedAt: Date.now(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      const { result } = renderHook(() => useRegisterView(), { wrapper });

      expect(result.current.isSuccess).toBe(true);
    });
  });
});
