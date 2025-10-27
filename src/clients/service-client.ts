import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest, UpdateServiceRequest } from '@/models/requests';
import {
  PublicServiceDetailResponse,
  PublicServiceResponse,
  ServiceResponse,
} from '@/models/responses';

import { baseClient } from './base-client';

/**
 * Cliente para operaciones de servicios
 * Maneja la creación y obtención de servicios
 */
class ServiceClient {
  /**
   * Crea un nuevo servicio con fotos
   * @param data - Datos del servicio a crear
   * @returns Respuesta de la API con el servicio creado
   */
  async createService(
    data: CreateServiceRequest
  ): Promise<ApiResponse<ServiceResponse>> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('duration', data.duration.toString());
    formData.append('price', data.price.toString());
    formData.append('startTime', data.startTime);
    formData.append('endTime', data.endTime);
    formData.append(
      'commissionPercentage',
      data.commissionPercentage.toString()
    );
    formData.append('categoryId', data.categoryId);
    if (data.discountId) {
      formData.append('discountId', data.discountId);
    }
    if (data.photos) {
      data.photos.forEach(photo => {
        formData.append('photos', photo);
      });
    }

    const response = await baseClient.post<ApiResponse<ServiceResponse>>(
      '/service',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  /**
   * Actualiza un servicio existente
   * @param id - ID del servicio a actualizar
   * @param data - Datos del servicio a actualizar
   * @returns Respuesta de la API con el servicio actualizado
   */
  async updateService(
    id: string,
    data: UpdateServiceRequest
  ): Promise<ApiResponse<ServiceResponse>> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('duration', data.duration.toString());
    formData.append('price', data.price.toString());
    formData.append('startTime', data.startTime);
    formData.append('endTime', data.endTime);
    formData.append(
      'commissionPercentage',
      data.commissionPercentage.toString()
    );
    if (data.discountId) {
      formData.append('discountId', data.discountId);
    }
    if (data.keepPhotoIds && data.keepPhotoIds.length > 0) {
      data.keepPhotoIds.forEach(id => {
        formData.append('keepPhotoIds', id);
      });
    }
    if (data.deletePhotoIds && data.deletePhotoIds.length > 0) {
      data.deletePhotoIds.forEach(id => {
        formData.append('deletePhotoIds', id);
      });
    }
    if (data.newPhotos) {
      data.newPhotos.forEach(photo => {
        formData.append('newPhotos', photo);
      });
    }

    const response = await baseClient.put<ApiResponse<ServiceResponse>>(
      `/service/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  /**
   * Obtiene todos los servicios públicos disponibles, necesita rol admin
   * @returns Respuesta de la API con lista de servicios públicos
   */
  async getAll(): Promise<ApiResponse<PublicServiceResponse[]>> {
    const response =
      await baseClient.get<ApiResponse<PublicServiceResponse[]>>('/service');
    return response.data;
  }

  // --- INICIO DE CÓDIGO RESUELTO ---

  /**
   * Obtiene todos los servicios públicos disponibles para, no necesita rol
   * @returns Respuesta de la API con lista de servicios públicos
   */
  async getAllPublic(): Promise<ApiResponse<PublicServiceResponse[]>> {
    const response =
      await baseClient.get<ApiResponse<PublicServiceResponse[]>>(
        '/service/public'
      );
    return response.data;
  }

  /**
   * Obtiene los detalles de un servicio público por su ID
   * @param id - ID del servicio público
   * @returns Respuesta de la API con los detalles del servicio
   */
  async getById(id: string): Promise<ApiResponse<PublicServiceDetailResponse>> {
    const response = await baseClient.get<
      ApiResponse<PublicServiceDetailResponse>
    >(
      `/service/public/${id}` // URL dinámica
    );
    return response.data;
  }

  /**
 * Elimina un servicio existente (soft delete)
 * @param id - ID del servicio a eliminar
 * @returns Respuesta de la API confirmando la eliminación
 */
  async deleteService(id: string): Promise<ApiResponse> {
    const response = await baseClient.delete<ApiResponse>(`/service/${id}`);
    return response.data;
  }
  // --- FIN DE CÓDIGO RESUELTO ---
}
export const serviceClient = new ServiceClient();
