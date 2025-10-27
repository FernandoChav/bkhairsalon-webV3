import { useMemo, useState } from 'react';

import type { BookedService, Service } from '@/models/entities';

export const useBookedServices = () => {
  const [bookedServices, setBookedServices] = useState<BookedService[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice = useMemo(
    () => bookedServices.reduce((sum, item) => sum + item.price, 0),
    [bookedServices]
  );

  const addBooking = (service: Service, forWho: string) => {
    if (!forWho.trim()) return;
    const booked: BookedService = {
      ...service,
      id: `${service.name}-${Date.now()}`,
      forWho: forWho.trim(),
    };
    setBookedServices(prev => [...prev, booked]);
  };

  const removeBooking = (id: string) => {
    setBookedServices(prev => prev.filter(item => item.id !== id));
  };

  const toggleDrawer = () => setIsOpen(prev => !prev);

  const handleContinue = (onNavigate?: () => void) => {
    if (onNavigate) onNavigate();
  };

  return {
    bookedServices,
    totalPrice,
    isOpen,
    setIsOpen,
    addBooking,
    removeBooking,
    toggleDrawer,
    handleContinue,
  };
};
