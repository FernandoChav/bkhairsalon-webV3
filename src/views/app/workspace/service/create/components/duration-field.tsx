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

import { useDurationField } from '../hooks';

interface DurationFieldProps {
  form: UseFormReturn<CreateServiceForm>;
  durationOptions: number[];
}

export const DurationField: FC<DurationFieldProps> = ({
  form,
  durationOptions,
}) => {
  const {
    formatDuration,
    getSelectValue,
    handleValueChange,
    handleOpenChange,
  } = useDurationField();

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
                value={getSelectValue(field.value)}
                onValueChange={value =>
                  field.onChange(handleValueChange(value))
                }
                onOpenChange={open =>
                  handleOpenChange(open, field.value, field.onBlur)
                }
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
