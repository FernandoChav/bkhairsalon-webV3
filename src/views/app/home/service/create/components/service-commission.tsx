import { UseFormReturn } from 'react-hook-form';
import { HiCurrencyDollar } from 'react-icons/hi';

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

interface ServiceCommissionProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const ServiceCommission: FC<ServiceCommissionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="commissionPercentage"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">Comisión (%)</FormLabel>
          <FormControl>
            <div className="relative">
              <HiCurrencyDollar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="number"
                min="0"
                max="100"
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
          <FormDescription className="text-xs sm:text-sm">
            Porcentaje de comisión (0-100%)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
