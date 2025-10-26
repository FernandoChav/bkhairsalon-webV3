'use client';

// CAMBIO 1: Importar Link
import { Clock } from 'lucide-react';

import { FC } from 'react';

import Link from 'next/link';

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
  onAddToCart: (
    service: ServiceResponse,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  formatPrice: (price: number) => string;
}

export const ServiceCardItem: FC<Props> = ({
  service,
  categoryName,
  onAddToCart,
  formatPrice,
}) => (
  <Card className="flex flex-col justify-between bg-white hover:shadow-lg transition-shadow">
    <Link href={`/booking/${service.id}`} className="flex flex-col grow">
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

      <CardContent className="grow">
        <p className="text-2xl font-bold text-neutral-900">
          {formatPrice(service.price)}
        </p>
      </CardContent>
    </Link>

    {/* El CardFooter queda FUERA del <Link> para que el botón
      tenga su propia acción (onAddToCart) y no navegue.
    */}
    <CardFooter>
      <Button onClick={e => onAddToCart(service, e)} className="w-full">
        Agregar al carrito
      </Button>
    </CardFooter>
  </Card>
);
