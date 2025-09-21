'use client';

import { Locale, format, isValid, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { HiCalendar } from 'react-icons/hi';

import React, { Ref, useState } from 'react';

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn';
import { cn } from '@/libs';

export interface DatePickerProps {
  // Valores y eventos
  value?: string; // Formato YYYY-MM-DD
  onChange?: (date: string | undefined) => void;
  onBlur?: () => void;

  // Compatibilidad con React Hook Form
  name?: string;
  ref?: Ref<HTMLButtonElement>;

  // Configuración de UI
  placeholder?: string;
  disabled?: boolean;
  className?: string;

  // Configuración de fechas
  minDate?: Date;
  maxDate?: Date;
  fromYear?: number;
  toYear?: number;

  // Configuración de restricciones de edad
  maxAge?: number; // Edad máxima en años (ej: 120)
  minAge?: number; // Edad mínima en años (ej: 0)

  // Configuración de localización
  locale?: Locale;
  dateFormat?: string; // Formato de visualización (ej: 'dd/MM/yyyy')

  // Configuración del Calendar
  captionLayout?: 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;

  // Configuración de validación
  required?: boolean;
  allowFutureDates?: boolean;
  allowPastDates?: boolean;
}

export const DatePicker = ({
  // Valores y eventos
  value,
  onChange,
  onBlur,

  // Compatibilidad con React Hook Form
  name,
  ref,

  // Configuración de UI
  placeholder = 'Seleccionar fecha',
  disabled = false,
  className,

  // Configuración de fechas
  minDate,
  maxDate,
  fromYear,
  toYear,

  // Configuración de restricciones de edad
  maxAge,
  minAge,

  // Configuración de localización
  locale = es,
  dateFormat = 'dd/MM/yyyy',

  // Configuración del Calendar
  captionLayout = 'dropdown',
  showOutsideDays = true,
  fixedWeeks = false,

  // Configuración de validación
  required = false,
  allowFutureDates = false,
  allowPastDates = true,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  // Parse string to Date using date-fns
  const parseStringToDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    const date = parseISO(dateString);
    return isValid(date) ? date : undefined;
  };

  // Format Date to string (YYYY-MM-DD)
  const formatDateToString = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };

  const selectedDate = parseStringToDate(value || '');

  // Calcular fechas mínimas y máximas basadas en props
  const getMinDate = (): Date => {
    if (minDate) return minDate;

    const today = new Date();

    // Si se especifica edad máxima, calcular fecha mínima
    if (maxAge !== undefined) {
      const minDateFromAge = new Date(
        today.getFullYear() - maxAge,
        today.getMonth(),
        today.getDate()
      );
      return minDateFromAge;
    }

    // Si se especifica edad mínima, calcular fecha máxima
    if (minAge !== undefined) {
      const maxDateFromAge = new Date(
        today.getFullYear() - minAge,
        today.getMonth(),
        today.getDate()
      );
      return maxDateFromAge;
    }

    if (!allowPastDates) return today;
    return new Date(1900, 0, 1); // Default: 1 de enero de 1900
  };

  const getMaxDate = (): Date => {
    if (maxDate) return maxDate;

    const today = new Date();

    // Si se especifica edad mínima, calcular fecha máxima
    if (minAge !== undefined) {
      const maxDateFromAge = new Date(
        today.getFullYear() - minAge,
        today.getMonth(),
        today.getDate()
      );
      return maxDateFromAge;
    }

    // Si se especifica edad máxima, calcular fecha mínima
    if (maxAge !== undefined) {
      const minDateFromAge = new Date(
        today.getFullYear() - maxAge,
        today.getMonth(),
        today.getDate()
      );
      return minDateFromAge;
    }

    if (!allowFutureDates) return today;
    return new Date(2100, 11, 31); // Default: 31 de diciembre de 2100
  };

  // Calcular años para el dropdown
  const getFromYear = (): number => {
    if (fromYear) return fromYear;
    return getMinDate().getFullYear();
  };

  const getToYear = (): number => {
    if (toYear) return toYear;
    return getMaxDate().getFullYear();
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = formatDateToString(date);
      onChange?.(formattedDate);
      setIsOpen(false);
      setHasBeenOpened(false);
    } else {
      onChange?.(undefined);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open) {
      setHasBeenOpened(true);
    } else if (!open) {
      // Disparar validación si se cerró y no hay valor
      if (hasBeenOpened && !selectedDate && required) {
        onBlur?.();
      }
      setHasBeenOpened(false);
    }
  };

  const formatDisplayDate = (dateString: string) => {
    const date = parseStringToDate(dateString);
    if (!date) return '';
    return format(date, dateFormat);
  };

  // Función para determinar si una fecha está deshabilitada
  const isDateDisabled = (date: Date): boolean => {
    const min = getMinDate();
    const max = getMaxDate();

    return date < min || date > max;
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal h-10 px-3 py-1 text-base md:text-sm',
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
            'border-input bg-transparent shadow-xs transition-[color,box-shadow] outline-none',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            'dark:bg-input/30',
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
          <HiCalendar className="mr-2 h-4 w-4" />
          {selectedDate ? formatDisplayDate(value || '') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-input shadow-xs"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={isDateDisabled}
          locale={locale}
          initialFocus
          captionLayout={captionLayout}
          fromYear={getFromYear()}
          toYear={getToYear()}
          showOutsideDays={showOutsideDays}
          fixedWeeks={fixedWeeks}
          formatters={{
            formatMonthDropdown: (date: Date) => {
              const monthName = date.toLocaleDateString(locale.code, {
                month: 'long',
              });
              return monthName.charAt(0).toUpperCase() + monthName.slice(1);
            },
            formatYearDropdown: (date: Date) => {
              return date.getFullYear().toString();
            },
          }}
          classNames={{
            caption_label:
              'min-w-[110px] max-w-[110px] flex items-center justify-between px-2 py-1', // Ancho fijo con padding interno para armonía visual
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
