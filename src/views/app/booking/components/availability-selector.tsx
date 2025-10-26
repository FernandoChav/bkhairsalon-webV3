'use client';

import { useEffect, useState } from 'react';

// --- Tus Componentes Existentes ---
import { Calendar } from '@/components/shadcn';
import { LoadingSpinner } from '@/components/ui';
import { useCheckAvailabilityMutation } from '@/hooks/api';
// Hook de API global
import { AvailabilityRequest } from '@/models/requests';

// --- Componente Hijo ---
import { AvailabilityList } from './availability-list';

interface AvailabilitySelectorProps {
  serviceId: string;
  slotIntervalMinutes: number;
}

export const AvailabilitySelector = ({
  serviceId,
  slotIntervalMinutes,
}: AvailabilitySelectorProps) => {
  // Estado para el día seleccionado en el calendario
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const {
    data: apiResponse,
    mutate: checkAvailability,
    isPending,
    isError,
  } = useCheckAvailabilityMutation();

  // Efecto: Llama a la API cada vez que selectedDate cambia
  useEffect(() => {
    if (!selectedDate) return;
    const dateOnly = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );
    const dateUTC = dateOnly.toISOString();
    const requestBody: AvailabilityRequest = {
      date: dateUTC,
      serviceIds: [serviceId],
      slotIntervalMinutes: slotIntervalMinutes,
    };
    checkAvailability(requestBody);
  }, [selectedDate, serviceId, slotIntervalMinutes, checkAvailability]);

  // Extrae los datos (array de profesionales)
  const availabilityData = apiResponse?.data || [];

  // Define la función que se pasará a AvailabilityList
  const handleSlotSelect = (workerId: string, time: string) => {
    console.log('Slot seleccionado en AvailabilitySelector:', {
      serviceId,
      date: selectedDate,
      workerId,
      time,
    });
  };

  return (
    // Contenedor principal
    <div className="flex flex-col lg:flex-row gap-8 p-4">
      {/* Columna 1: Calendario */}
      <div className="shrink-0 flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>

      {/* Columna 2: Horarios */}
      <div className="flex-1">
        {isPending && (
          <div className="flex justify-center items-center h-48">
            <LoadingSpinner />
          </div>
        )}

        {isError && (
          <div className="text-center text-destructive font-montserrat h-48 flex items-center justify-center">
            {/* CAMBIO: Añadido font-sans */}
            <p className="font-sans">Error al cargar la disponibilidad.</p>
          </div>
        )}

        {!isPending && !isError && (
          <AvailabilityList
            data={availabilityData}
            onSlotSelect={handleSlotSelect}
          />
        )}
        {/* ------------------------------------ */}

        {/* CAMBIO: Añadido font-sans */}
        <p className="text-xs text-muted-foreground font-montserrat text-center mt-4 font-sans">
          Horarios mostrados en la zona horaria del negocio (America/Santiago)
        </p>
      </div>
    </div>
  );
};
