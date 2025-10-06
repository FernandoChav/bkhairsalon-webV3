'use client';

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
  // Valores (estado, datos, computed values)
  value?: number;
  className?: string;
  disabled?: boolean;
  minHour?: number;
  maxHour?: number;

  // Handlers (funciones de manejo de eventos)
  handleChange?: (minutes: number) => void;
  handleBlur?: () => void;
}

export const TimeInput: FC<TimeInputProps> = ({
  // Valores primero
  value,
  className = '',
  disabled = false,
  minHour = 8,
  maxHour = 22,
  // Handlers después
  handleChange,
  handleBlur,
}) => {
  // Estado
  const [internalHours, setInternalHours] = useState<number | undefined>(
    undefined
  );
  const [internalMinutes, setInternalMinutes] = useState<number | undefined>(
    undefined
  );
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

  // Funciones utilitarias
  const generateHourOptions = () => {
    return Array.from({ length: maxHour - minHour + 1 }, (_, i) => {
      const hour = minHour + i;
      return {
        value: hour.toString(),
        text: `${hour.toString().padStart(2, '0')}h`,
      };
    });
  };

  const generateMinuteOptions = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const minute = i * 5;
      return {
        value: minute.toString(),
        text: `${minute.toString().padStart(2, '0')}m`,
      };
    });
  };

  // Handlers
  const handleHourChange = (newHour: string) => {
    const hour = parseInt(newHour, 10);
    setInternalHours(hour);
    setHasInteractedWithHours(true);

    // Solo enviar el valor completo si también hay minutos seleccionados
    if (internalMinutes !== undefined) {
      const newValue = hour * 60 + internalMinutes;
      handleChange?.(newValue);
    }
  };

  const handleMinuteChange = (newMinute: string) => {
    const minute = parseInt(newMinute, 10);
    setInternalMinutes(minute);
    setHasInteractedWithMinutes(true);

    // Solo enviar el valor completo si también hay horas seleccionadas
    if (internalHours !== undefined) {
      const newValue = internalHours * 60 + minute;
      handleChange?.(newValue);
    }
  };

  const handleHourBlur = () => {
    setHasInteractedWithHours(true);
    // Disparar validación si el usuario ha interactuado con minutos o si no hay valor completo
    if (hasInteractedWithMinutes || value === undefined) {
      handleBlur?.();
    }
  };

  const handleMinuteBlur = () => {
    setHasInteractedWithMinutes(true);
    // Disparar validación si el usuario ha interactuado con horas o si no hay valor completo
    if (hasInteractedWithHours || value === undefined) {
      handleBlur?.();
    }
  };

  const handleHourOpenChange = (open: boolean) => {
    if (!open) {
      handleHourBlur();
    }
  };

  const handleMinuteOpenChange = (open: boolean) => {
    if (!open) {
      handleMinuteBlur();
    }
  };

  // Computed values
  const hourOptions = generateHourOptions();
  const minuteOptions = generateMinuteOptions();
  const containerClassName = `relative ${className}`;
  const hoursValue =
    internalHours !== undefined ? internalHours.toString() : '';
  const minutesValue =
    internalMinutes !== undefined ? internalMinutes.toString() : '';

  return (
    <div className={containerClassName}>
      <HiClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
      <div className="flex gap-2 pl-10">
        <Select
          value={hoursValue}
          onValueChange={handleHourChange}
          onOpenChange={handleHourOpenChange}
          disabled={disabled}
        >
          <SelectTrigger className="flex-1 h-9">
            <SelectValue placeholder="Horas" />
          </SelectTrigger>
          <SelectContent>
            {hourOptions.map(hour => (
              <SelectItem key={hour.value} value={hour.value}>
                {hour.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={minutesValue}
          onValueChange={handleMinuteChange}
          onOpenChange={handleMinuteOpenChange}
          disabled={disabled}
        >
          <SelectTrigger className="flex-1 h-9">
            <SelectValue placeholder="Minutos" />
          </SelectTrigger>
          <SelectContent>
            {minuteOptions.map(minute => (
              <SelectItem key={minute.value} value={minute.value}>
                {minute.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
