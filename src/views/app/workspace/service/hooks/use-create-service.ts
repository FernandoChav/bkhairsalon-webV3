import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCallback, useEffect, useRef } from 'react';

import { useCategoriesQuery, useCreateServiceMutation } from '@/hooks/api';
import { useFileUpload } from '@/hooks/common';
import { extractValidationMessages, isValidationError } from '@/libs';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest } from '@/models/requests';
import { CategoryResponse } from '@/models/responses';
import { CreateServiceForm, createServiceSchema } from '@/models/schemas';

interface UseCreateServiceParams {
  onSuccess?: () => void;
  selectedCategory: CategoryResponse;
}

interface UseCreateServiceReturn {
  // Values
  form: ReturnType<typeof useForm<CreateServiceForm>>;
  categories: {
    data: CategoryResponse[];
    isLoading: boolean;
    error: unknown;
  };
  fileUpload: {
    files: File[];
    handleAddFiles: (files: FileList | File[]) => void;
    handleRemoveFile: (index: number) => void;
    handleClearFiles: () => void;
  };
  validation: {
    durationOptions: number[];
    errors: ReturnType<
      typeof useForm<CreateServiceForm>
    >['formState']['errors'];
  };
  submission: {
    isLoading: boolean;
    isValid: boolean;
    handleSubmit: (data: CreateServiceForm) => void;
  };
  // Handlers
  handleResetForm: () => void;
}

export const useCreateService = ({
  onSuccess,
  selectedCategory,
}: UseCreateServiceParams): UseCreateServiceReturn => {
  const queryClient = useQueryClient();
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategoriesQuery();
  const { mutate: createService, isPending } = useCreateServiceMutation();
  const isProcessingRef = useRef(false);

  // Form setup
  const form = useForm<CreateServiceForm>({
    resolver: zodResolver(createServiceSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      description: '',
      duration: undefined,
      price: undefined,
      startTime: '',
      endTime: '',
      commissionPercentage: undefined,
      categoryId: '',
      discountId: '',
    },
  });

  // File upload setup
  const fileUpload = useFileUpload({ maxFiles: 10 });

  // Duration options
  const durationOptions = Array.from({ length: 61 }, (_, i) => i * 5);

  // Establecer la categoría pre-seleccionada en el formulario
  useEffect(() => {
    form.setValue('categoryId', selectedCategory.id, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [selectedCategory.id, form]);

  // Form validation logic
  useEffect(() => {
    const subscription = form.watch((_value, { name }) => {
      if (name === 'endTime' || name === 'startTime' || name === 'duration') {
        // Evitar re-renderizado infinito
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        const startTime = form.getValues('startTime');
        const endTime = form.getValues('endTime');
        const duration = form.getValues('duration');

        // Limpiar errores previos
        form.clearErrors('startTime');
        form.clearErrors('endTime');
        form.clearErrors('duration');

        // Validar que ambos horarios estén presentes
        if (startTime && endTime) {
          const startTimeParts = startTime.split(':').map(Number);
          const endTimeParts = endTime.split(':').map(Number);
          const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
          const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];

          // Validar que el horario de término sea posterior al de inicio
          if (endMinutes <= startMinutes) {
            form.setError('endTime', {
              type: 'manual',
              message:
                'El horario de término debe ser posterior al horario de inicio',
            });
            isProcessingRef.current = false;
            return;
          }

          // Validar duración si está presente
          if (duration) {
            const intervalMinutes = endMinutes - startMinutes;

            if (intervalMinutes < duration) {
              // Siempre mostrar error en duration cuando la duración excede el tiempo disponible
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

        // Resetear el flag de procesamiento
        isProcessingRef.current = false;
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Get final categories
  const getFinalCategories = useCallback(
    (cats: CategoryResponse[]): CategoryResponse[] => {
      const finalCats: CategoryResponse[] = [];

      const traverse = (categories: CategoryResponse[]) => {
        categories.forEach(category => {
          if (category.isFinal) {
            finalCats.push(category);
          }
          if (category.subcategories && category.subcategories.length > 0) {
            traverse(category.subcategories);
          }
        });
      };

      traverse(cats);
      return finalCats;
    },
    []
  );

  const finalCategories = categories ? getFinalCategories(categories) : [];

  // Submit handler
  const handleSubmit = useCallback(
    (data: CreateServiceForm) => {
      const serviceRequest: CreateServiceRequest = {
        ...data,
        photos: fileUpload.files,
      };

      createService(serviceRequest, {
        onSuccess: (data: ApiResponse) => {
          toast.success(data.message);

          // Invalidar todas las queries de categorías para refrescar los datos
          queryClient.invalidateQueries({ queryKey: ['categories'] });

          // Llamar al callback de éxito (para cerrar el modal)
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
              'Error al crear el servicio';
            toast.error(message);
          }
        },
      });
    },
    [createService, fileUpload.files, queryClient, onSuccess]
  );

  // Reset form handler
  const handleResetForm = useCallback(() => {
    form.reset();
    fileUpload.handleClearFiles();
  }, [form, fileUpload]);

  return {
    // Values
    form,
    categories: {
      data: finalCategories,
      isLoading: categoriesLoading,
      error: categoriesError,
    },
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
    // Handlers
    handleResetForm,
  };
};
