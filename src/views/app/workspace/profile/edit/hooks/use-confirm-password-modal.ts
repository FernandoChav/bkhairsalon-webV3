import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useState } from 'react';

import { type PasswordForm, passwordSchema } from '@/models/schemas';

export const useConfirmPasswordModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' },
    mode: 'onTouched',
  });

  // Handlers
  const handlePasswordToggle = () => {
    setShowPassword(prev => !prev);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    form.reset();
  };

  return {
    showModal,
    showPassword,
    form,
    handlePasswordToggle,
    handleOpenModal,
    handleCloseModal,
  };
};
