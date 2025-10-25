'use client';

// Importa tu componente Skeleton
import { HiInformationCircle } from 'react-icons/hi';

import { FC } from 'react';

import { Skeleton } from '@/components/shadcn';

// Para el icono

export const AvailabilitySkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Esqueleto de 1 profesional (puedes repetir este bloque si esperas más) */}
      <div>
        {/* Tarjeta del Profesional */}
        <div className="flex items-center justify-between p-4 border rounded-t-md">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />{' '}
            {/* Skeleton del Avatar */}
            <Skeleton className="h-5 w-32" /> {/* Skeleton del Nombre */}
          </div>
          <HiInformationCircle className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Grilla de Horarios */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-4 border border-t-0 rounded-b-md">
          {/* Skeletons para los botones de hora */}
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </div>
  );
};
