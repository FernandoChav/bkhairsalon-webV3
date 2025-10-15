import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { categoryClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/models/requests';
import { CategoryResponse } from '@/models/responses';

export const useGetAllCategoryQuery = (
  includeSubcategories: boolean = true,
  includeServices: boolean = true
) =>
  useQuery<CategoryResponse[], AxiosError<ApiResponse>>({
    queryKey: ['categories', includeSubcategories, includeServices],
    queryFn: async () => {
      const response = await categoryClient.getAll(
        includeSubcategories,
        includeServices
      );

      return response.data || [];
    },
  });

export const useCreateCategoryMutation = () =>
  useMutation<ApiResponse, AxiosError<ApiResponse>, CreateCategoryRequest>({
    mutationFn: categoryClient.create,
  });

export const useUpdateCategoryMutation = () =>
  useMutation<
    ApiResponse<CategoryResponse>,
    AxiosError<ApiResponse>,
    { id: string; data: UpdateCategoryRequest }
  >({
    mutationFn: ({ id, data }) => categoryClient.update(id, data),
  });
