import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { availabilityClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { AvailabilityRequest } from '@/models/requests';
import { AvailabilityResponse } from '@/models/responses';

/**
 * Hook para ejecutar la mutación de 'CheckAvailability'.
 * Proporciona el estado (isPending, isError, data) y la función 'mutate'
 * para llamar al endpoint.
 */
export const useCheckAvailabilityMutation = () =>
  useMutation<
    ApiResponse<AvailabilityResponse[]>, // Tipo de dato que se espera recibir (TData)
    AxiosError<ApiResponse>, // Tipo de error (TError)
    AvailabilityRequest // Tipo de variables que acepta la mutación (TVariables)
  >({
    // La función que se ejecutará al llamar a 'mutate'
    mutationFn: availabilityClient.check,
  });
