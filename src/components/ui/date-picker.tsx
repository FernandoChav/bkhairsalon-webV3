'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

import { useState } from 'react';

import { Button } from '@/components/shadcn/button';
import { Calendar as CalendarComponent } from '@/components/shadcn/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { cn } from '@/libs';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  disabled = false,
  className,
}: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [isOpen, setIsOpen] = useState(false);

  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth();

  // Generate years from 1900 to current year
  const years = Array.from(
    { length: new Date().getFullYear() - 1899 },
    (_, i) => 1900 + i
  ).reverse();

  // Generate months
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

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
    onChange?.(date);
    if (date) {
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP', { locale: es }) : placeholder}
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
          selected={value}
          onSelect={handleDateSelect}
          disabled={date => date > new Date() || date < new Date('1900-01-01')}
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
