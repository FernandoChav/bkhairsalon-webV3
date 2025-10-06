import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { useEditUserMutation } from '@/hooks/api';
import {
  extractValidationMessages,
  formatPhoneNumber,
  isValidationError,
} from '@/libs';
import { ApiResponse } from '@/models/generics';

import { useConfirmPasswordModal } from './use-confirm-password-modal';
import { useEditUserForm } from './use-edit-user-form';

export const useEditUserView = () => {
  const { form, canSubmit, isLoadingProfile } = useEditUserForm();
  const {
    handleOpenModal,
    handleCloseModal,
    showModal,
    showPassword,
    handlePasswordToggle,
    form: modalForm,
  } = useConfirmPasswordModal();

  const { mutate: editUser, isPending } = useEditUserMutation();

  // Función para manejar el submit del formulario
  const handleSubmit = () => {
    if (canSubmit) {
      handleOpenModal();
    } else {
      toast.info('No hay cambios para guardar');
    }
  };

  // Función para manejar la confirmación del modal
  const handleConfirm = (password: string) => {
    const formData = form.getValues();
    const transformedData = {
      ...formData,
      phoneNumber: formatPhoneNumber(formData.phoneNumber),
      currentPassword: password,
    };

    editUser(transformedData, {
      onSuccess: (data: ApiResponse) => {
        toast.success(data.message);
        handleCloseModal();
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

  return {
    form,
    isSubmitting: isPending,
    isLoadingProfile,
    canSubmit,
    modal: {
      show: showModal,
      handleClose: handleCloseModal,
      handleSubmit,
      handleConfirm,
      showPassword,
      handlePasswordToggle,
      form: modalForm,
    },
  };
};
