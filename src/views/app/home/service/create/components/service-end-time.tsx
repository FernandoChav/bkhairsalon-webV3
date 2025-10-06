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

interface ServiceEndTimeProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const ServiceEndTime: FC<ServiceEndTimeProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="endTime"
      render={({ field }) => {
        // Computed values
        const endTimeValue = field.value
          ? parseInt(field.value.split(':')[0]) * 60 +
            parseInt(field.value.split(':')[1])
          : undefined;

        const handleTimeChange = (minutes: number) => {
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
          field.onChange(timeString);
        };

        const handleTimeBlur = () => {
          // Siempre disparar validación cuando el TimeInput lo solicite
          field.onBlur();
        };

        return (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Horario de Término
            </FormLabel>
            <FormControl>
              <TimeInput
                value={endTimeValue}
                onChange={handleTimeChange}
                onBlur={handleTimeBlur}
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
