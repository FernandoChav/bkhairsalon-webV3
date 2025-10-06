import { UseFormReturn } from 'react-hook-form';
import { HiTag } from 'react-icons/hi';

import { FC } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn';
import { CategoryResponse } from '@/models/responses';
import { CreateServiceForm } from '@/models/schemas';

interface ServiceCategoryProps {
  form: UseFormReturn<CreateServiceForm>;
  categories: {
    data: CategoryResponse[];
    isLoading: boolean;
    error: unknown;
  };
}

export const ServiceCategory: FC<ServiceCategoryProps> = ({
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
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">
            Categoría del Servicio
          </FormLabel>
          <FormControl>
            <div className="relative">
              <HiTag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isCategoriesDisabled}
              >
                <SelectTrigger className="w-full pl-10">
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
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
