import { ApiResponse } from '@/models/generics';
import { EditUserRequest } from '@/models/requests';
import { ProfileDto } from '@/models/responses';

import { baseClient } from './base-client';

class UserClient {
  async editUser(data: EditUserRequest): Promise<ApiResponse> {
    const response = await baseClient.put<ApiResponse>('/user/edit', data);
    return response.data;
  }

  async getProfile(): Promise<ApiResponse<ProfileDto>> {
    const response =
      await baseClient.get<ApiResponse<ProfileDto>>('/user/profile');
    return response.data;
  }
}

export const userClient = new UserClient();
