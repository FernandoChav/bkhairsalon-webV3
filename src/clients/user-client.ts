import { ApiResponse } from '@/models/generics';
import type { EditUserRequest } from '@/models/requests';
import type { CustomAxiosRequestConfig } from '@/types/custom-axios';

import { baseClient } from './base-client';

class UserClient {
  /**
   * Editar la información del usuario
   */
  async editUser(data: EditUserRequest): Promise<ApiResponse> {
    // Indicar que esta solicitud requiere autenticación
    const config: CustomAxiosRequestConfig = { requiresAuth: true };
    const response = await baseClient.put<ApiResponse>(
      '/User/edit',
      data,
      config
    );
    return response.data;
  }
}

// Exportar instancia singleton
export const userClient = new UserClient();
