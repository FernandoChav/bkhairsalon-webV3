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
import { CreateServiceFormData } from '@/models/schemas';

interface ServiceBasicInfoProps {
  form: UseFormReturn<CreateServiceFormData>;
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
  return (
    <div className="space-y-4">
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
                  placeholder="Nombre del servicio"
                  className="pl-10 h-10"
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
                  placeholder="Descripción del servicio"
                  className="pl-10 min-h-[40px]"
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
                disabled={categories.isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      categories.isLoading
                        ? 'Cargando categorías...'
                        : categories.error
                          ? 'Error al cargar categorías'
                          : categories.data.length === 0
                            ? 'No hay categorías disponibles'
                            : 'Selecciona una categoría'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.data.length > 0 ? (
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
