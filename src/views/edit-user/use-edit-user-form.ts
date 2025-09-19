'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useEditUserMutation } from '@/hooks/api';
import { formatPhoneNumber } from '@/libs';
import type { EditUserForm } from '@/models/generics';
import { editUserFormSchema } from '@/models/schemas';
import { passwordSchema } from '@/models/schemas/helpers';

export const useEditUserForm = () => {
  const {
    mutate: editUser,
    isPending,
    error,
    isSuccess,
  } = useEditUserMutation();

  const form = useForm<EditUserForm>({
    resolver: zodResolver(editUserFormSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
    },
  });

  const onSubmit = (data: EditUserForm, password: string) => {
    const parsedPassword = passwordSchema.safeParse({ password });
    if (!parsedPassword.success) {
      console.error(parsedPassword.error.format());
      return;
    }

    // Transformar datos antes de enviar
    const transformedData = {
      ...data,
      phoneNumber: formatPhoneNumber(data.phoneNumber),
      dateOfBirth: data.dateOfBirth,
      currentPassword: parsedPassword.data.password,
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
