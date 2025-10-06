import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { HiClock, HiCurrencyDollar, HiTag } from 'react-icons/hi';

import { FC } from 'react';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn';
import { TimeInput } from '@/components/ui';
import { CreateServiceForm } from '@/models/schemas';

interface ServiceDetailsProps {
  form: UseFormReturn<CreateServiceForm>;
  validation: {
    durationOptions: number[];
    errors: FieldErrors<CreateServiceForm>;
  };
}

export const ServiceDetails: FC<ServiceDetailsProps> = ({
  form,
  validation,
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
    <div className="space-y-4 sm:space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
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
                      {validation.durationOptions.map(minutes => (
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
                      field.onChange(
                        value === '' ? undefined : parseFloat(value)
                      );
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
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

            return (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Horario de Inicio
                </FormLabel>
                <FormControl>
                  <TimeInput
                    value={startTimeValue}
                    onChange={handleTimeChange}
                    minHour={8}
                    maxHour={22}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

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

            return (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Horario de Término
                </FormLabel>
                <FormControl>
                  <TimeInput
                    value={endTimeValue}
                    onChange={handleTimeChange}
                    minHour={8}
                    maxHour={22}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

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
                    field.onChange(
                      value === '' ? undefined : parseFloat(value)
                    );
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

      <FormField
        control={form.control}
        name="discountId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Descuento (Opcional)
            </FormLabel>
            <FormControl>
              <div className="relative">
                <HiTag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="ID de descuento"
                  className="pl-10"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription className="text-xs sm:text-sm">
              ID del descuento asociado (opcional)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
