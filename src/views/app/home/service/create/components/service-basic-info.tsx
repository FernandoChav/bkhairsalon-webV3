import { UseFormReturn } from 'react-hook-form';
import { HiDocumentText, HiTag } from 'react-icons/hi';

import { FC } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/shadcn';
import { CategoryResponse } from '@/models/responses';
import { CreateServiceForm } from '@/models/schemas';

interface ServiceBasicInfoProps {
  form: UseFormReturn<CreateServiceForm>;
  categories: {
    data: CategoryResponse[];
    isLoading: boolean;
    error: unknown;
  };
}

export const ServiceBasicInfo: FC<ServiceBasicInfoProps> = ({
  form,
  categories,
}) => {
  // Computed values
  const isCategoriesLoading = categories.isLoading;
  const hasCategoriesError = !!categories.error;
  const hasCategories = categories.data.length > 0;
  const isCategoriesDisabled = isCategoriesLoading;

  const selectPlaceholder = isCategoriesLoading
    ? 'Cargando categorías...'
    : hasCategoriesError
      ? 'Error al cargar categorías'
      : !hasCategories
        ? 'No hay categorías disponibles'
        : 'Selecciona una categoría';

  return (
    <div className="space-y-4 sm:space-y-5">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Nombre del Servicio
            </FormLabel>
            <FormControl>
              <div className="relative">
                <HiTag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Ej: Corte y peinado"
                  className="pl-10"
                  autoComplete="off"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Descripción</FormLabel>
            <FormControl>
              <div className="relative">
                <HiDocumentText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  placeholder="Describe los detalles del servicio..."
                  className="pl-10 resize-none"
                  rows={2}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Categoría</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isCategoriesDisabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={selectPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {hasCategories ? (
                    categories.data.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        <span className="text-sm">{category.fullPath}</span>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                      No hay categorías disponibles
                    </div>
                  )}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
