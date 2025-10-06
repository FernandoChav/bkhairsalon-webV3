import type { AxiosError } from 'axios';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import { useCreateServiceMutation } from '@/hooks/api';
import { extractValidationMessages, isValidationError } from '@/libs';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest } from '@/models/requests';
import { CreateServiceForm } from '@/models/schemas';

interface FileUploadHook {
  files: File[];
  handleAddFiles: (files: FileList | File[]) => void;
  handleRemoveFile: (index: number) => void;
  handleClearFiles: () => void;
}

interface UseServiceSubmissionParams {
  form: UseFormReturn<CreateServiceForm>;
  fileUpload: FileUploadHook;
}

interface UseServiceSubmissionReturn {
  // Values
  isLoading: boolean;
  isValid: boolean;
  // Handlers
  handleSubmit: (data: CreateServiceForm) => void;
}

export const useServiceSubmission = ({
  form,
  fileUpload,
}: UseServiceSubmissionParams): UseServiceSubmissionReturn => {
  const router = useRouter();
  const { mutate: createService, isPending } = useCreateServiceMutation();

  const handleSubmit = (data: CreateServiceForm) => {
    const serviceRequest: CreateServiceRequest = {
      ...data,
      photos: fileUpload.files,
    };

    createService(serviceRequest, {
      onSuccess: (data: ApiResponse) => {
        toast.success(data.message);
        router.push('/workspace/service');
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
    // Values
    isLoading: isPending,
    isValid: form.formState.isValid && form.formState.isDirty,
    // Handlers
    handleSubmit,
  };
};
