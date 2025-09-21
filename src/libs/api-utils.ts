import type { AxiosError } from 'axios';

import { ApiResponse, ValidationError } from '@/models/generics';

/**
 * Extrae errores de validación de FluentValidation de una respuesta de API
 */
export const extractValidationErrors = (
  error: AxiosError<ApiResponse>
): ValidationError | null => {
  const apiResponse = error.response?.data;

  if (apiResponse?.errorData && 'errors' in apiResponse.errorData) {
    return apiResponse.errorData as ValidationError;
  }

  return null;
};

/**
 * Extrae todos los mensajes de error de validación como un array plano
 */
export const extractValidationMessages = (
  error: AxiosError<ApiResponse>
): string[] => {
  const validationErrors = extractValidationErrors(error);

  if (validationErrors) {
    return Object.values(validationErrors.errors).flat();
  }

  return [];
};

/**
 * Determina si un error es de validación (400 con errorData)
 */
export const isValidationError = (error: AxiosError<ApiResponse>): boolean => {
  return error.response?.status === 400 && !!extractValidationErrors(error);
};
