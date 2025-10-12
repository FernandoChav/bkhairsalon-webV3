import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre de la categoría es requerido'),
  description: z.string().optional(),
  parentCategoryId: z.string().optional(),
});

export type CreateCategoryForm = z.infer<typeof createCategorySchema>;
