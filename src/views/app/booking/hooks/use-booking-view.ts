'use client';

import { useEffect, useState } from 'react';

// Hooks de API Globales
import {
  useCheckAvailabilityMutation,
  useGetServiceByIdQuery,
} from '@/hooks/api';
// Importa ambos hooks
import { AvailabilityRequest } from '@/models/requests';
import {
  AvailabilityResponse,
  PublicServiceDetailResponse,
} from '@/models/responses';

// Ya no necesitamos MOCK_SERVICE_DETAILS

interface UseBookingViewReturn {
  // Estado del Servicio
  serviceDetails: PublicServiceDetailResponse | null | undefined;
  isLoadingService: boolean;
  isErrorService: boolean;

  // Estado de Disponibilidad (igual que antes)
  selectedDate: Date | undefined;
  availabilityData: AvailabilityResponse[];
  isPendingAvailability: boolean;
  isErrorAvailability: boolean;

  // Handlers (igual que antes)
  handleDateSelect: (date: Date | undefined) => void;
  handleSlotSelect: (workerId: string, time: string) => void;
}

export const useBookingView = (
  serviceId: string,
  slotIntervalMinutes: number // Podríamos obtener esto del servicio en el futuro
): UseBookingViewReturn => {
  // --- 1. LÓGICA DE DETALLES DEL SERVICIO (REAL) ---
  const {
    data: serviceApiResponse,
    isLoading: isLoadingService,
    isError: isErrorService,
  } = useGetServiceByIdQuery(serviceId); // Llama al nuevo hook con el ID
  const serviceDetails = serviceApiResponse?.data; // Extrae los datos

  // --- 2. LÓGICA DE DISPONIBILIDAD (REAL) ---
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const {
    data: availabilityApiResponse,
    mutate: checkAvailability,
    isPending: isPendingAvailability,
    isError: isErrorAvailability,
  } = useCheckAvailabilityMutation();

  // Función para llamar a la API de disponibilidad
  const fetchAvailability = (date: Date) => {
    const dateOnly = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dateUTC = dateOnly.toISOString();
    const requestBody: AvailabilityRequest = {
      date: dateUTC,
      serviceIds: [serviceId],
      slotIntervalMinutes: slotIntervalMinutes,
    };
    checkAvailability(requestBody);
  };

  // Efecto para la carga inicial de disponibilidad (igual que antes)
  useEffect(() => {
    if (selectedDate && serviceId) {
      // Asegura que serviceId exista
      fetchAvailability(selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId, slotIntervalMinutes]); // Se ejecuta si cambia el servicio

  // Handler del calendario (igual que antes)
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      fetchAvailability(date);
    } else {
      // Opcional: limpiar datos si deseleccionan
      // setAvailabilityData([]); // Necesitaríamos un estado local si hacemos esto
    }
  };

  // Handler de selección de slot (igual que antes)
  const handleSlotSelect = (workerId: string, time: string) => {
    console.log('RESERVA FINAL:', {
      serviceId,
      date: selectedDate,
      workerId,
      time,
    });
    // toast.success(...);
  };

  // Extrae los datos de disponibilidad
  const availabilityData = availabilityApiResponse?.data || [];

  return {
    // Servicio
    serviceDetails,
    isLoadingService,
    isErrorService,
    // Disponibilidad
    selectedDate,
    availabilityData,
    isPendingAvailability,
    isErrorAvailability,
    // Handlers
    handleDateSelect,
    handleSlotSelect,
  };
};
