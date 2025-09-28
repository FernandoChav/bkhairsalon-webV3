import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { categoryClient, serviceClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest } from '@/models/requests';
import { CategoryDto, ServiceDto } from '@/models/responses';

export const useCreateServiceMutation = () =>
  useMutation<ApiResponse<ServiceDto>, AxiosError, CreateServiceRequest>({
    mutationFn: serviceClient.createService,
  });

export const useGetCategoriesQuery = () =>
  useQuery<ApiResponse<CategoryDto[]>, AxiosError<ApiResponse>, CategoryDto[]>({
    queryKey: ['categories'],
    queryFn: categoryClient.getAll,
    select: data => data.data || [],
  });
