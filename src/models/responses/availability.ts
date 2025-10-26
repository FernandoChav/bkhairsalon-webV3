/**
 * Representa un único bloque de tiempo disponible.
 * Corresponde a un slot de cita válido.
 */
export interface TimeBlock {
  /**
   * Hora de inicio del bloque, en formato "HH:mm:ss".
   * Esta es la hora que se mostrará al usuario.
   * @example "09:00:00"
   */
  start: string;

  /**
   * Hora de fin del bloque, en formato "HH:mm:ss".
   * @example "10:30:00"
   */
  end: string;

  /**
   * Duración total del bloque en minutos.
   * @example 90
   */
  durationMinutes: number;
}

/**
 * Define la estructura de la respuesta de disponibilidad agrupada
 * por cada trabajador (profesional).
 * La respuesta principal de la API es un array de este tipo: AvailabilityResponse[]
 */
export interface AvailabilityResponse {
  /**
   * ID único del trabajador (GUID).
   * @example "88e8a3fd-e9d1-4f18-8a5f-777af49340bd"
   */
  workerId: string;

  /**
   * Nombre completo del trabajador.
   * @example "Ana1 Gonzalez1"
   */
  workerName: string;

  /**
   * Email del trabajador.
   * @example "ana.gonzalez1@example.com"
   */
  workerEmail: string;

  /**
   * Lista de todos los bloques de tiempo (slots) disponibles
   * para este trabajador en la fecha consultada.
   */
  availableTimeBlocks: TimeBlock[];
}
