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
   * @param includeSubCategories - Incluir subcategorías en la respuesta
   * @param includeServices - Incluir servicios en la respuesta
   * @returns Respuesta de la API con lista de categorías
   */
  async getAll(
    includeSubCategories: boolean = false,
    includeServices: boolean = false
  ): Promise<ApiResponse<CategoryResponse[]>> {
    const params = new URLSearchParams();

    if (includeSubCategories) {
      params.append('includeSubCategories', 'true');
    }

    if (includeServices) {
      params.append('includeServices', 'true');
    }

    const queryString = params.toString();
    const url = queryString ? `/category?${queryString}` : '/category';

    const response = await baseClient.get<ApiResponse<CategoryResponse[]>>(url);
    return response.data;
  }

  /**
   * Crea una nueva categoría
   * @param data - Datos de la categoría a crear
   * @returns Respuesta de la API con resultado de la creación
   */
  async create(data: CreateCategoryRequest): Promise<ApiResponse> {
    console.log('Cliente enviando al backend:', data);
    const response = await baseClient.post<ApiResponse>('/category', data);
    return response.data;
  }
}
export const categoryClient = new CategoryClient();
