import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { useEffect, useMemo } from 'react';

import { useUserProfileQuery } from '@/hooks/api';
import { EditUserForm, editUserFormSchema } from '@/models/schemas';

interface UseEditUserFormReturn {
  // Values
  form: ReturnType<typeof useForm<EditUserForm>>;
  isLoadingProfile: boolean;
  canSubmit: boolean;
  hasChanges: boolean;
}

export const useEditUserForm = (): UseEditUserFormReturn => {
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

  // Computed values - siguiendo el patrón de otros formularios
  const isFormValid = useMemo(() => {
    // Usar watchedValues que sí tiene los valores correctos
    const formValues = watchedValues || {};

    // Verificar que todos los campos tengan valores
    const fieldChecks = {
      firstName: !!formValues.firstName,
      lastName: !!formValues.lastName,
      phoneNumber: !!formValues.phoneNumber,
      dateOfBirth: !!formValues.dateOfBirth,
    };

    const hasAllValues = Boolean(
      fieldChecks.firstName &&
        fieldChecks.lastName &&
        fieldChecks.phoneNumber &&
        fieldChecks.dateOfBirth
    );

    // Verificar que no hay errores de validación
    const hasNoErrors = Object.keys(form.formState.errors).length === 0;

    return hasAllValues && hasNoErrors;
  }, [watchedValues, form]);

  const canSubmit = isFormValid && hasChanges;

  return {
    // Values
    form,
    isLoadingProfile,
    canSubmit,
    hasChanges,
  };
};
