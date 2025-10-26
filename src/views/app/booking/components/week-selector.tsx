'use client';

import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  startOfToday,
  startOfWeek,
  subDays,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useState } from 'react';

// Importa tu utilidad 'cn' de shadcn
import { Button } from '@/components/shadcn';
import { cn } from '@/libs';

// Importar 'locale' en español

interface WeekSelectorProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  const [displayDate, setDisplayDate] = useState(selectedDate ?? new Date());
  const today = startOfToday();

  // (Lógica de fechas y navegación sin cambios)
  const weekStart = startOfWeek(displayDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(displayDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const goToPreviousWeek = () => {
    setDisplayDate(subDays(displayDate, 7));
  };

  const goToNextWeek = () => {
    setDisplayDate(addDays(displayDate, 7));
  };

  const formattedDateRange = `${format(weekStart, 'd MMMM', {
    locale: es,
  })} - ${format(weekEnd, 'd MMMM yyyy', { locale: es })}`;

  return (
    <div className="w-full font-sans border rounded-md p-4">
      {/* --- Cabecera: Título y Navegación (Sin cambios) --- */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousWeek}
          disabled={isBefore(weekStart, today)}
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

      {/* --- Grilla de Días --- */}
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
          const isDaySelected = selectedDate
            ? isSameDay(day, selectedDate)
            : false;
          const isDayPast = isBefore(day, today);

          return (
            <button
              key={day.toString()}
              type="button"
              onClick={() => onDateSelect(day)}
              disabled={isDayPast}
              // --- CAMBIO AQUÍ ---
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-md transition-colors border', // 1. Añadimos 'border' base
                'h-16 w-full text-xs font-medium',
                !isDayPast && 'hover:bg-accent hover:text-accent-foreground',
                isDaySelected
                  ? 'border-primary text-primary' // 2. Estilo seleccionado (Outline)
                  : 'border-transparent', // 3. Estilo no-seleccionado (Transparente)
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
