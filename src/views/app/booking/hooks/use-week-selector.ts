'use client';

import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  isBefore,
  startOfToday,
  startOfWeek,
  subDays,
} from 'date-fns';
import { es } from 'date-fns/locale';

import { useState } from 'react';

interface UseWeekSelectorProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export const useWeekSelector = ({ selectedDate }: UseWeekSelectorProps) => {
  const [displayDate, setDisplayDate] = useState(selectedDate ?? new Date());
  const today = startOfToday();

  // Calculate week dates
  const weekStart = startOfWeek(displayDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(displayDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Navigation functions
  const goToPreviousWeek = () => {
    const newDate = subDays(displayDate, 7);
    setDisplayDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = addDays(displayDate, 7);
    setDisplayDate(newDate);
  };

  // Check if previous week navigation should be disabled
  const isPreviousWeekDisabled = isBefore(weekStart, today);

  // Format date range for display
  const formattedDateRange = `${format(weekStart, 'd MMMM', {
    locale: es,
  })} - ${format(weekEnd, 'd MMMM yyyy', { locale: es })}`;

  return {
    displayDate,
    days,
    today,
    formattedDateRange,
    isPreviousWeekDisabled,
    goToPreviousWeek,
    goToNextWeek,
    setDisplayDate,
  };
};
