import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(1, 'El nombre del servicio es requerido'),
  description: z.string().min(1, 'La descripción del servicio es requerida'),
  duration: z
    .number({ message: 'La duración es requerida' })
    .min(5, 'La duración del servicio debe ser al menos 5 minutos'),
  price: z
    .number({ message: 'El precio es requerido' })
    .min(0, 'El precio del servicio no puede ser negativo'),
  startTime: z
    .string()
    .min(1, 'La hora de inicio es requerida')
    .regex(
      /^([0-1]\d|2[0-3]):([0-5]\d)$/,
      'La hora de inicio debe tener el formato HH:mm'
    ),
  endTime: z
    .string()
    .min(1, 'La hora de fin es requerida')
    .regex(
      /^([0-1]\d|2[0-3]):([0-5]\d)$/,
      'La hora de fin debe tener el formato HH:mm'
    ),
  commissionPercentage: z
    .number({ message: 'El porcentaje de comisión es requerido' })
    .min(0, 'El porcentaje de comisión no puede ser negativo')
    .max(100, 'El porcentaje de comisión no puede ser mayor a 100'),
  categoryId: z.string().min(1, 'La categoría es requerida'),
  discountId: z.string().optional(),
  photos: z.array(z.instanceof(File)).optional(),
});

export const updateServiceSchema = z.object({
  name: z.string().min(1, 'El nombre del servicio es requerido'),
  description: z.string().min(1, 'La descripción del servicio es requerida'),
  duration: z
    .number({ message: 'La duración es requerida' })
    .min(5, 'La duración del servicio debe ser al menos 5 minutos'),
  price: z
    .number({ message: 'El precio es requerido' })
    .min(0, 'El precio del servicio no puede ser negativo'),
  startTime: z
    .string()
    .min(1, 'La hora de inicio es requerida')
    .regex(
      /^([0-1]\d|2[0-3]):([0-5]\d)$/,
      'La hora de inicio debe tener el formato HH:mm'
    ),
  endTime: z
    .string()
    .min(1, 'La hora de fin es requerida')
    .regex(
      /^([0-1]\d|2[0-3]):([0-5]\d)$/,
      'La hora de fin debe tener el formato HH:mm'
    ),
  commissionPercentage: z
    .union([
      z
        .number()
        .min(0, 'El porcentaje de comisión no puede ser negativo')
        .max(100, 'El porcentaje de comisión no puede ser mayor a 100'),
      z.literal(''),
    ])
    .refine(val => val !== '', {
      message: 'El porcentaje de comisión es requerido',
    }),
  discountId: z.string().optional(),
  keepPhotoIds: z.array(z.string()).optional(),
  deletePhotoIds: z.array(z.string()).optional(),
  newPhotos: z.array(z.instanceof(File)).optional(),
});

export type CreateServiceForm = z.infer<typeof createServiceSchema>;
export type UpdateServiceForm = z.infer<typeof updateServiceSchema>;
