import { ApiResponse, LoginResponse } from '@/models/generics';
import type { LoginRequest, RegisterRequest } from '@/models/requests';

import { baseClient } from './base-client';

class AuthClient {
  /**
   * Registrar un nuevo usuario
   */
  async register(data: RegisterRequest): Promise<ApiResponse> {
    const response = await baseClient.post<ApiResponse>('/auth/register', data);
    return response.data;
  }

  /**
   * Iniciar sesión con usuario
   */
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await baseClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      data
    );
    return response.data;
  }
}

// Exportar instancia singleton
export const authClient = new AuthClient();
