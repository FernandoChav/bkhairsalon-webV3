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

interface UseEditUserViewReturn {
  // Values
  form: ReturnType<typeof useEditUserForm>['form'];
  isSubmitting: boolean;
  isLoadingProfile: boolean;
  canSubmit: boolean;
  modal: {
    isOpen: boolean;
    isPasswordVisible: boolean;
    form: ReturnType<typeof useConfirmPasswordModal>['form'];
    handleClose: () => void;
    handleSubmit: () => void;
    handleConfirm: (password: string) => void;
    handlePasswordToggle: () => void;
  };
}

export const useEditUserView = (): UseEditUserViewReturn => {
  const { form, canSubmit, isLoadingProfile } = useEditUserForm();
  const {
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
    isPasswordVisible,
    handlePasswordToggle,
    form: modalForm,
  } = useConfirmPasswordModal();

  const { mutate: editUser, isPending } = useEditUserMutation();

  const handleSubmit = () => {
    if (canSubmit) {
      handleOpenModal();
    } else {
      toast.info('No hay cambios para guardar');
    }
  };

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
    // Values
    form,
    isSubmitting: isPending,
    isLoadingProfile,
    canSubmit,
    modal: {
      isOpen: isModalOpen,
      isPasswordVisible,
      form: modalForm,
      handleClose: handleCloseModal,
      handleSubmit,
      handleConfirm,
      handlePasswordToggle,
    },
  };
};
