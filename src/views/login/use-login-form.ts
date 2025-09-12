'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { redirect } from 'next/navigation';

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

  const onSubmit = async (data: LoginRequest) => {
    const result = await signIn('credentials', {
      redirect: false, // doesn’t redirect to callback
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      console.error('Hubo un error en el inicio de sesión: ', result);
    } else {
      console.log('Inicio de sesión exitoso! ', result);
      redirect('/Home');
    }
  };

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
    error: form.formState.errors,
    isSuccess: false,
  };
};
