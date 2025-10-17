import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCallback, useEffect, useRef } from 'react';

import { useUpdateCategoryMutation } from '@/hooks/api';
import { CategoryResponse } from '@/models/responses';
import { UpdateCategoryForm, updateCategorySchema } from '@/models/schemas';

interface UseUpdateCategoryParams {
  category?: CategoryResponse | null;
  onSuccess?: () => void;
}

interface UseUpdateCategoryReturn {
  form: ReturnType<typeof useForm<UpdateCategoryForm>>;
  submission: {
    isLoading: boolean;
    isValid: boolean;
  };
  handleSubmit: (data: UpdateCategoryForm) => void;
  handleResetForm: () => void;
}

export const useUpdateCategory = ({
  category,
  onSuccess,
}: UseUpdateCategoryParams = {}): UseUpdateCategoryReturn => {
  const queryClient = useQueryClient();
  const updateCategoryMutation = useUpdateCategoryMutation();
  const userHasInteracted = useRef(false);

  // Form setup
  const form = useForm<UpdateCategoryForm>({
    resolver: zodResolver(updateCategorySchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // Establecer los valores iniciales cuando cambie la categoría
  useEffect(() => {
    if (category && !userHasInteracted.current) {
      form.setValue('name', category.name, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
      form.setValue('description', category.description || '', {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  }, [category, form]);

  // Track user interaction
  useEffect(() => {
    const subscription = form.watch((value, { type }) => {
      if (type === 'change') {
        userHasInteracted.current = true;
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Reset interaction flag when category changes
  useEffect(() => {
    userHasInteracted.current = false;
  }, [category?.id]);

  // Submit handler with real API call
  const handleSubmit = useCallback(
    (data: UpdateCategoryForm) => {
      if (!category) {
        toast.error('No se ha seleccionado una categoría para actualizar');
        return;
      }

      // Prevent double submission
      if (updateCategoryMutation.isPending) {
        return;
      }

      updateCategoryMutation.mutate(
        { id: category.id, data },
        {
          onSuccess: () => {
            toast.success('Categoría actualizada exitosamente');
            form.reset();

            // Invalidar todas las queries de categorías para refrescar los datos
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            // Llamar al callback de éxito (para cerrar el modal)
            onSuccess?.();
          },
          onError: (error: { response?: { data?: { message?: string } } }) => {
            toast.error(
              error.response?.data?.message ||
                'Error al actualizar la categoría'
            );
          },
        }
      );
    },
    [updateCategoryMutation, form, queryClient, onSuccess, category]
  );

  // Reset form handler
  const handleResetForm = useCallback(() => {
    form.reset();
    userHasInteracted.current = false;
  }, [form]);

  return {
    form,
    submission: {
      isLoading: updateCategoryMutation.isPending,
      isValid: form.formState.isValid && form.formState.isDirty,
    },
    handleSubmit,
    handleResetForm,
  };
};
