import { UseFormReturn } from 'react-hook-form';
import { HiTag } from 'react-icons/hi';

import { FC } from 'react';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/shadcn';
import { CreateServiceForm } from '@/models/schemas';

interface ServiceDiscountProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const ServiceDiscount: FC<ServiceDiscountProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="discountId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-muted-foreground">
            Descuento (Opcional)
          </FormLabel>
          <FormControl>
            <div className="relative">
              <HiTag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="ID de descuento"
                className="pl-10 border-dashed"
                {...field}
              />
            </div>
          </FormControl>
          <FormDescription className="text-xs sm:text-sm text-muted-foreground">
            ID del descuento asociado (opcional)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
