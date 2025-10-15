import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { serviceClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest, UpdateServiceRequest } from '@/models/requests';
import { PublicServiceResponse, ServiceResponse } from '@/models/responses';

export const useGetAllServiceQuery = () =>
  useQuery<ApiResponse<PublicServiceResponse[]>, AxiosError>({
    queryKey: ['services', 'public'],
    queryFn: serviceClient.getAll,
  });

export const useCreateServiceMutation = () =>
  useMutation<ApiResponse<ServiceResponse>, AxiosError, CreateServiceRequest>({
    mutationFn: serviceClient.createService,
  });

export const useUpdateServiceMutation = () =>
  useMutation<
    ApiResponse<ServiceResponse>,
    AxiosError,
    { id: string; data: UpdateServiceRequest }
  >({
    mutationFn: ({ id, data }) => serviceClient.updateService(id, data),
  });
