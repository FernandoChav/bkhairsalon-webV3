'use client';

import { CardContent } from '@/components/shadcn/card';
import { Skeleton } from '@/components/shadcn/skeleton';
import { LoadingSpinner } from '@/components/ui';

import { AvailabilityList, WeekSelector } from '.';
import { useAvailabilitySelector } from '../hooks';

interface AvailabilitySelectorProps {
  serviceId: string;
  slotIntervalMinutes: number;
  selectedSlot?: {
    workerId: string;
    time: string;
  } | null;
  setSelectedSlot: (slot: { workerId: string; time: string } | null) => void;
}

export const AvailabilitySelector = ({
  serviceId,
  slotIntervalMinutes,
  setSelectedSlot,
}: AvailabilitySelectorProps) => {
  const {
    selectedDate,
    setSelectedDate,
    availabilityData,
    isPending,
    isError,
  } = useAvailabilitySelector({
    serviceId,
    slotIntervalMinutes,
  });
  const handleSlotSelect = (workerId: string, time: string) => {
    setSelectedSlot({ workerId, time });
  };

  // Handle date selection from WeekSelector
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border-border border-0">
      <CardContent>
        <h2 className="text-2xl font-bold font-montserrat">Disponibilidad</h2>
        <p className="text-muted-foreground mb-2 font-montserrat">
          Selecciona un horario y estilista para tu cita
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:items-start">
          {/* Column 1: WeekSelector */}
          <div className="shrink-0 flex justify-center md:justify-start w-full max-w-sm mx-auto md:w-80 md:max-w-none md:mx-0">
            {selectedDate ? (
              <WeekSelector
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            ) : (
              <Skeleton className="h-32 w-full md:w-80 rounded-md border" />
            )}
          </div>

          {/* Column 2: Time Slots */}
          <div className="flex flex-col w-full min-w-0">
            <div className="flex-1">
              {isPending && (
                <div className="flex justify-center items-center h-48">
                  <LoadingSpinner />
                </div>
              )}

              {isError && (
                <div className="text-center text-destructive font-montserrat h-48 flex items-center justify-center">
                  <p className="font-sans">
                    Error al cargar la disponibilidad.
                  </p>
                </div>
              )}

              {!isPending && !isError && (
                <AvailabilityList
                  data={availabilityData}
                  onSlotSelect={handleSlotSelect}
                />
              )}
            </div>

            {!isPending && (
              <p className="text-xs text-muted-foreground text-center mt-2 font-sans">
                Horarios mostrados en la zona horaria del negocio
                (Antofagasta/GMT-3)
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  );
};
