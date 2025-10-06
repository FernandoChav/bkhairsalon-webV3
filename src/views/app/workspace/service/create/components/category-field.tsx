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

import { useCategoryField } from '../hooks';

interface CategoryFieldProps {
  form: UseFormReturn<CreateServiceForm>;
  categories: {
    data: CategoryResponse[];
    isLoading: boolean;
    error: unknown;
  };
}

export const CategoryField: FC<CategoryFieldProps> = ({ form, categories }) => {
  const {
    hasCategories,
    isCategoriesDisabled,
    selectPlaceholder,
    categoryOptions,
    handleOpenChange,
  } = useCategoryField({ categories });

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
                onOpenChange={open =>
                  handleOpenChange(open, field.value, field.onBlur)
                }
                disabled={isCategoriesDisabled}
              >
                <SelectTrigger className="w-full pl-10" onBlur={field.onBlur}>
                  <SelectValue placeholder={selectPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {hasCategories ? (
                    categoryOptions.map(category => (
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
