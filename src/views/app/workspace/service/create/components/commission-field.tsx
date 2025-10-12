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

import { useNumberField } from '../hooks';

interface CommissionFieldProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const CommissionField: FC<CommissionFieldProps> = ({ form }) => {
  const { displayValue, handleNumberChange } = useNumberField();

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
                value={displayValue(field.value)}
                onChange={e =>
                  field.onChange(handleNumberChange(e.target.value))
                }
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
