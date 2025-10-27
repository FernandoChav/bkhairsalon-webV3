import { useMutation, useQuery, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { serviceClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { CreateServiceRequest, UpdateServiceRequest, DeleteServiceRequest } from '@/models/requests';
import {
  PublicServiceDetailResponse,
  PublicServiceResponse,
  ServiceResponse,
} from '@/models/responses';
import { id } from 'date-fns/locale';

/**
 * CAMBIO: Se ajustó la queryKey a 'admin' para diferenciarla de la pública
 * y evitar colisiones de caché.
 */
export const useGetAllServiceQuery = () =>
  useQuery<ApiResponse<PublicServiceResponse[]>, AxiosError>({
    queryKey: ['services', 'admin'], // ANTES: ['services', 'public']
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

// --- INICIO CÓDIGO RESUELTO ---

/**
 * Hook de la rama 'dev' para obtener todos los servicios públicos
 */
export const useGetAllServicePublicQuery = () =>
  useQuery<ApiResponse<PublicServiceResponse[]>, AxiosError>({
    queryKey: ['services', 'public'], // Esta es la key para la lista pública
    queryFn: serviceClient.getAllPublic,
  });

/**
 * Hook de tu rama ('HEAD') para obtener un servicio público por ID
 */
export const useGetServiceByIdQuery = (serviceId: string) =>
  useQuery<ApiResponse<PublicServiceDetailResponse>, AxiosError<ApiResponse>>({
    queryKey: ['services', 'public', serviceId], // Key anidada bajo la pública
    queryFn: () => serviceClient.getById(serviceId),
    enabled: !!serviceId,
    staleTime: 5 * 60 * 1000,
  });

export const useDeleteServiceMutation = (): UseMutationResult<
  ApiResponse<object>,
  AxiosError<ApiResponse>,
  DeleteServiceRequest
  > => {
    return useMutation<
      ApiResponse<object>,
      AxiosError<ApiResponse>,
      DeleteServiceRequest
    >({
      mutationFn: ({ id }: DeleteServiceRequest) => serviceClient.deleteService(id),
    });
  }
// --- FIN CÓDIGO RESUELTO ---
