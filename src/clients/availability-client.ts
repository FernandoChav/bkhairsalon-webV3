import { ApiResponse } from '@/models/generics';
import { AvailabilityRequest } from '@/models/requests';
import { AvailabilityResponse } from '@/models/responses';

import { baseClient } from './base-client';

// Importamos el cliente base

/**
 * Cliente para operaciones de Disponibilidad
 * Maneja la consulta de slots de tiempo
 */
class AvailabilityClient {
  /**
   * Consulta los slots de tiempo disponibles para un día y servicios específicos.
   * Llama al endpoint POST /api/Availability/CheckAvailability
   *
   * @param data El cuerpo de la petición (fecha, serviceIds, intervalo)
   * @returns Respuesta de la API con la lista de profesionales y sus slots disponibles
   */
  async check(
    data: AvailabilityRequest
  ): Promise<ApiResponse<AvailabilityResponse[]>> {
    const response = await baseClient.post<ApiResponse<AvailabilityResponse[]>>(
      '/Availability/CheckAvailability',
      data
    );
    return response.data;
  }
}

/**
 * Instancia única del cliente de disponibilidad para usar en la aplicación.
 */
export const availabilityClient = new AvailabilityClient();
