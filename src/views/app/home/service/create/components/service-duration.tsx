import { UseFormReturn } from 'react-hook-form';
import { HiClock } from 'react-icons/hi';

import { FC } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn';
import { CreateServiceForm } from '@/models/schemas';

interface ServiceDurationProps {
  form: UseFormReturn<CreateServiceForm>;
  durationOptions: number[];
}

export const ServiceDuration: FC<ServiceDurationProps> = ({
  form,
  durationOptions,
}) => {
  // Computed values para formateo de duración
  const formatDuration = (minutes: number): string => {
    if (minutes === 0) return '0 minutos';
    if (minutes < 60) return `${minutes} minutos`;
    if (minutes === 60) return '1 hora';

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  };

  return (
    <FormField
      control={form.control}
      name="duration"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">Duración</FormLabel>
          <FormControl>
            <div className="relative">
              <HiClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
              <Select
                value={field.value ? field.value.toString() : ''}
                onValueChange={value => {
                  const duration = parseInt(value, 10);
                  field.onChange(duration);
                }}
                onOpenChange={open => {
                  if (!open && !field.value) {
                    field.onBlur();
                  }
                }}
              >
                <SelectTrigger className="w-full pl-10">
                  <SelectValue placeholder="Selecciona duración" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map(minutes => (
                    <SelectItem key={minutes} value={minutes.toString()}>
                      {formatDuration(minutes)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
