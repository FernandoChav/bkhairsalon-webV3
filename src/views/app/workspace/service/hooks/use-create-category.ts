import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCallback, useEffect } from 'react';

import { useCreateCategoryMutation } from '@/hooks/api';
import { CategoryResponse } from '@/models/responses';
import { CreateCategoryForm, createCategorySchema } from '@/models/schemas';

interface UseCreateCategoryParams {
  parentCategory?: CategoryResponse | null;
  onSuccess?: () => void;
  categories?: CategoryResponse[];
}

interface UseCreateCategoryReturn {
  // Values
  form: ReturnType<typeof useForm<CreateCategoryForm>>;
  submission: {
    isLoading: boolean;
    isValid: boolean;
    handleSubmit: (data: CreateCategoryForm) => void;
  };
  // Handlers
  handleResetForm: () => void;
}

export const useCreateCategory = ({
  parentCategory,
  onSuccess,
  categories = [],
}: UseCreateCategoryParams = {}): UseCreateCategoryReturn => {
  const queryClient = useQueryClient();

  const createCategoryMutation = useCreateCategoryMutation();

  // Form setup
  const form = useForm<CreateCategoryForm>({
    resolver: zodResolver(createCategorySchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      description: '',
      parentCategoryId: undefined,
    },
  });

  // Establecer el parentCategoryId internamente cuando cambie la categoría padre
  useEffect(() => {
    form.setValue('parentCategoryId', parentCategory?.id, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
  }, [parentCategory?.id, form]);

  // Submit handler with real API call
  const handleSubmit = useCallback(
    (data: CreateCategoryForm) => {
      // Asegurar que el parentCategoryId correcto se envíe
      const requestData = {
        name: data.name,
        description: data.description,
        parentCategoryId: parentCategory?.id || undefined,
      };

      // Prevent double submission
      if (createCategoryMutation.isPending) {
        return;
      }

      createCategoryMutation.mutate(requestData, {
        onSuccess: () => {
          toast.success('Categoría creada exitosamente');
          form.reset();

          // Invalidar todas las queries de categorías para refrescar los datos
          queryClient.invalidateQueries({ queryKey: ['categories'] });

          // Llamar al callback de éxito (para cerrar el modal)
          onSuccess?.();
        },
        onError: error => {
          toast.error(
            error.response?.data?.message || 'Error al crear la categoría'
          );
        },
      });
    },
    [createCategoryMutation, form, queryClient, onSuccess, parentCategory?.id]
  );

  // Reset form handler
  const handleResetForm = useCallback(() => {
    form.reset();
  }, [form]);

  return {
    // Values
    form,
    submission: {
      isLoading: createCategoryMutation.isPending,
      isValid: form.formState.isValid && form.formState.isDirty,
      handleSubmit,
    },
    // Handlers
    handleResetForm,
  };
};
