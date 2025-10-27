// hooks/use-availability-selector.ts
'use client';

import { useEffect, useState } from 'react';

import { useCheckAvailabilityMutation } from '@/hooks/api';
import { AvailabilityRequest } from '@/models/requests';

// hooks/use-availability-selector.ts

// hooks/use-availability-selector.ts

// hooks/use-availability-selector.ts

// hooks/use-availability-selector.ts

interface UseAvailabilitySelectorProps {
  serviceId: string;
  slotIntervalMinutes: number;
}

export const useAvailabilitySelector = ({
  serviceId,
  slotIntervalMinutes,
}: UseAvailabilitySelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const {
    data: apiResponse,
    mutate: checkAvailability,
    isPending,
    isError,
  } = useCheckAvailabilityMutation();

  // Extract availability data
  const availabilityData = apiResponse?.data || [];

  // Check availability when date changes
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

  // Handle slot selection
  const handleSlotSelect = (workerId: string, time: string) => {
    console.log('Slot seleccionado:', {
      serviceId,
      date: selectedDate,
      workerId,
      time,
    });
    // You can return this data or call a callback here
    return { serviceId, date: selectedDate, workerId, time };
  };

  return {
    selectedDate,
    setSelectedDate,
    availabilityData,
    isPending,
    isError,
    handleSlotSelect,
  };
};
