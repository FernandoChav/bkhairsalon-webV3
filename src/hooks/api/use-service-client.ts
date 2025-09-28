import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { serviceClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest } from '@/models/requests';
import { ServiceResponse } from '@/models/responses';

export const useCreateServiceMutation = () =>
  useMutation<ApiResponse<ServiceResponse>, AxiosError, CreateServiceRequest>({
    mutationFn: serviceClient.createService,
  });
