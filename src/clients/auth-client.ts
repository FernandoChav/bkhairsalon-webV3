import { baseClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import type { LoginRequest, RegisterRequest } from '@/models/requests';
import { LoginResponse } from '@/models/responses';

class AuthClient {
  async register(data: RegisterRequest): Promise<ApiResponse> {
    const response = await baseClient.post<ApiResponse>('/auth/register', data);
    return response.data;
  }

  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await baseClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      data
    );
    return response.data;
  }

  async refreshToken(): Promise<ApiResponse<LoginResponse>> {
    const response =
      await baseClient.post<ApiResponse<LoginResponse>>('/auth/refresh');
    return response.data;
  }
}

export const authClient = new AuthClient();
