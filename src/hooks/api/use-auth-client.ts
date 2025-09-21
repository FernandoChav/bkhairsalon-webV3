import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { RegisterRequest } from '@/models/requests';

// Hook para registro - solo maneja lógica de API
// Login se maneja completamente a través de NextAuth signIn()
export const useRegisterMutation = () =>
  useMutation<ApiResponse, AxiosError<ApiResponse>, RegisterRequest>({
    mutationFn: authClient.register,
  });
