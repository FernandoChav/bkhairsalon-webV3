import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre de la categoría es requerido'),
  description: z.string().min(1, 'La descripción de la categoría es requerida'),
  parentCategoryId: z.string().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, 'El nombre de la categoría es requerido'),
  description: z.string().min(1, 'La descripción de la categoría es requerida'),
});

export type CreateCategoryForm = z.infer<typeof createCategorySchema>;
export type UpdateCategoryForm = z.infer<typeof updateCategorySchema>;
