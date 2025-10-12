import { ApiResponse } from '@/models/generics';
import { EditUserRequest } from '@/models/requests';
import { ProfileDto } from '@/models/responses';

import { baseClient } from './base-client';

/**
 * Cliente para operaciones de usuario
 * Maneja la edición y obtención de datos de usuario
 */
class UserClient {
  /**
   * Edita los datos de un usuario
   * @param data - Datos actualizados del usuario
   * @returns Respuesta de la API con resultado de la edición
   */
  async editUser(data: EditUserRequest): Promise<ApiResponse> {
    const response = await baseClient.put<ApiResponse>('/user/edit', data);
    return response.data;
  }

  /**
   * Obtiene el perfil del usuario autenticado
   * @returns Respuesta de la API con datos del perfil
   */
  async getProfile(): Promise<ApiResponse<ProfileDto>> {
    const response =
      await baseClient.get<ApiResponse<ProfileDto>>('/user/profile');
    return response.data;
  }
}

export const userClient = new UserClient();
