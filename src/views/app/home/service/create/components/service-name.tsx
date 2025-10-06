import { UseFormReturn } from 'react-hook-form';
import { HiTag } from 'react-icons/hi';

import { FC } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/shadcn';
import { CreateServiceForm } from '@/models/schemas';

interface ServiceNameProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const ServiceName: FC<ServiceNameProps> = ({ form }) => {
  return (
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
  );
};
