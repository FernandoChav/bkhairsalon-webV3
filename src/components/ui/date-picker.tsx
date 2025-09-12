'use client';

import { es } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

import { Ref, useState } from 'react';

import {
  Button,
  Calendar as CalendarComponent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn';
import {
  cn,
  formatDateForDisplay,
  formatDateToString,
  generateMonths,
  generateYears,
  getMinDateString,
  parseDateString,
} from '@/libs';

interface DatePickerProps {
  value?: string; // Cambiar a string para manejar formato YYYY-MM-DD
  onChange?: (date: string | undefined) => void; // Cambiar a string
  onBlur?: () => void;
  name?: string; // Para compatibilidad con React Hook Form
  ref?: Ref<HTMLButtonElement>; // Para compatibilidad con React Hook Form
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const DatePicker = ({
  value,
  onChange,
  onBlur,
  name,
  ref,
  placeholder = 'Seleccionar fecha',
  disabled = false,
  className,
}: DatePickerProps) => {
  // Helper functions for date formatting (now using date-utils)
  const parseStringToDate = parseDateString;

  const [currentMonth, setCurrentMonth] = useState(
    parseStringToDate(value || '') || new Date()
  );
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth();

  // Generate years and months using date-utils
  const years = generateYears();
  const months = generateMonths();

  const handleYearChange = (year: string) => {
    const newDate = new Date(parseInt(year), currentMonthIndex, 1);
    setCurrentMonth(newDate);
  };

  const handleMonthChange = (month: string) => {
    const monthIndex = months.indexOf(month);
    const newDate = new Date(currentYear, monthIndex, 1);
    setCurrentMonth(newDate);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = formatDateToString(date);
      onChange?.(formattedDate);
      setIsOpen(false);
      setHasBeenOpened(false); // Reset flag when date is selected
    } else {
      onChange?.(undefined);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open) {
      setHasBeenOpened(true);
    } else if (!open) {
      // Si se cerró y había sido abierto, disparar validación si no hay valor
      const parsedValue = parseStringToDate(value || '');
      if (hasBeenOpened && !parsedValue) {
        onBlur?.();
      }
      setHasBeenOpened(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
          name={name}
          ref={ref}
          onBlur={() => {
            // Solo disparar onBlur si no se está abriendo el picker
            if (!isOpen) {
              onBlur?.();
            }
          }}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {parseStringToDate(value || '')
            ? formatDateForDisplay(value || '')
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Select
              value={months[currentMonthIndex]}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={index} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={currentYear.toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-[90px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newDate = new Date(currentYear, currentMonthIndex - 1, 1);
                setCurrentMonth(newDate);
              }}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newDate = new Date(currentYear, currentMonthIndex + 1, 1);
                setCurrentMonth(newDate);
              }}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CalendarComponent
          mode="single"
          selected={parseStringToDate(value || '')}
          onSelect={handleDateSelect}
          disabled={date =>
            date > new Date() || date < new Date(getMinDateString())
          }
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          locale={es}
          formatters={{
            formatCaption: date => {
              const month = date.toLocaleDateString('es-ES', { month: 'long' });
              const year = date.getFullYear();
              return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
            },
            formatWeekdayName: date => {
              return date.toLocaleDateString('es-ES', { weekday: 'short' });
            },
            formatMonthDropdown: date => {
              const month = date.toLocaleDateString('es-ES', { month: 'long' });
              return month.charAt(0).toUpperCase() + month.slice(1);
            },
            formatYearDropdown: date => {
              return date.getFullYear().toString();
            },
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
