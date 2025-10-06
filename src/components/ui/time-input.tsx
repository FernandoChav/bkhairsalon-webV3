import { HiClock } from 'react-icons/hi';

import { FC, useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn';

interface TimeInputProps {
  value?: number;
  onChange?: (minutes: number) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  minHour?: number;
  maxHour?: number;
}

export const TimeInput: FC<TimeInputProps> = ({
  value,
  onChange,
  onBlur,
  className = '',
  disabled = false,
  minHour = 8,
  maxHour = 22,
}) => {
  // Estado interno para mantener los valores seleccionados
  const [internalHours, setInternalHours] = useState<number | undefined>(
    undefined
  );
  const [internalMinutes, setInternalMinutes] = useState<number | undefined>(
    undefined
  );

  // Estado para rastrear si el usuario ha interactuado con cada select
  const [hasInteractedWithHours, setHasInteractedWithHours] = useState(false);
  const [hasInteractedWithMinutes, setHasInteractedWithMinutes] =
    useState(false);

  // Sincronizar estado interno con el valor externo
  useEffect(() => {
    if (value !== undefined) {
      setInternalHours(Math.floor(value / 60));
      setInternalMinutes(value % 60);
    } else {
      setInternalHours(undefined);
      setInternalMinutes(undefined);
    }
  }, [value]);

  // Generar opciones de horas (minHour a maxHour)
  const hourOptions = Array.from(
    { length: maxHour - minHour + 1 },
    (_, i) => minHour + i
  );

  // Generar opciones de minutos (0, 5, 10, ..., 55)
  const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleHourChange = (newHour: string) => {
    const hour = parseInt(newHour, 10);
    setInternalHours(hour);
    setHasInteractedWithHours(true);

    // Solo enviar el valor completo si también hay minutos seleccionados
    if (internalMinutes !== undefined) {
      const newValue = hour * 60 + internalMinutes;
      onChange?.(newValue);
    }
  };

  const handleMinuteChange = (newMinute: string) => {
    const minute = parseInt(newMinute, 10);
    setInternalMinutes(minute);
    setHasInteractedWithMinutes(true);

    // Solo enviar el valor completo si también hay horas seleccionadas
    if (internalHours !== undefined) {
      const newValue = internalHours * 60 + minute;
      onChange?.(newValue);
    }
  };

  const handleHourBlur = () => {
    setHasInteractedWithHours(true);
    // Disparar validación si el usuario ha interactuado con minutos o si no hay valor completo
    if (hasInteractedWithMinutes || value === undefined) {
      onBlur?.();
    }
  };

  const handleMinuteBlur = () => {
    setHasInteractedWithMinutes(true);
    // Disparar validación si el usuario ha interactuado con horas o si no hay valor completo
    if (hasInteractedWithHours || value === undefined) {
      onBlur?.();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <HiClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
      <div className="flex gap-2 pl-10">
        <Select
          value={internalHours !== undefined ? internalHours.toString() : ''}
          onValueChange={handleHourChange}
          onOpenChange={open => {
            if (!open) {
              handleHourBlur();
            }
          }}
          disabled={disabled}
        >
          <SelectTrigger className="flex-1 h-9">
            <SelectValue placeholder="Horas" />
          </SelectTrigger>
          <SelectContent>
            {hourOptions.map(hour => (
              <SelectItem key={hour} value={hour.toString()}>
                {hour.toString().padStart(2, '0')}h
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={
            internalMinutes !== undefined ? internalMinutes.toString() : ''
          }
          onValueChange={handleMinuteChange}
          onOpenChange={open => {
            if (!open) {
              handleMinuteBlur();
            }
          }}
          disabled={disabled}
        >
          <SelectTrigger className="flex-1 h-9">
            <SelectValue placeholder="Minutos" />
          </SelectTrigger>
          <SelectContent>
            {minuteOptions.map(minute => (
              <SelectItem key={minute} value={minute.toString()}>
                {minute.toString().padStart(2, '0')}m
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
