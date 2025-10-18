'use client';

import { useState } from 'react';

import { useDeleteAccountMutation, useDeletionInfoQuery } from '@/hooks/api';
import { DeletionInfoDto } from '@/models/responses';

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

  // Hook de confirmación de contraseña
  const confirmPasswordModal = useConfirmPasswordModal();

  // Queries / Mutations
  const { data: deletionInfo, refetch } = useDeletionInfoQuery();
  const deleteAccountMutation = useDeleteAccountMutation();

  // Handlers
  const handleOpenDeletionModal = async () => {
    await refetch(); // obtener la info actualizada antes de mostrar
    setIsDeletionModalOpen(true);
  };

  const handleCloseDeletionModal = () => {
    setIsDeletionModalOpen(false);
  };

  const handleContinueDeletion = () => {
    setIsDeletionModalOpen(false);
    confirmPasswordModal.handleOpenModal(); // mostrar modal de contraseña
  };

  const handleConfirmPassword = (password: string) => {
    deleteAccountMutation.mutate({ password });
  };

  return {
    // Values
    deletionInfo,
    isDeletionModalOpen,
    confirmPasswordModal,

    // Handlers
    handleOpenDeletionModal,
    handleCloseDeletionModal,
    handleContinueDeletion,
    handleConfirmPassword,
  };
};
