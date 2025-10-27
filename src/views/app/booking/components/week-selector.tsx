'use client';

import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/shadcn';
import { cn } from '@/libs';

import { useWeekSelector } from '../hooks';

interface WeekSelectorProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  const {
    days,
    today,
    formattedDateRange,
    isPreviousWeekDisabled,
    goToPreviousWeek,
    goToNextWeek,
  } = useWeekSelector({
    selectedDate,
    onDateSelect,
  });

  return (
    <div className="w-full font-sans border rounded-md p-4">
      {/* Header: Title and Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousWeek}
          disabled={isPreviousWeekDisabled}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-semibold text-center">
          {formattedDateRange}
        </div>
        <Button variant="outline" size="icon" onClick={goToNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
          const isDaySelected = selectedDate
            ? isSameDay(day, selectedDate)
            : false;
          const isDayPast = day < today;

          return (
            <button
              key={day.toString()}
              type="button"
              onClick={() => onDateSelect(day)}
              disabled={isDayPast}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-md transition-colors border h-16 w-full text-xs font-medium',
                !isDayPast && 'hover:bg-accent hover:text-accent-foreground',
                isDaySelected
                  ? 'border-primary text-primary'
                  : 'border-transparent',
                isDayPast
                  ? 'text-muted-foreground opacity-50 cursor-not-allowed'
                  : 'text-foreground'
              )}
            >
              <span className="text-xs capitalize">
                {format(day, 'E', { locale: es })}
              </span>
              <span className="text-lg font-bold mt-1">{format(day, 'd')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
