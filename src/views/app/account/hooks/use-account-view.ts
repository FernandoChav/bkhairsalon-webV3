'use client';

import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useDeleteAccountMutation, useDeletionInfoQuery } from '@/hooks/api';
import { extractValidationMessages, isValidationError } from '@/libs';
import type { ApiResponse } from '@/models/generics';
import type { DeleteUserRequest } from '@/models/requests';

import { useConfirmPasswordModal } from './use-confirm-password-modal';

/**
 * Hook que gestiona la lógica de la vista de cuenta:
 * - Maneja la apertura/cierre de los modales.
 * - Gestiona la eliminación de cuenta del usuario.
 * - Coordina la confirmación de contraseña antes de eliminar la cuenta.
 */
export const useAccountView = () => {
  // Estado para el modal de información de eliminación
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const confirmPasswordModal = useConfirmPasswordModal();
  const router = useRouter();

  // Queries / Mutations
  const { data: deletionInfo, refetch } = useDeletionInfoQuery();
  const { mutate: deleteAccount, isPending } = useDeleteAccountMutation();

  // Handlers
  const handleOpenDeletionModal = useCallback(async () => {
    await refetch(); // obtener la info actualizada antes de mostrar
    setIsDeletionModalOpen(true);
  }, [refetch]);

  const handleCloseDeletionModal = useCallback(() => {
    setIsDeletionModalOpen(false);
  }, []);

  const handleContinueDeletion = useCallback(() => {
    setIsDeletionModalOpen(false);
    confirmPasswordModal.handleOpenModal(); // mostrar modal de contraseña
  }, [confirmPasswordModal]);

  const handleConfirmPassword = useCallback(
    (password: string) => {
      const payload: DeleteUserRequest = { password };

      deleteAccount(payload, {
        onSuccess: (data: ApiResponse) => {
          toast.success(data.message || 'Cuenta eliminada correctamente');
          router.push('/');
        },
        onError: (error: AxiosError<ApiResponse>) => {
          if (isValidationError(error)) {
            const validationMessages = extractValidationMessages(error);
            validationMessages.forEach(message => {
              toast.error(message);
            });
          } else {
            toast.error(
              error.response?.data?.message ||
                'No se pudo eliminar la cuenta. Inténtalo nuevamente.'
            );
          }
        },
      });
    },
    [deleteAccount, router]
  );

  return {
    // Values
    deletionInfo,
    isDeletionModalOpen,
    confirmPasswordModal,
    isLoading: isPending,

    // Handlers
    handleOpenDeletionModal,
    handleCloseDeletionModal,
    handleContinueDeletion,
    handleConfirmPassword,
  };
};
