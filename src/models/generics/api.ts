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

// Tipos para errores HTTP específicos
export interface HttpError {
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

// Tipos para paginación
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para filtros comunes
export interface BaseFilter {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
