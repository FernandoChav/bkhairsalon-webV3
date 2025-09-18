'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { useLoginMutation } from '@/hooks/api/use-auth-client';
import type { LoginRequest } from '@/models/requests/auth';
import { loginSchema } from '@/models/schemas/auth';

export const useLoginForm = () => {
  const { mutateAsync: login, isPending } = useLoginMutation();
  const router = useRouter();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      router.push('/Home');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {} // Already handled by showApiError and mutation
  };

  return {
    form,
    onSubmit,
    isLoading: isPending,
    error: form.formState.errors,
    isSuccess: false,
  };
};
