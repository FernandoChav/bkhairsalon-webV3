import { ApiResponse } from '@/models/generics';
import { DeleteUserRequest, EditUserRequest } from '@/models/requests';
import { DeletionInfoDto, ProfileDto } from '@/models/responses';

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

  /**
   * Elimina la cuenta del usuario
   * @param data - Datos necesarios para la eliminación
   * @returns Respuesta de la API con resultado de la eliminación
   */
  async deleteUser(data: DeleteUserRequest): Promise<ApiResponse> {
    const response = await baseClient.delete<ApiResponse>('/user/delete', {
      data: data,
    });
    return response.data;
  }

  /**
   * Obtiene información relevante antes de eliminar la cuenta
   * @returns Respuesta de la API con información de eliminación
   */
  async getDeletionInfo(): Promise<ApiResponse<DeletionInfoDto>> {
    const response = await baseClient.get<ApiResponse<DeletionInfoDto>>(
      '/user/deletion-info'
    );
    return response.data;
  }
}

export const userClient = new UserClient();
