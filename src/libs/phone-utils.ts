/**
 * Formatea un número de teléfono chileno al formato internacional estándar
 * @param phone - Número de teléfono en cualquier formato
 * @returns Número formateado con prefijo +56 o +569
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 0) {
    return '';
  }

  if (cleaned.startsWith('569') && cleaned.length === 11) {
    return `+${cleaned}`;
  }

  if (cleaned.length === 9 && cleaned.startsWith('9')) {
    return `+56${cleaned}`;
  }

  if (cleaned.length === 8) {
    return `+569${cleaned}`;
  }

  return cleaned;
};

/**
 * Valida si un número de teléfono es un formato chileno válido
 * @param phone - Número de teléfono a validar
 * @returns true si el formato es válido para Chile, false en caso contrario
 */
export const isValidChileanPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.startsWith('569') && cleaned.length === 11) {
    const firstDigit = cleaned[3];
    return firstDigit >= '1' && firstDigit <= '9';
  }

  if (cleaned.length === 9 && cleaned.startsWith('9')) {
    const firstDigit = cleaned[1];
    return firstDigit >= '1' && firstDigit <= '9';
  }

  return false;
};
