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
  categories: {
    data: CategoryResponse[];
    isLoading: boolean;
    error: unknown;
  };
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
      parentCategoryId: parentCategory?.id,
    },
  });

  // Get all categories (flattened tree structure)
  const getAllCategories = useCallback(
    (cats: CategoryResponse[]): CategoryResponse[] => {
      const allCats: CategoryResponse[] = [];

      const traverse = (categories: CategoryResponse[]) => {
        categories.forEach(category => {
          allCats.push(category);
          if (category.subCategories && category.subCategories.length > 0) {
            traverse(category.subCategories);
          }
        });
      };

      traverse(cats);
      return allCats;
    },
    []
  );

  const parentCategories = getAllCategories(categories);

  // Actualizar el formulario cuando cambie la categoría padre
  useEffect(() => {
    console.log('useEffect - parentCategory:', parentCategory);
    console.log('useEffect - parentCategory?.id:', parentCategory?.id);
    form.setValue('parentCategoryId', parentCategory?.id);
  }, [parentCategory?.id, form]);

  // Submit handler with real API call
  const handleSubmit = useCallback(
    (data: CreateCategoryForm) => {
      console.log('Datos del formulario antes de procesar:', data);
      console.log(
        'Valor actual del formulario parentCategoryId:',
        form.getValues('parentCategoryId')
      );

      // Asegurar que undefined se mantenga como undefined para el backend
      const requestData = {
        ...data,
        parentCategoryId: data.parentCategoryId || undefined,
      };

      // Prevent double submission
      if (createCategoryMutation.isPending) {
        console.log('Mutation already in progress, skipping...');
        return;
      }

      console.log('Enviando datos al backend:', requestData);
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
    [createCategoryMutation, form, queryClient, onSuccess]
  );

  // Reset form handler
  const handleResetForm = useCallback(() => {
    form.reset();
  }, [form]);

  return {
    // Values
    form,
    categories: {
      data: parentCategories,
      isLoading: false,
      error: null,
    },
    submission: {
      isLoading: createCategoryMutation.isPending,
      isValid: form.formState.isValid && form.formState.isDirty,
      handleSubmit,
    },
    // Handlers
    handleResetForm,
  };
};
