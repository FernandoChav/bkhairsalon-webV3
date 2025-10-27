'use client';

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
  value?: number;
  className?: string;
  disabled?: boolean;
  minHour?: number;
  maxHour?: number;
  handleChange?: (minutes: number) => void;
  handleBlur?: () => void;
}

export const TimeInput: FC<TimeInputProps> = ({
  value,
  className = '',
  disabled = false,
  minHour = 8,
  maxHour = 22,
  handleChange,
  handleBlur,
}) => {
  // Derive hours and minutes directly from value prop
  const hours =
    value !== undefined && !isNaN(value) && value >= 0
      ? Math.floor(value / 60)
      : undefined;

  const minutes =
    value !== undefined && !isNaN(value) && value >= 0 ? value % 60 : undefined;

  // Generate options
  const hourOptions = Array.from({ length: maxHour - minHour + 1 }, (_, i) => {
    const hour = minHour + i;
    return {
      value: hour.toString(),
      text: `${hour.toString().padStart(2, '0')}h`,
    };
  });

  const minuteOptions = Array.from({ length: 12 }, (_, i) => {
    const minute = i * 5;
    return {
      value: minute.toString(),
      text: `${minute.toString().padStart(2, '0')}m`,
    };
  });

  // Handlers - Allow partial selection with default values
  const handleHourChange = (newHour: string) => {
    const hour = parseInt(newHour, 10);
    // If minutes not selected yet, default to 0
    const mins = minutes !== undefined ? minutes : 0;
    const newValue = hour * 60 + mins;
    handleChange?.(newValue);
  };

  const handleMinuteChange = (newMinute: string) => {
    const minute = parseInt(newMinute, 10);
    // If hours not selected yet, default to minHour
    const hrs = hours !== undefined ? hours : minHour;
    const newValue = hrs * 60 + minute;
    handleChange?.(newValue);
  };

  // Convert to string for Select component
  const hoursValue = hours !== undefined ? hours.toString() : '';
  const minutesValue = minutes !== undefined ? minutes.toString() : '';

  return (
    <div className={`relative ${className}`}>
      <HiClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
      <div className="flex gap-2 pl-10">
        <Select
          value={hoursValue}
          onValueChange={handleHourChange}
          disabled={disabled}
        >
          <SelectTrigger className="flex-1 h-9" onBlur={handleBlur}>
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
          disabled={disabled}
        >
          <SelectTrigger className="flex-1 h-9" onBlur={handleBlur}>
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
