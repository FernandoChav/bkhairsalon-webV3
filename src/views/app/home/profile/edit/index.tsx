'use client';

import { FC } from 'react';

import {
  ConfirmPasswordModal,
  EditUserForm,
  EditUserFormSkeleton,
} from './components';
import { useEditUserView } from './hooks';

export const EditUserView: FC = () => {
  const { form, modal, isSubmitting, isLoadingProfile, canSubmit } =
    useEditUserView();

  if (isLoadingProfile) {
    return <EditUserFormSkeleton />;
  }

  return (
    <>
      <EditUserForm
        form={form}
        canSubmit={canSubmit}
        isSubmitting={isSubmitting}
        handleFormSubmit={modal.handleSubmit}
      />

      <ConfirmPasswordModal
        isOpen={modal.show}
        handleClose={modal.handleClose}
        handleConfirm={modal.handleConfirm}
        isShowPassword={modal.showPassword}
        handlePasswordToggle={modal.handlePasswordToggle}
        form={modal.form}
      />
    </>
  );
};
