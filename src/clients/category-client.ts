import { ApiResponse } from '@/models/generics';
import { CreateCategoryRequest } from '@/models/requests';
import { CategoryResponse } from '@/models/responses';

import { baseClient } from './base-client';

/**
 * Cliente para operaciones de categorías
 * Maneja la obtención y creación de categorías
 */
class CategoryClient {
  /**
   * Obtiene todas las categorías disponibles
   * @returns Respuesta de la API con lista de categorías
   */
  async getAll(): Promise<ApiResponse<CategoryResponse[]>> {
    const response =
      await baseClient.get<ApiResponse<CategoryResponse[]>>('/category');
    return response.data;
  }

  /**
   * Crea una nueva categoría
   * @param data - Datos de la categoría a crear
   * @returns Respuesta de la API con resultado de la creación
   */
  async create(data: CreateCategoryRequest): Promise<ApiResponse> {
    const response = await baseClient.post<ApiResponse>('/category', data);
    return response.data;
  }
}
export const categoryClient = new CategoryClient();
