'use client';

import { useCallback, useState } from 'react';

import type { Service } from '@/models/entities';

export const useBookingSheet = (
  addBooking: (service: Service, forWho: string) => void,
  triggerAnimation?: (
    service: Service,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [forWho, setForWho] = useState('');

  const openSheet = useCallback((service: Service) => {
    setSelectedService(service);
    setForWho('');
    setIsOpen(true);
  }, []);
  const [selectedSlot, setSelectedSlot] = useState<{
    workerId: string;
    time: string;
  } | null>(null);
  const confirmBooking = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (
        !selectedService ||
        !forWho.trim() ||
        forWho.trim().length > 10 ||
        !selectedSlot
      )
        return;

      if (triggerAnimation) triggerAnimation(selectedService, event);

      addBooking(selectedService, forWho);

      console.log('Booking confirmed:', {
        service: selectedService,
        forWho,
        slot: selectedSlot,
      });

      setIsOpen(false);
    },
    [selectedService, forWho, selectedSlot, addBooking, triggerAnimation]
  );

  const isConfirmDisabled =
    !forWho.trim() || !selectedService || forWho.trim().length < 10;

  return {
    isOpen,
    selectedService,
    forWho,
    setIsOpen,
    setForWho,
    openSheet,
    confirmBooking,
    isConfirmDisabled,
    selectedSlot,
    setSelectedSlot,
  };
};
