import { AxiosError } from 'axios';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useCreateServiceMutation } from '@/hooks/api';
import { extractValidationMessages, isValidationError } from '@/libs';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest } from '@/models/requests';
import { CreateServiceFormData } from '@/models/schemas';

interface FileUploadHook {
  files: File[];
  addFiles: (files: FileList | File[]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
}

export const useServiceSubmission = (
  form: UseFormReturn<CreateServiceFormData>,
  fileUpload: FileUploadHook
) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createServiceMutation = useCreateServiceMutation();

  const onSubmit = async (data: CreateServiceFormData) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const serviceRequest: CreateServiceRequest = {
        ...data,
        photos: fileUpload.files,
      };
      await createServiceMutation.mutateAsync(serviceRequest);
      toast.success('Servicio creado exitosamente');
      router.push('/home/service');
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
  };

  return {
    onSubmit,
    isLoading,
    isValid: form.formState.isValid && form.formState.isDirty,
  };
};
