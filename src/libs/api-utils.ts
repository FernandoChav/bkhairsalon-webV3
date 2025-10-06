import type { AxiosError } from 'axios';

import { ApiResponse, ValidationError } from '@/models/generics';

/**
 * Extrae los errores de validación de una respuesta de error de Axios
 * @param error - Error de Axios con respuesta de API
 * @returns Objeto ValidationError o null si no hay errores de validación
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
 * Extrae los mensajes de error de validación como array de strings
 * @param error - Error de Axios con respuesta de API
 * @returns Array de mensajes de error de validación
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
 * Verifica si un error de Axios es un error de validación (status 400 con errores de validación)
 * @param error - Error de Axios con respuesta de API
 * @returns true si es un error de validación, false en caso contrario
 */
export const isValidationError = (error: AxiosError<ApiResponse>): boolean => {
  return error.response?.status === 400 && !!extractValidationErrors(error);
};
