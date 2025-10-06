import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { serviceClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest } from '@/models/requests';
import { PublicServiceResponse, ServiceResponse } from '@/models/responses';

export const useServicesQuery = () =>
  useQuery<ApiResponse<PublicServiceResponse[]>, AxiosError>({
    queryKey: ['services', 'public'],
    queryFn: serviceClient.getAll,
  });

export const useCreateServiceMutation = () =>
  useMutation<ApiResponse<ServiceResponse>, AxiosError, CreateServiceRequest>({
    mutationFn: serviceClient.createService,
  });
