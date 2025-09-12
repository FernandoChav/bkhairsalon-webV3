import {
  differenceInYears,
  format,
  isFuture,
  isPast,
  isToday,
  isValid,
  parseISO,
  subDays,
} from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Convierte una fecha string (YYYY-MM-DD) a objeto Date
 */
export const parseDateString = (dateString: string): Date | undefined => {
  if (!dateString) return undefined;
  try {
    return parseISO(dateString);
  } catch {
    return undefined;
  }
};

/**
 * Convierte un objeto Date a string en formato YYYY-MM-DD
 */
export const formatDateToString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Formatea una fecha para mostrar al usuario (formato largo en español)
 */
export const formatDateForDisplay = (dateString: string): string => {
  const date = parseDateString(dateString);
  if (!date) return '';
  return format(date, 'PPP', { locale: es });
};

/**
 * Formatea una fecha para mostrar en formato corto
 */
export const formatDateShort = (dateString: string): string => {
  const date = parseDateString(dateString);
  if (!date) return '';
  return format(date, 'dd/MM/yyyy');
};

/**
 * Formatea un mes para mostrar (ej: "Enero")
 */
export const formatMonth = (date: Date): string => {
  return format(date, 'MMMM', { locale: es });
};

/**
 * Formatea un mes corto para mostrar (ej: "Ene")
 */
export const formatMonthShort = (date: Date): string => {
  return format(date, 'MMM', { locale: es });
};

/**
 * Formatea el nombre del día de la semana (ej: "Lunes")
 */
export const formatWeekday = (date: Date): string => {
  return format(date, 'EEEE', { locale: es });
};

/**
 * Formatea el nombre corto del día de la semana (ej: "Lun")
 */
export const formatWeekdayShort = (date: Date): string => {
  return format(date, 'EEE', { locale: es });
};

/**
 * Calcula la edad basada en la fecha de nacimiento
 */
export const calculateAge = (dateOfBirth: string): number => {
  const birthDate = parseDateString(dateOfBirth);
  if (!birthDate) return 0;
  return differenceInYears(new Date(), birthDate);
};

/**
 * Valida si una fecha string es válida
 */
export const isValidDateString = (dateString: string): boolean => {
  const date = parseDateString(dateString);
  return date ? isValid(date) : false;
};

/**
 * Verifica si una fecha está en el pasado
 */
export const isDateInPast = (dateString: string): boolean => {
  const date = parseDateString(dateString);
  if (!date) return false;
  return isPast(date);
};

/**
 * Verifica si una fecha está en el futuro
 */
export const isDateInFuture = (dateString: string): boolean => {
  const date = parseDateString(dateString);
  if (!date) return false;
  return isFuture(date);
};

/**
 * Verifica si una fecha es hoy
 */
export const isDateToday = (dateString: string): boolean => {
  const date = parseDateString(dateString);
  if (!date) return false;
  return isToday(date);
};

/**
 * Obtiene la fecha de hoy en formato YYYY-MM-DD
 */
export const getTodayString = (): string => {
  return formatDateToString(new Date());
};

/**
 * Obtiene la fecha de hace N años en formato YYYY-MM-DD
 */
export const getDateYearsAgo = (years: number): string => {
  const date = subDays(new Date(), years * 365);
  return formatDateToString(date);
};

/**
 * Obtiene la fecha mínima permitida (1900-01-01)
 */
export const getMinDateString = (): string => {
  return '1900-01-01';
};

/**
 * Obtiene la fecha máxima permitida (hoy)
 */
export const getMaxDateString = (): string => {
  return getTodayString();
};

/**
 * Genera un array de años desde 1900 hasta el año actual
 */
export const generateYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - 1899 },
    (_, i) => 1900 + i
  ).reverse();
};

/**
 * Genera un array de meses en español
 */
export const generateMonths = (): string[] => {
  return [
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
};
