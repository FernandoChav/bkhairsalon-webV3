/**
 * Utilidades para el manejo y validación de contraseñas
 */

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  score: number; // 0-100
}

/**
 * Valida la fortaleza de una contraseña
 * @param password - Contraseña a validar
 * @returns Resultado de la validación con errores y score
 */
export const validatePasswordStrength = (
  password: string
): PasswordValidationResult => {
  const errors: string[] = [];
  let score = 0;

  // Longitud mínima
  if (password.length < 8) {
    errors.push('Debe tener al menos 8 caracteres');
  } else {
    score += 20;
  }

  // Longitud óptima (12+ caracteres)
  if (password.length >= 12) {
    score += 10;
  }

  // Letra mayúscula
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una letra mayúscula');
  } else {
    score += 15;
  }

  // Letra minúscula
  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una letra minúscula');
  } else {
    score += 15;
  }

  // Número
  if (!/[0-9]/.test(password)) {
    errors.push('Debe contener al menos un número');
  } else {
    score += 15;
  }

  // Carácter especial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Debe contener al menos un carácter especial');
  } else {
    score += 15;
  }

  // Caracteres especiales adicionales (bonus)
  const specialCharCount = (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || [])
    .length;
  if (specialCharCount > 1) {
    score += Math.min(specialCharCount * 2, 10);
  }

  // Diversidad de caracteres (bonus)
  const uniqueChars = new Set(password).size;
  if (uniqueChars > password.length * 0.7) {
    score += 10;
  }

  return {
    isValid: errors.length === 0,
    errors,
    score: Math.min(score, 100),
  };
};

/**
 * Genera una contraseña segura
 * @param length - Longitud de la contraseña (por defecto 12)
 * @returns Contraseña generada
 */
export const generateSecurePassword = (length: number = 12): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*(),.?":{}|<>';

  const allChars = lowercase + uppercase + numbers + symbols;

  let password = '';

  // Asegurar al menos un carácter de cada tipo
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Completar con caracteres aleatorios
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Mezclar la contraseña
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

/**
 * Obtiene el nivel de fortaleza de una contraseña basado en el score
 * @param score - Score de la contraseña (0-100)
 * @returns Nivel de fortaleza
 */
export const getPasswordStrengthLevel = (
  score: number
): 'muy_débil' | 'débil' | 'media' | 'fuerte' | 'muy_fuerte' => {
  if (score < 30) return 'muy_débil';
  if (score < 50) return 'débil';
  if (score < 70) return 'media';
  if (score < 90) return 'fuerte';
  return 'muy_fuerte';
};

/**
 * Obtiene el color asociado al nivel de fortaleza
 * @param level - Nivel de fortaleza
 * @returns Color en formato CSS
 */
export const getPasswordStrengthColor = (level: string): string => {
  switch (level) {
    case 'muy_débil':
      return '#ef4444'; // red-500
    case 'débil':
      return '#f97316'; // orange-500
    case 'media':
      return '#eab308'; // yellow-500
    case 'fuerte':
      return '#22c55e'; // green-500
    case 'muy_fuerte':
      return '#16a34a'; // green-600
    default:
      return '#6b7280'; // gray-500
  }
};
