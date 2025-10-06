import { HiClock } from 'react-icons/hi';

import { FC } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn';

interface TimeInputProps {
  value?: number; // valor en minutos desde medianoche (0 = 00:00, 480 = 08:00, 1320 = 22:00)
  onChange?: (minutes: number) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  minHour?: number; // hora mínima (por defecto 8 = 08:00)
  maxHour?: number; // hora máxima (por defecto 22 = 22:00)
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
  // Convertir minutos a horas y minutos (solo si hay valor)
  const hours = value ? Math.floor(value / 60) : undefined;
  const minutes = value ? value % 60 : undefined;

  // Generar opciones de horas (minHour a maxHour)
  const hourOptions = Array.from(
    { length: maxHour - minHour + 1 },
    (_, i) => minHour + i
  );

  // Generar opciones de minutos (0, 5, 10, ..., 55)
  const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleHourChange = (newHour: string) => {
    const hour = parseInt(newHour, 10);
    const currentMinutes = minutes !== undefined ? minutes : 0;
    const newValue = hour * 60 + currentMinutes;
    onChange?.(newValue);
  };

  const handleMinuteChange = (newMinute: string) => {
    const minute = parseInt(newMinute, 10);
    const currentHours = hours !== undefined ? hours : minHour;
    const newValue = currentHours * 60 + minute;
    onChange?.(newValue);
  };

  return (
    <div className={`relative ${className}`}>
      <HiClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
      <div className="flex gap-2 pl-10">
        <Select
          value={hours !== undefined ? hours.toString() : ''}
          onValueChange={handleHourChange}
          onOpenChange={open => {
            if (!open) {
              onBlur?.();
            }
          }}
          disabled={disabled}
        >
          <SelectTrigger className="flex-1 h-10 sm:h-11">
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
          value={minutes !== undefined ? minutes.toString() : ''}
          onValueChange={handleMinuteChange}
          onOpenChange={open => {
            if (!open) {
              onBlur?.();
            }
          }}
          disabled={disabled}
        >
          <SelectTrigger className="flex-1 h-10 sm:h-11">
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
