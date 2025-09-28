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
import { CreateServiceFormData } from '@/models/schemas';

interface ServiceDetailsProps {
  form: UseFormReturn<CreateServiceFormData>;
  validation: {
    durationOptions: number[];
    errors: FieldErrors<CreateServiceFormData>;
  };
}

export const ServiceDetails: FC<ServiceDetailsProps> = ({
  form,
  validation,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 items-start">
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Duración (minutos)
              </FormLabel>
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
                    <SelectTrigger className="pl-10 !h-10 w-full">
                      <SelectValue placeholder="Selecciona duración" />
                    </SelectTrigger>
                    <SelectContent>
                      {validation.durationOptions.map(minutes => (
                        <SelectItem key={minutes} value={minutes.toString()}>
                          {minutes === 0
                            ? '0 minutos'
                            : minutes < 60
                              ? `${minutes} minutos`
                              : minutes === 60
                                ? '1 hora'
                                : `${Math.floor(minutes / 60)}h ${minutes % 60}m`}
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
                    placeholder="Precio del servicio"
                    className="pl-10 h-10"
                    {...field}
                    onChange={e => {
                      const value = e.target.value;
                      field.onChange(
                        value === '' ? undefined : parseFloat(value)
                      );
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Horario de Inicio
              </FormLabel>
              <FormControl>
                <TimeInput
                  value={
                    field.value
                      ? parseInt(field.value.split(':')[0]) * 60 +
                        parseInt(field.value.split(':')[1])
                      : undefined
                  }
                  onChange={minutes => {
                    const hours = Math.floor(minutes / 60);
                    const mins = minutes % 60;
                    const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
                    field.onChange(timeString);
                  }}
                  minHour={8}
                  maxHour={22}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Horario de Término
              </FormLabel>
              <FormControl>
                <TimeInput
                  value={
                    field.value
                      ? parseInt(field.value.split(':')[0]) * 60 +
                        parseInt(field.value.split(':')[1])
                      : undefined
                  }
                  onChange={minutes => {
                    const hours = Math.floor(minutes / 60);
                    const mins = minutes % 60;
                    const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
                    field.onChange(timeString);
                  }}
                  minHour={8}
                  maxHour={22}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="commissionPercentage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Porcentaje de Comisión
            </FormLabel>
            <FormControl>
              <div className="relative">
                <HiCurrencyDollar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="Porcentaje de comisión"
                  className="pl-10 h-10"
                  {...field}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(
                      value === '' ? undefined : parseFloat(value)
                    );
                  }}
                />
              </div>
            </FormControl>
            <FormDescription>
              Porcentaje de comisión que se aplicará a este servicio (0-100%)
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
              ID de Descuento (Opcional)
            </FormLabel>
            <FormControl>
              <div className="relative">
                <HiTag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="ID de descuento (opcional)"
                  className="pl-10 h-10"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>
              ID del descuento asociado a este servicio (opcional)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
