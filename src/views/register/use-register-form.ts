'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useRegisterMutation } from '@/hooks';
import { transformRegisterData } from '@/models/helpers/auth';
import type { RegisterRequest } from '@/models/requests/auth';
import { registerSchema } from '@/models/schemas/auth';

export const useRegisterForm = () => {
  const {
    mutate: register,
    isPending,
    error,
    isSuccess,
  } = useRegisterMutation();

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
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
    const transformedData = transformRegisterData(data);

    // Ejecutar mutación de registro
    register(transformedData);
  };

  return {
    form,
    onSubmit,
    isLoading: isPending,
    error,
    isSuccess,
  };
};
