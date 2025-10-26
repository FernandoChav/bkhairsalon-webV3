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

      {/* CAMBIO 1: Contenedor principal ahora usa shadow-lg para imitar a AvailabilityList */}
      <div className="shadow-lg rounded-md border-0">
        {/* Tarjeta del Profesional */}
        {/* CAMBIO 2: Se quita el borde exterior y se añade solo un borde inferior (border-b) */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />{' '}
            {/* Skeleton del Avatar */}
            {/* CAMBIO 3: Añadido font-sans para consistencia */}
            <Skeleton className="h-5 w-32 font-sans" />{' '}
            {/* Skeleton del Nombre */}
          </div>
          <HiInformationCircle className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Grilla de Horarios */}
        {/* CAMBIO 4: Se quitan los bordes de la grilla */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-4">
          {/* Skeletons para los botones de hora */}
          {/* CAMBIO 5: Añadido font-sans a todos los botones */}
          <Skeleton className="h-9 w-full font-sans" />
          <Skeleton className="h-9 w-full font-sans" />
          <Skeleton className="h-9 w-full font-sans" />
          <Skeleton className="h-9 w-full font-sans" />
          <Skeleton className="h-9 w-full font-sans" />
          <Skeleton className="h-9 w-full font-sans" />
          <Skeleton className="h-9 w-full font-sans" />
          <Skeleton className="h-9 w-full font-sans" />
        </div>
      </div>
    </div>
  );
};
