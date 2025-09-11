import { beforeEach, describe, expect, it, vi } from 'vitest';

import { authClient, baseClient } from '@/clients';
import type { ApiResponse } from '@/models/generics';
import type { RegisterRequest } from '@/models/requests';

// Mock del baseClient
vi.mock('@/clients/base-client', () => ({
  baseClient: {
    post: vi.fn(),
  },
}));

describe('AuthClient', () => {
  const mockPost = vi.mocked(baseClient.post);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('register', () => {
    const mockRegisterData: RegisterRequest = {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      phoneNumber: '(123) 456-7890',
      dateOfBirth: '1990-01-01',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const mockSuccessResponse: ApiResponse = {
      message: 'Usuario registrado exitosamente',
      data: {
        id: '123',
        email: 'juan.perez@example.com',
        firstName: 'Juan',
        lastName: 'Pérez',
      },
      errorData: null,
    };

    it('debe registrar usuario exitosamente', async () => {
      // Arrange
      mockPost.mockResolvedValue({
        data: mockSuccessResponse,
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {},
      });

      // Act
      const result = await authClient.register(mockRegisterData);

      // Assert
      expect(mockPost).toHaveBeenCalledWith('/auth/register', mockRegisterData);
      expect(result).toEqual(mockSuccessResponse);
    });

    it('debe manejar errores de API', async () => {
      // Arrange
      const errorResponse: ApiResponse = {
        message: 'Error de validación',
        data: null,
        errorData: {
          errors: {
            email: ['El correo electrónico ya está registrado'],
          },
        },
      };

      mockPost.mockRejectedValue({
        response: {
          data: errorResponse,
          status: 422,
          statusText: 'Unprocessable Entity',
          headers: {},
          config: {},
        },
      });

      // Act & Assert
      await expect(authClient.register(mockRegisterData)).rejects.toThrow();
      expect(mockPost).toHaveBeenCalledWith('/auth/register', mockRegisterData);
    });

    it('debe manejar errores de red', async () => {
      // Arrange
      mockPost.mockRejectedValue(new Error('Network Error'));

      // Act & Assert
      await expect(authClient.register(mockRegisterData)).rejects.toThrow(
        'Network Error'
      );
      expect(mockPost).toHaveBeenCalledWith('/auth/register', mockRegisterData);
    });
  });
});
