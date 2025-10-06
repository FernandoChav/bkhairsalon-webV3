import { UseFormReturn } from 'react-hook-form';
import { HiCurrencyDollar } from 'react-icons/hi';

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

interface ServicePriceProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const ServicePrice: FC<ServicePriceProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">Precio ($)</FormLabel>
          <FormControl>
            <div className="relative">
              <HiCurrencyDollar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="pl-10"
                value={field.value ?? ''}
                onChange={e => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : parseFloat(value));
                }}
                onBlur={field.onBlur}
                name={field.name}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
