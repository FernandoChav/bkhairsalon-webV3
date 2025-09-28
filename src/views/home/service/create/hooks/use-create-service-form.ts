import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useCreateServiceMutation, useGetCategoriesQuery } from '@/hooks/api';
import { useFileUpload } from '@/hooks/common';
import { extractValidationMessages, isValidationError } from '@/libs';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest } from '@/models/requests';
import { CategoryDto } from '@/models/responses';
import { CreateServiceFormData, createServiceSchema } from '@/models/schemas';

export const useCreateServiceForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createServiceMutation = useCreateServiceMutation();
  const fileUpload = useFileUpload(10); //Ver cuanto será el limite
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const form = useForm<CreateServiceFormData>({
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

  const onSubmit = useCallback(
    async (data: CreateServiceFormData) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const serviceRequest: CreateServiceRequest = {
          ...data,
          photos: fileUpload.files,
        };
        await createServiceMutation.mutateAsync(serviceRequest);
        toast.success('Servicio creado exitosamente');
        router.push('/services'); // Actualmente redireciono a si mismo
      } catch (error) {
        const messages = error as AxiosError<ApiResponse>;

        if (isValidationError(messages)) {
          const validationMessages = extractValidationMessages(messages);
          toast.error(validationMessages[0] || 'Error de validación');
        } else {
          const message =
            messages.response?.data?.message || 'Error al crear el servicio';
          toast.error(message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, createServiceMutation, fileUpload.files, router]
  );

  // Validación personalizada en tiempo real
  useEffect(() => {
    const subscription = form.watch((_value, { name }) => {
      // Solo validar endTime cuando cambien los campos relacionados
      if (name === 'endTime' || name === 'startTime' || name === 'duration') {
        const startTime = form.getValues('startTime');
        const endTime = form.getValues('endTime');
        const duration = form.getValues('duration');

        if (startTime && endTime) {
          // Validar que hora fin > hora inicio
          const startTimeParts = startTime.split(':').map(Number);
          const endTimeParts = endTime.split(':').map(Number);
          const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
          const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];

          if (endMinutes <= startMinutes) {
            form.setError('endTime', {
              type: 'manual',
              message:
                'El horario de término debe ser posterior al horario de inicio',
            });
            return;
          }

          // Validar que el intervalo sea suficiente para la duración
          if (duration) {
            const intervalMinutes = endMinutes - startMinutes;
            if (intervalMinutes < duration) {
              form.setError('endTime', {
                type: 'manual',
                message:
                  'El horario de disponibilidad debe ser suficiente para realizar el servicio',
              });
              return;
            }
          }

          // Limpiar errores si todo está bien
          form.clearErrors('endTime');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Generar opciones de duración de 5 en 5 minutos desde 0 hasta 300 minutos
  const durationOptions = Array.from({ length: 61 }, (_, i) => i * 5);

  // Flatten categories and filter only final categories
  const getFinalCategories = useCallback(
    (cats: CategoryDto[]): CategoryDto[] => {
      const finalCats: CategoryDto[] = [];

      const traverse = (categories: CategoryDto[]) => {
        categories.forEach(category => {
          if (category.isFinal) {
            finalCats.push(category);
          }
          if (category.subCategories && category.subCategories.length > 0) {
            traverse(category.subCategories);
          }
        });
      };

      traverse(cats);
      return finalCats;
    },
    []
  );

  const finalCategories = categories ? getFinalCategories(categories) : [];

  const resetForm = useCallback(() => {
    form.reset();
    fileUpload.clearFiles();
  }, [form, fileUpload]);

  return {
    form,
    onSubmit,
    isLoading,
    fileUpload,
    resetForm,
    errors: form.formState.errors,
    isValid: form.formState.isValid && form.formState.isDirty,
    durationOptions,
    categories: finalCategories,
    categoriesLoading,
    categoriesError,
  };
};
