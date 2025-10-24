'use client';

import { useMemo } from 'react';

export const useFormatPrice = () => {
  const formatPrice = useMemo(() => {
    return (price: number) => {
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
      }).format(price);
    };
  }, []);

  return formatPrice;
};
