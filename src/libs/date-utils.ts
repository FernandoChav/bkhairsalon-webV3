import { format, parseISO } from 'date-fns';
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
 * Formatea un mes corto para mostrar (ej: "Ene")
 */
export const formatMonthShort = (date: Date): string => {
  return format(date, 'MMM', { locale: es });
};

/**
 * Obtiene la fecha mínima permitida (1900-01-01)
 */
export const getMinDateString = (): string => {
  return '1900-01-01';
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
