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
  // Valores (estado, datos, computed values)
  value?: string;
  name?: string;
  ref?: Ref<HTMLButtonElement>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  fromYear?: number;
  toYear?: number;
  maxAge?: number;
  minAge?: number;
  locale?: Locale;
  dateFormat?: string;
  captionLayout?: 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  required?: boolean;
  allowFutureDates?: boolean;
  allowPastDates?: boolean;

  // Handlers (funciones de manejo de eventos)
  handleChange?: (date: string | undefined) => void;
  handleBlur?: () => void;
}

export const DatePicker = ({
  // Valores primero
  value,
  name,
  ref,
  placeholder = 'Seleccionar fecha',
  disabled = false,
  className,
  minDate,
  maxDate,
  fromYear,
  toYear,
  maxAge,
  minAge,
  locale = es,
  dateFormat = 'dd/MM/yyyy',
  captionLayout = 'dropdown',
  showOutsideDays = true,
  fixedWeeks = false,
  required = false,
  allowFutureDates = false,
  allowPastDates = true,
  // Handlers después
  handleChange,
  handleBlur,
}: DatePickerProps) => {
  // Estado
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  // Funciones utilitarias
  const parseDateString = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    const date = parseISO(dateString);
    return isValid(date) ? date : undefined;
  };

  const formatDateToISOString = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };

  const formatDisplayDate = (dateString: string) => {
    const date = parseDateString(dateString);
    if (!date) return '';
    return format(date, dateFormat);
  };

  // Funciones de cálculo
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
    return new Date(1900, 0, 1);
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
    return new Date(2100, 11, 31);
  };

  const getFromYear = (): number => {
    if (fromYear) return fromYear;
    return getMinDate().getFullYear();
  };

  const getToYear = (): number => {
    if (toYear) return toYear;
    return getMaxDate().getFullYear();
  };

  const isDateDisabled = (date: Date): boolean => {
    const minDateValue = getMinDate();
    const maxDateValue = getMaxDate();

    return date < minDateValue || date > maxDateValue;
  };

  // Handlers
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = formatDateToISOString(date);
      handleChange?.(formattedDate);
      setIsOpen(false);
      setHasBeenOpened(false);
    } else {
      handleChange?.(undefined);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open) {
      setHasBeenOpened(true);
    } else if (!open) {
      if (hasBeenOpened && !selectedDate && required) {
        handleBlur?.();
      }
      setHasBeenOpened(false);
    }
  };

  const handleBlurInternal = () => {
    if (!isOpen) {
      handleBlur?.();
    }
  };

  // Computed values
  const selectedDate = parseDateString(value || '');
  const displayDate = selectedDate ? formatDisplayDate(value || '') : '';
  const fromYearValue = getFromYear();
  const toYearValue = getToYear();
  const buttonText = selectedDate ? displayDate : placeholder;
  const buttonClassName = cn(
    'w-full justify-start text-left font-normal',
    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
    'border-input bg-transparent shadow-xs transition-[color,box-shadow] outline-none',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
    'dark:bg-input/30 cursor-pointer',
    'flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base md:text-sm',
    'data-[size=default]:h-9 data-[size=sm]:h-8',
    !value && 'text-muted-foreground',
    className
  );

  // Formatters
  const formatMonthDropdown = (date: Date) => {
    const monthName = date.toLocaleDateString(locale.code, {
      month: 'long',
    });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };

  const formatYearDropdown = (date: Date) => {
    return date.getFullYear().toString();
  };

  const formatters = {
    formatMonthDropdown,
    formatYearDropdown,
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={buttonClassName}
          disabled={disabled}
          name={name}
          ref={ref}
          data-size="default"
          onBlur={handleBlurInternal}
        >
          <HiCalendar className="mr-2 h-4 w-4" />
          {buttonText}
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
          fromYear={fromYearValue}
          toYear={toYearValue}
          showOutsideDays={showOutsideDays}
          fixedWeeks={fixedWeeks}
          formatters={formatters}
        />
      </PopoverContent>
    </Popover>
  );
};
