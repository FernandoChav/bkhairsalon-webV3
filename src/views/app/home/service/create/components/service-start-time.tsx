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

interface ServiceStartTimeProps {
  form: UseFormReturn<CreateServiceForm>;
}

export const ServiceStartTime: FC<ServiceStartTimeProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="startTime"
      render={({ field }) => {
        // Computed values
        const startTimeValue = field.value
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
              Horario de Inicio
            </FormLabel>
            <FormControl>
              <TimeInput
                value={startTimeValue}
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
