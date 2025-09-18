'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useEditUserMutation } from '@/hooks/api';
import { formatPhoneNumber } from '@/libs';
import type { EditUserRequest } from '@/models/requests';
import { editUserSchema } from '@/models/schemas';

export const useEditUserForm = () => {
  const {
    mutate: editUser,
    isPending,
    error,
    isSuccess,
  } = useEditUserMutation();

  const form = useForm<EditUserRequest>({
    resolver: zodResolver(editUserSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
    },
  });

  const onSubmit = (data: EditUserRequest) => {
    // Transformar datos antes de enviar
    const transformedData = {
      ...data,
      phoneNumber: formatPhoneNumber(data.phoneNumber),
      dateOfBirth: data.dateOfBirth,
    };

    editUser(transformedData);
  };

  return {
    form,
    onSubmit,
    isLoading: isPending,
    error,
    isSuccess,
  };
};
