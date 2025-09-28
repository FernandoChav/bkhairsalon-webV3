import { ApiResponse } from '@/models/generics';
import { CategoryDto } from '@/models/responses';

import { baseClient } from './base-client';

class CategoryClient {
  async getAll(): Promise<ApiResponse<CategoryDto[]>> {
    const response =
      await baseClient.get<ApiResponse<CategoryDto[]>>('/category');
    return response.data;
  }
}
export const categoryClient = new CategoryClient();
