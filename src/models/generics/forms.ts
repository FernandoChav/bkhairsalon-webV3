// Tipos genéricos para formularios
export interface FormFieldError {
  message: string;
  type: string;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, FormFieldError>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Tipos para validación
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

// Tipos para campos de formulario
export interface FormFieldProps<T> {
  name: keyof T;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'tel' | 'date' | 'number';
}

// Tipos para opciones de select
export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}
