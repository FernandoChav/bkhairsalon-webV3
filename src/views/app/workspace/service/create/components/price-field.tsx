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

import { useNumberField } from '../hooks';

interface PriceFieldProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const PriceField: FC<PriceFieldProps> = ({ form }) => {
  const { displayValue, handleNumberChange } = useNumberField();

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
                value={displayValue(field.value)}
                onChange={e =>
                  field.onChange(handleNumberChange(e.target.value))
                }
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
