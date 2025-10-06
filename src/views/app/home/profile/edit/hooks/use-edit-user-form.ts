import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { useEffect, useMemo } from 'react';

import { useUserProfileQuery } from '@/hooks/api';
import { EditUserForm, editUserFormSchema } from '@/models/schemas';

export const useEditUserForm = () => {
  const { data: profile, isLoading: isLoadingProfile } = useUserProfileQuery();

  const form = useForm<EditUserForm>({
    resolver: zodResolver(editUserFormSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      dateOfBirth: '',
    },
  });

  // Cargar datos del perfil cuando estén disponibles
  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        dateOfBirth: profile.dateOfBirth,
      });
    }
  }, [profile, form]);

  // Observar cambios en tiempo real en los valores del formulario
  const watchedValues = useWatch({ control: form.control });

  // Detectar si hay cambios en el formulario
  const hasChanges = useMemo(() => {
    if (!profile || !watchedValues) return false;

    // Comparar cada campo con los datos originales del perfil
    return (
      watchedValues.firstName !== profile.firstName ||
      watchedValues.lastName !== profile.lastName ||
      watchedValues.phoneNumber !== profile.phoneNumber ||
      watchedValues.dateOfBirth !== profile.dateOfBirth
    );
  }, [watchedValues, profile]);

  // Computed values
  const isFormValid = useMemo(() => {
    return (
      form.formState.isValid &&
      !!form.getValues('firstName') &&
      !!form.getValues('lastName') &&
      !!form.getValues('phoneNumber') &&
      !!form.getValues('dateOfBirth')
    );
  }, [form]);

  const canSubmit = isFormValid && hasChanges;

  return {
    form,
    isLoadingProfile,
    canSubmit,
    hasChanges,
  };
};
