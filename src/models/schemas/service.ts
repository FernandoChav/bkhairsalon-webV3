import { z } from 'zod';

export const createServiceSchema = z
  .object({
    name: z.string().min(1, 'El nombre del servicio es obligatorio'),
    description: z
      .string()
      .min(1, 'La descripción del servicio es obligatoria'),
    duration: z
      .number()
      .min(1, 'La duración del servicio debe ser al menos 1 minuto'),
    price: z.number().min(0, 'El precio del servicio no puede ser negativo'),
    startTime: z
      .string()
      .min(1, 'La hora de inicio es obligatoria')
      .regex(
        /^([0-1]\d|2[0-3]):([0-5]\d)$/,
        'La hora de inicio debe tener el formato HH:mm'
      ),
    endTime: z
      .string()
      .min(1, 'La hora de fin es obligatoria')
      .regex(
        /^([0-1]\d|2[0-3]):([0-5]\d)$/,
        'La hora de fin debe tener el formato HH:mm'
      ),
    commissionPercentage: z
      .number()
      .min(0, 'El porcentaje de comisión no puede ser negativo')
      .max(100, 'El porcentaje de comisión no puede ser mayor a 100'),
    categoryId: z.string().min(1, 'La categoría es obligatoria'),
    discountId: z.string().optional(),
    photos: z.array(z.instanceof(File)).optional(),
  })
  .refine(
    data => {
      const startTime = data.startTime.split(':').map(Number);
      const endTime = data.endTime.split(':').map(Number);
      const startMinutes = startTime[0] * 60 + startTime[1];
      const endMinutes = endTime[0] * 60 + endTime[1];
      return endMinutes > startMinutes;
    },
    {
      message: 'La hora de fin debe ser posterior a la hora de inicio',
      path: ['endTime'],
    }
  );

export type CreateServiceFormData = z.infer<typeof createServiceSchema>;
