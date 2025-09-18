import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { userClient } from '@/clients';
import { handleApiError, handleValidationErrors } from '@/libs';
import { ApiResponse } from '@/models/generics';
import { EditUserRequest } from '@/models/requests';

// Mutación para registro

export const useEditUserMutation = () =>
  useMutation<ApiResponse, AxiosError<ApiResponse>, EditUserRequest>({
    mutationFn: userClient.editUser,
    onSuccess: (data: ApiResponse) => {
      toast.success(data.message || 'Usuario editado exitosamente');
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
