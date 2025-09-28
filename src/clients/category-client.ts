import { ApiResponse } from '@/models/generics';
import { CreateCategoryRequest } from '@/models/requests';
import { CategoryDto } from '@/models/responses';

import { baseClient } from './base-client';

class CategoryClient {
  async getAll(): Promise<ApiResponse<CategoryDto[]>> {
    const response =
      await baseClient.get<ApiResponse<CategoryDto[]>>('/category');
    return response.data;
  }

  async create(data: CreateCategoryRequest): Promise<ApiResponse> {
    const response = await baseClient.post<ApiResponse>('/category', data);
    return response.data;
  }
}
export const categoryClient = new CategoryClient();
