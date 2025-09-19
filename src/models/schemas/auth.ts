import { z } from 'zod';

import { isValidChileanPhone } from '@/libs/phone-utils';

export const registerSchema = z
  .object({
    firstName: z.string().min(1, 'El nombre es requerido'),
    lastName: z.string().min(1, 'El apellido es requerido'),
    email: z
      .string()
      .min(1, 'El correo electrónico es requerido')
      .email('Por favor ingresa un correo electrónico válido'),
    phoneNumber: z
      .string()
      .min(1, 'El número de teléfono es requerido')
      .refine(isValidChileanPhone, {
        message:
          'El número de teléfono debe ser un formato chileno válido (+569XXXXXXXX, 569XXXXXXXX o 9XXXXXXXX)',
      }),
    dateOfBirth: z.string().min(1, 'La fecha de nacimiento es requerida'),
    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Debes confirmar tu contraseña'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message:
      'Las contraseñas no coinciden, por favor verifica que sean iguales',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Por favor ingresa un correo electrónico válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});
