import type { AxiosError } from 'axios';

import { ApiResponse, ValidationError } from '@/models/generics';

export const extractValidationErrors = (
  error: AxiosError<ApiResponse>
): ValidationError | null => {
  const apiResponse = error.response?.data;

  if (apiResponse?.errorData && 'errors' in apiResponse.errorData) {
    return apiResponse.errorData as ValidationError;
  }

  return null;
};

export const extractValidationMessages = (
  error: AxiosError<ApiResponse>
): string[] => {
  const validationErrors = extractValidationErrors(error);

  if (validationErrors) {
    return Object.values(validationErrors.errors).flat();
  }

  return [];
};

export const isValidationError = (error: AxiosError<ApiResponse>): boolean => {
  return error.response?.status === 400 && !!extractValidationErrors(error);
};
