'use client';

import { FC } from 'react';

import type { ServiceResponse } from '@/models/responses';

import { ServiceCardItem } from '.';

interface Props {
  services: ServiceResponse[];
  getCategoryName: (categoryId: string) => string;
  onAddToCart: (
    service: ServiceResponse,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  formatPrice: (price: number) => string;
}

export const ServiceList: FC<Props> = ({
  services,
  getCategoryName,
  onAddToCart,
  formatPrice,
}) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {services.map(service => (
      <ServiceCardItem
        key={service.id}
        service={service}
        categoryName={getCategoryName(service.categoryId)}
        onAddToCart={onAddToCart}
        formatPrice={formatPrice}
      />
    ))}
  </div>
);
