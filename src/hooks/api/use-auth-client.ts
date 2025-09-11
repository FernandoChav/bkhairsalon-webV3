import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { authClient } from '@/clients';
import { ApiResponse, ValidationError } from '@/models/generics';
import { RegisterRequest } from '@/models/requests';

// Función helper para manejar errores del backend estandarizado
const handleApiError = (error: AxiosError<ApiResponse>): string => {
  const apiResponse = error.response?.data;

  if (apiResponse?.message) {
    return apiResponse.message;
  }

  return error.message || 'Ocurrió un error inesperado';
};

// Función helper para manejar errores de validación de FluentValidation
const handleValidationErrors = (
  error: AxiosError<ApiResponse>
): ValidationError | null => {
  const apiResponse = error.response?.data;

  if (apiResponse?.errorData && 'errors' in apiResponse.errorData) {
    return apiResponse.errorData as ValidationError;
  }

  return null;
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
