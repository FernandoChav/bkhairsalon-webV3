import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { useEffect, useMemo, useState } from 'react';

import { useEditUserMutation, useUserProfileQuery } from '@/hooks/api';
import {
  extractValidationMessages,
  formatPhoneNumber,
  isValidationError,
} from '@/libs';
import { ApiResponse } from '@/models/generics';
import {
  EditUserForm,
  editUserFormSchema,
  passwordSchema,
} from '@/models/schemas';

export const useEditUserForm = () => {
  const [showModal, setShowModal] = useState(false);

  const { mutate: editUser, isPending } = useEditUserMutation();

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

  // Función para ejecutar el submit con contraseña (solo lógica de negocio)
  const submitWithPassword = (data: EditUserForm, password: string) => {
    const parsedPassword = passwordSchema.safeParse({ password });

    if (!parsedPassword.success) {
      return;
    }

    // Transformar datos antes de enviar
    const transformedData = {
      ...data,
      phoneNumber: formatPhoneNumber(data.phoneNumber),
      dateOfBirth: data.dateOfBirth,
      currentPassword: parsedPassword.data.password,
    };

    editUser(transformedData, {
      onSuccess: (data: ApiResponse) => {
        toast.success(data.message);
      },
      onError: (error: AxiosError<ApiResponse>) => {
        if (isValidationError(error)) {
          const validationMessages = extractValidationMessages(error);
          validationMessages.forEach(message => {
            toast.error(message);
          });
        }
      },
    });
  };

  // Función para manejar el submit del formulario
  const handleFormSubmit = () => {
    if (hasChanges) {
      setShowModal(true);
    } else {
      toast.info('No hay cambios para guardar');
    }
  };

  // Función para manejar la confirmación del modal
  const handleConfirmSubmit = (password: string) => {
    const formData = form.getValues();
    submitWithPassword(formData, password);
    setShowModal(false);
  };

  // Función para cerrar el modal
  const closeModal = () => setShowModal(false);

  return {
    form,
    modal: {
      show: showModal,
      handleSubmit: handleFormSubmit,
      handleConfirm: handleConfirmSubmit,
      close: closeModal,
    },
    isSubmitting: isPending,
    isLoadingProfile,
    hasChanges,
  };
};
