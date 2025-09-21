import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import { useRegisterMutation } from '@/hooks/api';
import {
  extractValidationMessages,
  formatPhoneNumber,
  isValidationError,
} from '@/libs';
import { ApiResponse } from '@/models/generics';
import type { RegisterRequest } from '@/models/requests';
import { registerSchema } from '@/models/schemas';

export const useRegisterForm = () => {
  const router = useRouter();
  const {
    mutate: register,
    isPending,
    error,
    isSuccess,
  } = useRegisterMutation();

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterRequest) => {
    // Transformar datos antes de enviar
    const transformedData = {
      ...data,
      phoneNumber: formatPhoneNumber(data.phoneNumber),
    };

    register(transformedData, {
      onSuccess: (data: ApiResponse) => {
        toast.success(data.message);
        router.push('/login');
      },
      onError: (error: AxiosError<ApiResponse>) => {
        if (isValidationError(error)) {
          const validationMessages = extractValidationMessages(error);
          validationMessages.forEach(message => {
            toast.error(message);
          });
        }
      },
    });
  };

  return {
    form,
    onSubmit,
    isLoading: isPending,
    error,
    isSuccess,
  };
};
