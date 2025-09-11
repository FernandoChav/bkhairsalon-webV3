'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { LoginRequest } from '@/models/requests/auth';
import { loginSchema } from '@/models/schemas/auth';

export const useLoginForm = () => {

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginRequest) => {
    // Ejecutar mutación de inicio
  };

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
    error: form.formState.errors,
    isSuccess: false,
  };
};
