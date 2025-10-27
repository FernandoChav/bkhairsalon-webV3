'use client';

import { useMemo } from 'react';

import type { FormatMinutesOptions } from '@/models/helpers';

export const useFormatMinutes = (options: FormatMinutesOptions = {}) => {
  const { hourUnit = 'hr', minuteUnit = 'min' } = options;

  const formatMinutes = useMemo(() => {
    return (minutes: number | null): string => {
      // Handle null case
      if (minutes === null) {
        return `0${minuteUnit}`;
      }

      if (minutes < 0) {
        throw new Error('Minutes cannot be negative');
      }

      if (minutes === 0) {
        return `0${minuteUnit}`;
      }

      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      if (hours === 0) {
        return `${remainingMinutes}${minuteUnit}`;
      }

      if (remainingMinutes === 0) {
        return `${hours}${hourUnit}`;
      }

      return `${hours}${hourUnit} ${remainingMinutes}${minuteUnit}`;
    };
  }, [hourUnit, minuteUnit]);

  return formatMinutes;
};
