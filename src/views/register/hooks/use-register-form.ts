'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useRegisterMutation } from '@/hooks/api';
import { formatPhoneNumber } from '@/libs';
import type { RegisterRequest } from '@/models/requests';
import { registerSchema } from '@/models/schemas';

export const useRegisterForm = () => {
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
      dateOfBirth: data.dateOfBirth, // Ya está en formato YYYY-MM-DD, no necesita transformación
    };

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
