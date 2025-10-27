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

  const confirmBooking = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!selectedService || !forWho.trim()) return;
      if (triggerAnimation) triggerAnimation(selectedService, event);
      addBooking(selectedService, forWho);
      setIsOpen(false);
    },
    [selectedService, forWho, addBooking, triggerAnimation]
  );

  const isConfirmDisabled = !forWho.trim() || !selectedService;

  return {
    isOpen,
    selectedService,
    forWho,
    setIsOpen,
    setForWho,
    openSheet,
    confirmBooking,
    isConfirmDisabled,
  };
};
