import type { AxiosError } from 'axios';

import { ApiResponse, ValidationError } from '@/models/generics';

// Función helper para manejar errores del backend estandarizado
export const handleApiError = (error: AxiosError<ApiResponse>): string => {
  const apiResponse = error.response?.data;
  if (apiResponse?.message) {
    return apiResponse.message;
  }
  return error.message || 'Ocurrió un error inesperado';
};

// Función helper para manejar errores de validación de FluentValidation
export const handleValidationErrors = (
  error: AxiosError<ApiResponse>
): ValidationError | null => {
  const apiResponse = error.response?.data;
  if (apiResponse?.errorData && 'errors' in apiResponse.errorData) {
    return apiResponse.errorData as ValidationError;
  }
  return null;
};
