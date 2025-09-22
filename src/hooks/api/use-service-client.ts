import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { serviceClient, categoryClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest } from '@/models/requests/service';
import { ServiceDto, CategoryDto } from '@/models/responses';
import { use } from 'react';

export const useCreateServiceMutation = () => 
    useMutation<ApiResponse<ServiceDto>, AxiosError, CreateServiceRequest>({
        mutationFn: serviceClient.createService,
    });

export const useGetCategoriesQuery = () => 
    useQuery<ApiResponse<CategoryDto[]>, AxiosError<ApiResponse>, CategoryDto[]>({
        queryKey: ['categories'],
        queryFn: categoryClient.getAll,
        select: (data) => data.data || [],
    });
