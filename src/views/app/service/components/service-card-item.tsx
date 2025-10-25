'use client';

import { Clock } from 'lucide-react';

import { FC } from 'react';

import { Badge } from '@/components/shadcn/badge';
import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import type { ServiceResponse } from '@/models/responses';

interface Props {
  service: ServiceResponse;
  categoryName: string;
  onAddToCart: (service: ServiceResponse) => void;
  formatPrice: (price: number) => string;
}

export const ServiceCardItem: FC<Props> = ({
  service,
  categoryName,
  onAddToCart,
  formatPrice,
}) => (
  <Card className="flex flex-col bg-white hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex justify-between items-start mb-2">
        <Badge variant="secondary" className="text-xs">
          {categoryName}
        </Badge>
        <div className="flex items-center text-neutral-600">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{service.duration} min</span>
        </div>
      </div>
      <CardTitle className="text-xl">{service.name}</CardTitle>
      <CardDescription>{service.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-2xl font-bold text-neutral-900">
        {formatPrice(service.price)}
      </p>
    </CardContent>
    <CardFooter>
      <Button onClick={() => onAddToCart(service)} className="w-full">
        Agregar al carrito
      </Button>
    </CardFooter>
  </Card>
);
