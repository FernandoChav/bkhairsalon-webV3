/**
 * Utilidades para el manejo de números de teléfono chilenos
 */

/**
 * Formatea un número de teléfono chileno para enviar al backend
 * @param phone - Número de teléfono en cualquier formato
 * @returns Número en formato +569XXXXXXXX para enviar al backend
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Handle empty input
  if (cleaned.length === 0) {
    return '';
  }

  // Handle Chilean phone number formats and always return +569XXXXXXXX:
  // 1. "+569XXXXXXXX" (11 digits with +569) -> return as is
  // 2. "569XXXXXXXX" (11 digits with 569) -> add + prefix
  // 3. "9XXXXXXXX" (9 digits without country code) -> add +56 prefix

  // If it's 11 digits starting with 569, add + prefix
  if (cleaned.startsWith('569') && cleaned.length === 11) {
    return `+${cleaned}`;
  }

  // If it's 9 digits starting with 9, add +56 prefix
  if (cleaned.length === 9 && cleaned.startsWith('9')) {
    return `+56${cleaned}`;
  }

  // If it's 8 digits, assume it's missing the leading 9 and add +569 prefix
  if (cleaned.length === 8) {
    return `+569${cleaned}`;
  }

  // Return the cleaned number if it doesn't match expected formats
  return cleaned;
};

/**
 * Valida si un número de teléfono es válido para Chile
 * @param phone - Número de teléfono a validar
 * @returns true si es válido, false si no
 */
export const isValidChileanPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');

  // Chilean phone number validation matching backend regex: ^(\+569|569)?[1-9]\d{7}$
  // Accepts formats:
  // 1. "+569XXXXXXXX" (11 digits with +569, where first X is 1-9)
  // 2. "569XXXXXXXX" (11 digits with 569, where first X is 1-9)
  // 3. "9XXXXXXXX" (9 digits without country code, where first X is 1-9)

  // Check if it's 11 digits starting with 569 (569 + 1 digit + 7 digits = 11 total)
  if (cleaned.startsWith('569') && cleaned.length === 11) {
    const firstDigit = cleaned[3]; // First digit after 569
    return firstDigit >= '1' && firstDigit <= '9';
  }

  // Check if it's 9 digits starting with 9
  if (cleaned.length === 9 && cleaned.startsWith('9')) {
    const firstDigit = cleaned[1]; // Second digit (first after 9)
    return firstDigit >= '1' && firstDigit <= '9';
  }

  return false;
};
