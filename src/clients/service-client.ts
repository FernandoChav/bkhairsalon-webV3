import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest, UpdateServiceRequest } from '@/models/requests';
import { PublicServiceResponse, ServiceResponse } from '@/models/responses';

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
   * Obtiene todos los servicios públicos disponibles
   * @returns Respuesta de la API con lista de servicios públicos
   */
  async getAll(): Promise<ApiResponse<PublicServiceResponse[]>> {
    const response =
      await baseClient.get<ApiResponse<PublicServiceResponse[]>>('/service');
    return response.data;
  }
}
export const serviceClient = new ServiceClient();
