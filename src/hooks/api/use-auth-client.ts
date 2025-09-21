import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { RegisterRequest } from '@/models/requests';

export const useRegisterMutation = () =>
  useMutation<ApiResponse, AxiosError<ApiResponse>, RegisterRequest>({
    mutationFn: authClient.register,
  });
