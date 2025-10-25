export interface AvailabilityRequest {
  /**
   * La fecha para la cual se consulta la disponibilidad.
   * Debe estar en formato string ISO 8601 y en UTC.
   * @example "2025-10-27T00:00:00Z"
   */
  date: string;

  /**
   * Un array de IDs (como strings) de los servicios seleccionados.
   * @example ["123e4567-e89b-12d3-a456-426614174000"]
   */
  serviceIds: string[];

  /**
   * El intervalo de tiempo en minutos para calcular los slots.
   * @example 30
   */
  slotIntervalMinutes: number;
}
