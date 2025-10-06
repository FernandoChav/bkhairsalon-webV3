import { UseFormReturn } from 'react-hook-form';
import { HiDocumentText } from 'react-icons/hi';

import { FC } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/components/shadcn';
import { CreateServiceForm } from '@/models/schemas';

interface ServiceDescriptionProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const ServiceDescription: FC<ServiceDescriptionProps> = ({ form }) => {
  return (
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
                rows={3}
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
