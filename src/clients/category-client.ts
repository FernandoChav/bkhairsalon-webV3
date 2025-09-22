import { baseClient } from './base-client';
import { ApiResponse } from '@/models/generics';
import { CategoryDto } from '@/models/responses';

class CategoryClient {
    async getAll(): Promise<ApiResponse<CategoryDto[]>> {
        const response = await baseClient.get<ApiResponse<CategoryDto[]>>('/Category');
        return response.data;
    }
}
export const categoryClient = new CategoryClient();
