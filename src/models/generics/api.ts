export interface ApiResponse<T = object> {
  message: string;
  data: T | null;
  errorData: ValidationError | null;
}

export interface ValidationError {
  errors: Record<string, string[]>;
}
