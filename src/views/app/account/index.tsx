'use client';

import { HiCog, HiUser } from 'react-icons/hi';

import { FC } from 'react';

import Link from 'next/link';

import { ConfirmPasswordModal } from './components/confirm-password-modal';
import { DeletionInfoModal } from './components/deletion-info-modal';
import { useAccountView } from './hooks/use-account-view';

/**
 * Vista principal del perfil de usuario.
 * Permite editar el perfil o eliminar la cuenta.
 */
export const AccountView: FC = () => {
  const {
    deletionInfo,
    isDeletionModalOpen,
    confirmPasswordModal,
    handleOpenDeletionModal,
    handleCloseDeletionModal,
    handleContinueDeletion,
    handleConfirmPassword,
  } = useAccountView();

  return (
    <>
      {/* Lista de acciones del usuario */}
      <ul className="divide-y divide-gray-200">
        <li>
          <Link
            href="/account/edit"
            className="flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
          >
            <HiCog className="h-5 w-5" />
            <span>Editar perfil</span>
          </Link>
        </li>

        <li
          className="flex items-center gap-2 p-4 cursor-pointer text-red-600 hover:bg-red-50 rounded-md transition-colors"
          onClick={handleOpenDeletionModal}
        >
          <HiUser className="h-5 w-5" />
          <span>Eliminar cuenta</span>
        </li>
      </ul>

      {/* Modal: Información previa a la eliminación */}
      <DeletionInfoModal
        isOpen={isDeletionModalOpen}
        info={deletionInfo}
        handleClose={handleCloseDeletionModal}
        handleContinue={handleContinueDeletion}
      />

      {/* Modal: Confirmar contraseña */}
      <ConfirmPasswordModal
        isOpen={confirmPasswordModal.isModalOpen}
        isShowPassword={confirmPasswordModal.isPasswordVisible}
        form={confirmPasswordModal.form}
        handleClose={confirmPasswordModal.handleCloseModal}
        handleConfirm={handleConfirmPassword}
        handlePasswordToggle={confirmPasswordModal.handlePasswordToggle}
      />
    </>
  );
};
