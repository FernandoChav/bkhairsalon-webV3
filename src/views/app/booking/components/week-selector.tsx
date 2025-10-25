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
  selectedDate: Date | undefined; // <-- CAMBIO 1: Aceptar undefined
  onDateSelect: (date: Date | undefined) => void; // <-- CAMBIO 2: Aceptar undefined
}
export const WeekSelector: React.FC<WeekSelectorProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  // El 'displayDate' es el día que controla qué semana estamos viendo
  const [displayDate, setDisplayDate] = useState(selectedDate ?? new Date());
  const today = startOfToday();

  // 1. Generar los 7 días de la semana
  const weekStart = startOfWeek(displayDate, { weekStartsOn: 1 }); // Lunes
  const weekEnd = endOfWeek(displayDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // 2. Funciones de navegación
  const goToPreviousWeek = () => {
    setDisplayDate(subDays(displayDate, 7));
  };

  const goToNextWeek = () => {
    setDisplayDate(addDays(displayDate, 7));
  };

  // 3. Formatear el título del rango
  const formattedDateRange = `${format(weekStart, 'd MMMM', {
    locale: es,
  })} - ${format(weekEnd, 'd MMMM yyyy', { locale: es })}`;

  return (
    <div className="w-full font-sans border rounded-md p-4">
      {/* --- Cabecera: Título y Navegación --- */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousWeek}
          // Deshabilitar si la semana que se va a mostrar es pasada
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
          // CAMBIO 4: Comprobar que selectedDate exista antes de comparar
          const isDaySelected = selectedDate
            ? isSameDay(day, selectedDate)
            : false;

          const isDayPast = isBefore(day, today);

          return (
            <button
              key={day.toString()}
              type="button"
              onClick={() => onDateSelect(day)} // <-- Pasa el 'day' (Date)
              disabled={isDayPast}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-md transition-colors',
                'h-16 w-full text-xs font-medium',
                !isDayPast && 'hover:bg-accent hover:text-accent-foreground',
                isDaySelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent',
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
