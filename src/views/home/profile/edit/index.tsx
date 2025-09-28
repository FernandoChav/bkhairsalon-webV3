'use client';

import { FC } from 'react';

import {
  ConfirmPasswordModal,
  EditUserForm,
  EditUserFormSkeleton,
} from './components';
import { useEditUserForm } from './hooks';

export const EditUserView: FC = () => {
  const { form, modal, isSubmitting, isLoadingProfile, hasChanges } =
    useEditUserForm();

  // Lógica del botón en el componente
  const isFormValid =
    form.formState.isValid &&
    !!form.getValues('firstName') &&
    !!form.getValues('lastName') &&
    !!form.getValues('email') &&
    !!form.getValues('phoneNumber') &&
    !!form.getValues('dateOfBirth');

  const canSubmit = isFormValid && hasChanges;

  const buttonText = isSubmitting
    ? 'Actualizando...'
    : hasChanges
      ? 'Actualizar Perfil'
      : 'Sin cambios para guardar';

  if (isLoadingProfile) {
    return <EditUserFormSkeleton />;
  }

  return (
    <>
      <EditUserForm
        form={form}
        modal={modal}
        canSubmit={canSubmit}
        isSubmitting={isSubmitting}
        buttonText={buttonText}
      />

      <ConfirmPasswordModal
        open={modal.show}
        onClose={modal.close}
        onConfirm={modal.handleConfirm}
      />
    </>
  );
};
