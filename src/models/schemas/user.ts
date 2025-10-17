import { z } from 'zod';

import { isValidChileanPhone } from '@/libs';

export const editUserFormSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  phoneNumber: z
    .string()
    .min(1, 'El número de teléfono es requerido')
    .refine(isValidChileanPhone, {
      message:
        'El número de teléfono debe ser un formato chileno válido (+569XXXXXXXX, 569XXXXXXXX o 9XXXXXXXX)',
    }),
  dateOfBirth: z.string().min(1, 'La fecha de nacimiento es requerida'),
});

export type EditUserForm = z.infer<typeof editUserFormSchema>;
