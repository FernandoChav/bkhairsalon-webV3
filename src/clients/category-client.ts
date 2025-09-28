import { ApiResponse } from '@/models/generics';
import { CreateCategoryRequest } from '@/models/requests';
import { CategoryResponse } from '@/models/responses';

import { baseClient } from './base-client';

class CategoryClient {
  async getAll(): Promise<ApiResponse<CategoryResponse[]>> {
    const response =
      await baseClient.get<ApiResponse<CategoryResponse[]>>('/category');
    return response.data;
  }

  async create(data: CreateCategoryRequest): Promise<ApiResponse> {
    const response = await baseClient.post<ApiResponse>('/category', data);
    return response.data;
  }
}
export const categoryClient = new CategoryClient();
