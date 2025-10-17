import { ApiResponse } from '@/models/generics';
import {
  CreateCategoryRequest,
  ReorderElementsRequest,
  UpdateCategoryRequest,
} from '@/models/requests';
import { CategoryResponse } from '@/models/responses';

import { baseClient } from './base-client';

/**
 * Cliente para operaciones de categorías
 * Maneja la obtención y creación de categorías
 */
class CategoryClient {
  /**
   * Obtiene todas las categorías disponibles
   * @param includeSubcategories - Incluir subcategorías en la respuesta
   * @param includeServices - Incluir servicios en la respuesta
   * @returns Respuesta de la API con lista de categorías
   */
  async getAll(
    includeSubcategories: boolean = false,
    includeServices: boolean = false
  ): Promise<ApiResponse<CategoryResponse[]>> {
    const params = new URLSearchParams();

    if (includeSubcategories) {
      params.append('includeSubcategories', 'true');
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
    const response = await baseClient.post<ApiResponse>('/category', data);
    return response.data;
  }

  /**
   * Actualiza una categoría existente
   * @param id - ID de la categoría a actualizar
   * @param data - Datos de la categoría a actualizar
   * @returns Respuesta de la API con resultado de la actualización
   */
  async update(
    id: string,
    data: UpdateCategoryRequest
  ): Promise<ApiResponse<CategoryResponse>> {
    const response = await baseClient.put<ApiResponse<CategoryResponse>>(
      `/category/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Reordena elementos (categorías y servicios)
   * @param data - Estructura completa con nuevos ordenes
   * @returns Respuesta de la API
   */
  async reorderElements(data: ReorderElementsRequest): Promise<ApiResponse> {
    const response = await baseClient.post<ApiResponse>(
      '/category/reorder',
      data
    );
    return response.data;
  }
}
export const categoryClient = new CategoryClient();
