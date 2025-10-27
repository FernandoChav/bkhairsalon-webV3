import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { useDeleteServiceMutation } from '@/hooks/api';
import { extractValidationMessages, isValidationError } from '@/libs';
import { ApiResponse } from '@/models/generics';
import { ServiceResponse } from '@/models/responses';

interface UseDeleteServiceParams {
  onSuccess?: () => void;
  service: ServiceResponse;
}

interface UseDeleteServiceReturn {
  handleDelete: () => void;
  isLoading: boolean;
}

export const useDeleteService = ({
  onSuccess,
  service,
}: UseDeleteServiceParams): UseDeleteServiceReturn => {
  const queryClient = useQueryClient();
  const { mutate: deleteService, isPending } = useDeleteServiceMutation();

  const handleDelete = useCallback(() => {
    deleteService(
      { id: service.id },
      {
        onSuccess: (data: ApiResponse<object>) => {
          toast.success(data.message || 'Servicio eliminado exitosamente');

          // Invalidate all category queries to refresh data
          queryClient.invalidateQueries({ queryKey: ['categories'] });

          // Call success callback to close modal
          onSuccess?.();
        },
        onError: (error: AxiosError<unknown>) => {
          const axiosError = error as AxiosError<ApiResponse>;

          if (isValidationError(axiosError)) {
            const validationMessages = extractValidationMessages(axiosError);
            validationMessages.forEach((message) => toast.error(message));
          } else {
            const message =
              axiosError.response?.data?.message ||
              'Error al eliminar el servicio';
            toast.error(message);
          }
        },
      }
    );
  }, [deleteService, service.id, queryClient, onSuccess]);

  return {
    handleDelete,
    isLoading: isPending,
  };
};