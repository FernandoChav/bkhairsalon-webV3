'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCheckAvailabilityMutation } from '@/hooks/api';
// Asumo que useCartActions está aquí
import { AvailabilityRequest } from '@/models/requests';
import { AvailabilityResponse, ServiceResponse } from '@/models/responses';
import { useCartActions } from '@/views/app/service/hooks';

// El 'useCartActions' que nos diste
// import { useCartActions } from '@/views/app/service/hooks';

interface UseCartBookingViewReturn {
  // Estado del Carrito
  cart: ServiceResponse[]; // Del hook existente
  totalPrice: number; // Del hook existente
  totalDuration: number; // Nuevo cálculo

  // Estado de Disponibilidad
  selectedDate: Date | undefined;
  availabilityData: AvailabilityResponse[];
  isPendingAvailability: boolean;
  isErrorAvailability: boolean;

  // Handlers
  handleDateSelect: (date: Date | undefined) => void;
  handleSlotSelect: (workerId: string, time: string) => void;
}

export const useCartBookingView = (): UseCartBookingViewReturn => {
  // 1. OBTENER ESTADO DEL CARRITO
  // Reutilizamos el hook que tu compañero ya creó
  const { cart, totalPrice, handleCheckout } = useCartActions();

  // 2. CALCULAR IDS Y DURACIÓN TOTAL
  // Usamos 'useMemo' para eficiencia
  const serviceIds = useMemo(() => cart.map(s => s.id), [cart]);

  const totalDuration = useMemo(
    () => cart.reduce((sum, service) => sum + service.duration, 0),
    [cart]
  );

  // 3. LÓGICA DE DISPONIBILIDAD (Muy similar a la otra)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const {
    data: availabilityApiResponse,
    mutate: checkAvailability,
    isPending: isPendingAvailability,
    isError: isErrorAvailability,
  } = useCheckAvailabilityMutation();

  const fetchAvailability = useCallback(
    (date: Date) => {
      // Guardia: No buscar si el carrito está vacío o la duración es 0
      if (serviceIds.length === 0 || totalDuration === 0) {
        return;
      }

      const dateOnly = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      const dateUTC = dateOnly.toISOString();

      const requestBody: AvailabilityRequest = {
        date: dateUTC,
        serviceIds: serviceIds, // ¡Pasamos el array de IDs!
        slotIntervalMinutes: totalDuration, // ¡Pasamos la duración total!
      };
      checkAvailability(requestBody);
    },
    [serviceIds, totalDuration, checkAvailability]
  );

  // Efecto de carga inicial
  useEffect(() => {
    if (selectedDate && totalDuration > 0) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate, totalDuration, fetchAvailability]);

  // Handlers
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      fetchAvailability(date);
    }
  };

  const handleSlotSelect = (workerId: string, time: string) => {
    console.log('RESERVA FINAL DEL CARRITO:', {
      serviceIds,
      date: selectedDate,
      workerId,
      time,
      totalDuration,
    });
    // Aquí podrías llamar a 'handleCheckout' si ese hook
    // se encarga de limpiar el carrito y navegar.
    // handleCheckout();
  };

  const availabilityData = availabilityApiResponse?.data || [];

  return {
    cart,
    totalPrice,
    totalDuration,
    selectedDate,
    availabilityData,
    isPendingAvailability,
    isErrorAvailability,
    handleDateSelect,
    handleSlotSelect,
  };
};

// No olvides exportar este hook desde 'hooks/api/index.ts'
