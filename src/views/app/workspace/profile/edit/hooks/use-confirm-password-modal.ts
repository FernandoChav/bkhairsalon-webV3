import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useState } from 'react';

import { type PasswordForm, passwordSchema } from '@/models/schemas';

interface UseConfirmPasswordModalReturn {
  // Values
  isModalOpen: boolean;
  isPasswordVisible: boolean;
  form: ReturnType<typeof useForm<PasswordForm>>;
  // Handlers
  handlePasswordToggle: () => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

export const useConfirmPasswordModal = (): UseConfirmPasswordModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' },
    mode: 'onTouched',
  });

  const handlePasswordToggle = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
  };

  return {
    // Values
    isModalOpen,
    isPasswordVisible,
    form,
    // Handlers
    handlePasswordToggle,
    handleOpenModal,
    handleCloseModal,
  };
};
