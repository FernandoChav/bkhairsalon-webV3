import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCallback, useEffect, useRef } from 'react';

import { useUpdateServiceMutation } from '@/hooks/api';
import { useFileUpload } from '@/hooks/common';
import { extractValidationMessages, isValidationError } from '@/libs';
import { ApiResponse } from '@/models/generics';
import { UpdateServiceRequest } from '@/models/requests';
import { ServiceResponse } from '@/models/responses';
import { UpdateServiceForm, updateServiceSchema } from '@/models/schemas';

interface UseUpdateServiceParams {
  onSuccess?: () => void;
  service: ServiceResponse;
}

interface UseUpdateServiceReturn {
  form: ReturnType<typeof useForm<UpdateServiceForm>>;
  fileUpload: {
    files: File[];
    handleAddFiles: (files: FileList | File[]) => void;
    handleRemoveFile: (index: number) => void;
    handleClearFiles: () => void;
  };
  validation: {
    durationOptions: number[];
    errors: ReturnType<
      typeof useForm<UpdateServiceForm>
    >['formState']['errors'];
  };
  submission: {
    isLoading: boolean;
    isValid: boolean;
    handleSubmit: (data: UpdateServiceForm) => void;
  };
}

// Helper function to convert "HH:MM:SS" to "HH:MM"
const formatTimeForForm = (time: string): string => {
  if (!time) return '';
  // If already in "HH:MM" format, return as is
  if (time.length === 5 && time.match(/^\d{2}:\d{2}$/)) return time;
  // If in "HH:MM:SS" format, extract only "HH:MM"
  if (time.length >= 5) return time.substring(0, 5);
  return '';
};

export const useUpdateService = ({
  onSuccess,
  service,
}: UseUpdateServiceParams): UseUpdateServiceReturn => {
  const queryClient = useQueryClient();
  const { mutate: updateService, isPending } = useUpdateServiceMutation();
  const isProcessingRef = useRef(false);

  // Form setup with correctly formatted values
  const form = useForm<UpdateServiceForm>({
    resolver: zodResolver(updateServiceSchema),
    mode: 'onTouched',
    defaultValues: {
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      startTime: formatTimeForForm(service.startTime),
      endTime: formatTimeForForm(service.endTime),
      commissionPercentage: service.commissionPercentage,
      discountId: '',
      keepPhotoIds: [],
      deletePhotoIds: [],
    },
  });

  // Force form values update when service changes
  useEffect(() => {
    form.reset({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      startTime: formatTimeForForm(service.startTime),
      endTime: formatTimeForForm(service.endTime),
      commissionPercentage: service.commissionPercentage,
      discountId: '',
      keepPhotoIds: [],
      deletePhotoIds: [],
    });
  }, [service, form]);

  // File upload setup
  const fileUpload = useFileUpload({ maxFiles: 10 });

  // Duration options
  const durationOptions = Array.from({ length: 61 }, (_, i) => i * 5);

  // Form validation logic
  useEffect(() => {
    const subscription = form.watch((_value, { name }) => {
      if (name === 'endTime' || name === 'startTime' || name === 'duration') {
        // Avoid infinite re-rendering
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;

        const startTime = form.getValues('startTime');
        const endTime = form.getValues('endTime');
        const duration = form.getValues('duration');

        // Clear previous errors
        form.clearErrors('startTime');
        form.clearErrors('endTime');
        form.clearErrors('duration');

        // Validate that both times are present and valid
        if (startTime && endTime) {
          const startTimeParts = startTime.split(':').map(Number);
          const endTimeParts = endTime.split(':').map(Number);

          // Verify that parts are valid numbers
          if (startTimeParts.some(isNaN) || endTimeParts.some(isNaN)) {
            isProcessingRef.current = false;
            return;
          }

          const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
          const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];

          // Validate that end time is after start time
          if (endMinutes <= startMinutes) {
            form.setError('endTime', {
              type: 'manual',
              message:
                'El horario de término debe ser posterior al horario de inicio',
            });
            isProcessingRef.current = false;
            return;
          }

          // Validate duration if present
          if (duration) {
            const intervalMinutes = endMinutes - startMinutes;

            if (intervalMinutes < duration) {
              form.setError('duration', {
                type: 'manual',
                message:
                  'La duración excede el tiempo disponible entre los horarios',
              });
              isProcessingRef.current = false;
              return;
            }
          }
        }

        // Reset processing flag
        isProcessingRef.current = false;
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Submit handler
  const handleSubmit = useCallback(
    (data: UpdateServiceForm) => {
      const serviceRequest: UpdateServiceRequest = {
        ...data,
        newPhotos: fileUpload.files,
      };

      updateService(
        { id: service.id, data: serviceRequest },
        {
          onSuccess: (data: ApiResponse) => {
            toast.success(data.message);

            // Invalidate all category queries to refresh data
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            // Call success callback (to close modal)
            onSuccess?.();
          },
          onError: (error: AxiosError<unknown>) => {
            const axiosError = error as AxiosError<ApiResponse>;
            if (isValidationError(axiosError)) {
              const validationMessages = extractValidationMessages(axiosError);
              validationMessages.forEach(message => {
                toast.error(message);
              });
            } else {
              const message =
                axiosError.response?.data?.message ||
                'Error al actualizar el servicio';
              toast.error(message);
            }
          },
        }
      );
    },
    [updateService, service.id, fileUpload.files, queryClient, onSuccess]
  );

  return {
    form,
    fileUpload: {
      files: fileUpload.files,
      handleAddFiles: fileUpload.handleAddFiles,
      handleRemoveFile: fileUpload.handleRemoveFile,
      handleClearFiles: fileUpload.handleClearFiles,
    },
    validation: {
      durationOptions,
      errors: form.formState.errors,
    },
    submission: {
      isLoading: isPending,
      isValid: form.formState.isValid && form.formState.isDirty,
      handleSubmit,
    },
  };
};
