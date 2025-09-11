import { ApiResponse } from '@/models/generics';
import type { RegisterRequest } from '@/models/requests';

import { baseClient } from './base-client';

class AuthClient {
  /**
   * Registrar un nuevo usuario
   */
  async register(data: RegisterRequest): Promise<ApiResponse> {
    const response = await baseClient.post<ApiResponse>('/auth/register', data);
    return response.data;
  }
}

// Exportar instancia singleton
export const authClient = new AuthClient();
