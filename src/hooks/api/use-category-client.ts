import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { categoryClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { CreateCategoryRequest } from '@/models/requests';
import { CategoryResponse } from '@/models/responses';

export const useGetCategoriesQuery = () =>
  useQuery<CategoryResponse[], AxiosError<ApiResponse>>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoryClient.getAll();
      return response.data || [];
    },
  });

export const useCreateCategoryMutation = () =>
  useMutation<ApiResponse, AxiosError<ApiResponse>, CreateCategoryRequest>({
    mutationFn: categoryClient.create,
  });
