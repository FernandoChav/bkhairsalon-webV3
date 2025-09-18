// Exportaciones específicas de schemas
export { registerSchema } from './schemas/auth';

// Exportaciones específicas de requests
export type { RegisterRequest, LoginRequest } from './requests/auth';

// Exportaciones específicas de entities
export type { User } from './entities/auth';

// Exportaciones específicas de helpers
export {
  transformRegisterData,
  formatPhoneNumber,
  validatePasswordStrength,
  parsePhoneNumber,
  calculateAge,
} from './helpers/auth';

// Exportaciones específicas de generics
export type {
  LoginResponse,
  ApiResponse,
  ValidationError,
  HttpError,
  PaginatedResponse,
  BaseFilter,
  Timestamps,
  BaseEntity,
} from './generics/api';
export type {
  FormFieldError,
  FormState,
  ValidationResult,
  FormFieldProps,
  SelectOption,
} from './generics/forms';
