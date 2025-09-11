'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/hooks';
import type { LoginRequest } from '@/models/requests/auth';
import { loginSchema } from '@/models/schemas/auth';

export const useLoginForm = () => {
  const { mutate: login, isPending, error, isSuccess } = useLoginMutation();

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
    login(data);
  };

  return {
    form,
    onSubmit,
    isLoading: isPending,
    error,
    isSuccess,
  };
};
