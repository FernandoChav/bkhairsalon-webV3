// Tipos genéricos para respuestas de API (coincide exactamente con el backend C#)
export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface ApiResponse<T = object> {
  message: string;
  data: T | null;
  errorData: ValidationError | null;
}

export interface ValidationError {
  errors: Record<string, string[]>;
}
