'use client';

import { useCallback, useEffect, useState } from 'react';

// Hooks de API Globales
import {
  useCheckAvailabilityMutation,
  useGetServiceByIdQuery, // Ya lo estabas usando
} from '@/hooks/api';
import { AvailabilityRequest } from '@/models/requests';
import {
  AvailabilityResponse,
  PublicServiceDetailResponse,
} from '@/models/responses';

interface UseBookingViewReturn {
  // (El tipo de retorno no cambia)
  serviceDetails: PublicServiceDetailResponse | null | undefined;
  isLoadingService: boolean;
  isErrorService: boolean;
  selectedDate: Date | undefined;
  availabilityData: AvailabilityResponse[];
  isPendingAvailability: boolean;
  isErrorAvailability: boolean;
  handleDateSelect: (date: Date | undefined) => void;
  handleSlotSelect: (workerId: string, time: string) => void;
}

// CAMBIO 1: El hook ahora solo recibe 'serviceId'
export const useBookingView = (serviceId: string): UseBookingViewReturn => {
  // --- 1. LÓGICA DE DETALLES DEL SERVICIO (Sin cambios) ---
  const {
    data: serviceApiResponse,
    isLoading: isLoadingService,
    isError: isErrorService,
  } = useGetServiceByIdQuery(serviceId);
  const serviceDetails = serviceApiResponse?.data;

  // CAMBIO 2: Obtenemos el intervalo desde los detalles del servicio
  const slotIntervalMinutes = serviceDetails?.durationInMinutes;

  // --- 2. LÓGICA DE DISPONIBILIDAD ---
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const {
    data: availabilityApiResponse,
    mutate: checkAvailability,
    isPending: isPendingAvailability,
    isError: isErrorAvailability,
  } = useCheckAvailabilityMutation();

  // CAMBIO 3: 'fetchAvailability' ahora usa 'useCallback'
  const fetchAvailability = useCallback(
    (date: Date) => {
      // Guardia: Si no tenemos duración, no podemos buscar
      if (!slotIntervalMinutes) {
        return;
      }

      const dateOnly = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      const dateUTC = dateOnly.toISOString();

      const requestBody: AvailabilityRequest = {
        date: dateUTC,
        serviceIds: [serviceId],
        slotIntervalMinutes: slotIntervalMinutes, // Usamos el valor dinámico
      };
      checkAvailability(requestBody);
    },
    [serviceId, slotIntervalMinutes, checkAvailability] // Depende del intervalo
  );

  // CAMBIO 4: 'useEffect' ahora depende de 'slotIntervalMinutes'
  useEffect(() => {
    if (selectedDate && slotIntervalMinutes) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate, slotIntervalMinutes, fetchAvailability]);

  // Handler del calendario (sin cambios)
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      fetchAvailability(date);
    }
  };

  // Handler de selección de slot (sin cambios)
  const handleSlotSelect = (workerId: string, time: string) => {
    console.log('RESERVA FINAL:', {
      serviceId,
      date: selectedDate,
      workerId,
      time,
      duration: slotIntervalMinutes,
    });
  };

  const availabilityData = availabilityApiResponse?.data || [];

  return {
    serviceDetails,
    isLoadingService,
    isErrorService,
    selectedDate,
    availabilityData,
    isPendingAvailability,
    isErrorAvailability,
    handleDateSelect,
    handleSlotSelect,
  };
};
