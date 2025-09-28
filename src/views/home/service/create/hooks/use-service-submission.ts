import type { AxiosError } from 'axios';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

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
  const router = useRouter();
  const { mutate: createService, isPending } = useCreateServiceMutation();

  const onSubmit = (data: CreateServiceFormData) => {
    const serviceRequest: CreateServiceRequest = {
      ...data,
      photos: fileUpload.files,
    };

    createService(serviceRequest, {
      onSuccess: (data: ApiResponse) => {
        toast.success(data.message);
        router.push('/home/service');
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
            axiosError.response?.data?.message || 'Error al crear el servicio';
          toast.error(message);
        }
      },
    });
  };

  return {
    onSubmit,
    isLoading: isPending,
    isValid: form.formState.isValid && form.formState.isDirty,
  };
};
