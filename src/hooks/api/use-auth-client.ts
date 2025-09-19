import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { authClient } from '@/clients';
import { ApiResponse, ValidationError } from '@/models/generics';
import { RegisterRequest, LoginRequest } from '@/models/requests';

// Función helper para manejar errores del backend estandarizado
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleApiError = (error: AxiosError<ApiResponse>): string => {
  const apiResponse = error.response?.data;

  if (apiResponse?.message) {
    return apiResponse.message;
  }

  return error.message || 'Ocurrió un error inesperado';
};

// Función helper para manejar errores de validación de FluentValidation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleValidationErrors = (
  error: AxiosError<ApiResponse>
): ValidationError | null => {
  const apiResponse = error.response?.data;

  if (apiResponse?.errorData && 'errors' in apiResponse.errorData) {
    return apiResponse.errorData as ValidationError;
  }

  return null;
};

// Función centralizada para mostrar errores con toasts
export const showApiError = (error: unknown) => {
  if ((error as AxiosError)?.response) {
    const axiosError = error as AxiosError<ApiResponse>;
    const message =
      axiosError.response?.data?.message || 'Ocurrió un error inesperado.';
    toast.error(message);
  } else if (error instanceof Error) {
    toast.error(error.message || 'Ocurrió un error inesperado.');
    return;
  }
};

// Mutación para registro
export const useRegisterMutation = () =>
  useMutation<ApiResponse, AxiosError<ApiResponse>, RegisterRequest>({
    mutationFn: authClient.register,
    onSuccess: (data: ApiResponse) => {
      toast.success(data.message || 'Usuario registrado exitosamente');
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const message = handleApiError(error);
      const validationErrors = handleValidationErrors(error);

      if (validationErrors) {
        // Mostrar errores de validación específicos
        Object.values(validationErrors.errors)
          .flat()
          .forEach(errorMsg => {
            toast.error(errorMsg);
          });
      } else {
        toast.error(message);
      }
    },
  });

export const useLoginMutation = () =>
  useMutation<ApiResponse, AxiosError<ApiResponse>, LoginRequest>({
    mutationFn: async (data: LoginRequest) => {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        throw new Error(result.error);
      } // to onError callback
      return {
        message: 'Inicio de sesión exitoso!',
        data: null,
        errorData: null,
      }; // to onSuccess callback;
    },
    onSuccess: (data: ApiResponse) => {
      toast.success(data.message);
    },
    onError: showApiError,
  });