import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { useCallback, useState } from 'react';

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

export const useRegisterView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const watchedValues = useWatch({ control: form.control });

  const handleSubmit = useCallback(
    (data: RegisterRequest) => {
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
    },
    [register, router]
  );

  const handlePasswordToggle = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleConfirmPasswordToggle = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const isValid = Boolean(
    form.formState.isValid &&
      watchedValues?.firstName &&
      watchedValues?.lastName &&
      watchedValues?.email &&
      watchedValues?.phoneNumber &&
      watchedValues?.dateOfBirth &&
      watchedValues?.password &&
      watchedValues?.confirmPassword
  );

  return {
    form,
    handleSubmit,
    handlePasswordToggle,
    handleConfirmPasswordToggle,
    isLoading: isPending,
    error,
    isSuccess,
    isValid,
    showPassword,
    showConfirmPassword,
  };
};
