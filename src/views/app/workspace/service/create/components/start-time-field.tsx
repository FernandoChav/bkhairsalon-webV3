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

interface StartTimeFieldProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const StartTimeField: FC<StartTimeFieldProps> = ({ form }) => {
  const { timeToMinutes, handleTimeChange, handleTimeBlur } = useTimeField();

  return (
    <FormField
      control={form.control}
      name="startTime"
      render={({ field }) => {
        // Computed values
        const startTimeValue = timeToMinutes(field.value || '');
        const handleTimeChangeWrapper = (minutes: number) =>
          field.onChange(handleTimeChange(minutes));
        const handleTimeBlurWrapper = handleTimeBlur(field.onBlur);

        return (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Horario de Inicio
            </FormLabel>
            <FormControl>
              <TimeInput
                value={startTimeValue}
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
