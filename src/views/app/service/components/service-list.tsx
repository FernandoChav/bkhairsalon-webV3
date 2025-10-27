'use client';

import { FC } from 'react';

import { Service } from '@/models/entities';

import { ServiceCardItem } from '.';

interface Props {
  services: Service[];
  getCategoryName: (categoryId: string) => string;
  openBookingSheet: (service: Service) => void;
  formatPrice: (price: number) => string;
}

export const ServiceList: FC<Props> = ({
  services,
  getCategoryName,
  openBookingSheet,
  formatPrice,
}) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {services.map(service => (
      <ServiceCardItem
        key={service.id}
        service={service}
        categoryName={getCategoryName(service.categoryId)}
        openBookingSheet={openBookingSheet}
        formatPrice={formatPrice}
      />
    ))}
  </div>
);
