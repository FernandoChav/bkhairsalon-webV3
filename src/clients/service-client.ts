import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest } from '@/models/requests';
import { ServiceDto } from '@/models/responses';

import { baseClient } from './base-client';

class ServiceClient {
  async createService(
    data: CreateServiceRequest
  ): Promise<ApiResponse<ServiceDto>> {
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

    const response = await baseClient.post<ApiResponse<ServiceDto>>(
      '/Service',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }
}
export const serviceClient = new ServiceClient();
