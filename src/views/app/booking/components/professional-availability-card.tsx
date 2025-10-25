'use client';

import { useState } from 'react';

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn';
import { AvailabilityResponse } from '@/models/responses';

// --- Definiciones y Lógica de Filtro (Sin cambios) ---
type TimeSlotFilter = 'morning' | 'afternoon';

const filterTimeBlocks = (
  blocks: { start: string }[],
  filter: TimeSlotFilter
) => {
  return blocks.filter(slot => {
    const hour = parseInt(slot.start.substring(0, 2));
    if (filter === 'morning') {
      return hour >= 8 && hour < 13;
    }
    if (filter === 'afternoon') {
      return hour >= 13 && hour < 20;
    }
    return true;
  });
};
// ------------------------------------

interface ProfessionalAvailabilityCardProps {
  profesional: AvailabilityResponse;
  onSlotSelect: (workerId: string, time: string) => void;
}

export const ProfessionalAvailabilityCard: React.FC<
  ProfessionalAvailabilityCardProps
> = ({ profesional, onSlotSelect }) => {
  const [activeFilter, setActiveFilter] = useState<TimeSlotFilter>('morning');

  const morningSlots = filterTimeBlocks(
    profesional.availableTimeBlocks,
    'morning'
  );
  const afternoonSlots = filterTimeBlocks(
    profesional.availableTimeBlocks,
    'afternoon'
  );

  return (
    <div className="w-full">
      {/* Tabs (Mañana/Tarde) */}
      <Tabs
        value={activeFilter}
        onValueChange={value => setActiveFilter(value as TimeSlotFilter)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="morning">Mañana</TabsTrigger>
          <TabsTrigger value="afternoon">Tarde</TabsTrigger>
        </TabsList>

        {/* Contenido de "Mañana" */}
        <TabsContent value="morning" className="pt-4">
          {morningSlots.length > 0 ? (
            // CAMBIO 1: Añadir 'px-10' (padding horizontal) al Carousel
            <Carousel
              opts={{ align: 'start', dragFree: true }}
              className="w-full relative px-10"
            >
              <CarouselContent className="-ml-2">
                {morningSlots.map(slot => (
                  <CarouselItem
                    key={slot.start}
                    className="pl-2 basis-1/3 sm:basis-1/4"
                  >
                    <Button
                      variant="outline"
                      className="font-normal font-sans w-full"
                      onClick={() =>
                        onSlotSelect(profesional.workerId, slot.start)
                      }
                    >
                      {slot.start.substring(0, 5)}
                    </Button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* CAMBIO 2: Posicionar botones DENTRO del padding */}
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
            </Carousel>
          ) : (
            <p className="text-sm text-muted-foreground text-center pt-6 font-sans">
              No hay horas disponibles en la mañana.
            </p>
          )}
        </TabsContent>

        {/* Contenido de "Tarde" */}
        <TabsContent value="afternoon" className="pt-4">
          {afternoonSlots.length > 0 ? (
            // CAMBIO 1: Añadir 'px-10' (padding horizontal) al Carousel
            <Carousel
              opts={{ align: 'start', dragFree: true }}
              className="w-full relative px-10"
            >
              <CarouselContent className="-ml-2">
                {afternoonSlots.map(slot => (
                  <CarouselItem
                    key={slot.start}
                    className="pl-2 basis-1/3 sm:basis-1/4"
                  >
                    <Button
                      variant="outline"
                      className="font-normal font-sans w-full"
                      onClick={() =>
                        onSlotSelect(profesional.workerId, slot.start)
                      }
                    >
                      {slot.start.substring(0, 5)}
                    </Button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* CAMBIO 2: Posicionar botones DENTRO del padding */}
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
            </Carousel>
          ) : (
            <p className="text-sm text-muted-foreground text-center pt-6 font-sans">
              No hay horas disponibles en la tarde.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
