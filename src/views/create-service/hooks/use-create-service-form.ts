import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useCreateServiceMutation } from '@/hooks/api/use-service-client';
import { useFileUpload } from '@/hooks/common/use-file-upload';
import { extractValidationMessages, isValidationError } from '@/libs/api-utils';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest } from '@/models/requests/service';
import {
  CreateServiceFormData,
  createServiceSchema,
} from '@/models/schemas/service';

export const useCreateServiceForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createServiceMutation = useCreateServiceMutation();
  const fileUpload = useFileUpload(10); //Ver cuanto será el limite

  const form = useForm<CreateServiceFormData>({
    resolver: zodResolver(createServiceSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      description: '',
      duration: 60,
      price: 0,
      startTime: '09:00',
      endTime: '18:00',
      commissionPercentage: 10,
      categoryId: '',
      discountId: undefined,
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
  };
};
