import { UseFormReturn } from 'react-hook-form';

import { FC } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn';
import { TimeInput } from '@/components/ui';
import { CreateServiceForm } from '@/models/schemas';

import { useTimeField } from '../hooks';

interface EndTimeFieldProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const EndTimeField: FC<EndTimeFieldProps> = ({ form }) => {
  const { timeToMinutes, handleTimeChange, handleTimeBlur } = useTimeField();

  return (
    <FormField
      control={form.control}
      name="endTime"
      render={({ field }) => {
        // Computed values
        const endTimeValue = timeToMinutes(field.value || '');
        const handleTimeChangeWrapper = (minutes: number) =>
          field.onChange(handleTimeChange(minutes));
        const handleTimeBlurWrapper = handleTimeBlur(field.onBlur);

        return (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Horario de Término
            </FormLabel>
            <FormControl>
              <TimeInput
                value={endTimeValue}
                handleChange={handleTimeChangeWrapper}
                handleBlur={handleTimeBlurWrapper}
                minHour={8}
                maxHour={22}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
