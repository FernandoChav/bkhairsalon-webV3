'use client';

// CAMBIO 1: Importar useState y Tabs
import { HiInformationCircle, HiOutlineFolder } from 'react-icons/hi';

import { useState } from 'react';

import {
  Avatar,
  AvatarFallback,
  Button,
  Tabs,
  // Importar Tabs
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn';
import { AvailabilityResponse } from '@/models/responses';

// Definimos los tramos
type TimeSlotFilter = 'morning' | 'afternoon';

interface AvailabilityListProps {
  data: AvailabilityResponse[];
  onSlotSelect: (workerId: string, time: string) => void;
}

// --- Lógica de filtrado ---
// (Puedes mover esta función a un archivo 'utils' si prefieres)
const filterTimeBlocks = (
  blocks: { start: string }[],
  filter: TimeSlotFilter
) => {
  return blocks.filter(slot => {
    const hour = parseInt(slot.start.substring(0, 2)); // "09:00" -> 9

    if (filter === 'morning') {
      return hour >= 8 && hour < 13; // 8:00 AM - 12:59 PM
    }
    if (filter === 'afternoon') {
      return hour >= 13 && hour < 20; // 1:00 PM - 7:59 PM
    }
    return true;
  });
};
// -------------------------

export const AvailabilityList: React.FC<AvailabilityListProps> = ({
  data,
  onSlotSelect,
}) => {
  // CAMBIO 2: Añadir estado para el filtro activo
  const [activeFilter, setActiveFilter] = useState<TimeSlotFilter>('morning');

  // Caso 1: No hay disponibilidad
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground border rounded-md">
        <HiOutlineFolder className="w-12 h-12" />
        <p className="font-sans">No hay disponibilidad para este día.</p>
      </div>
    );
  }

  // Caso 2: Hay profesionales disponibles
  return (
    <div className="flex flex-col gap-6">
      {data.map(profesional => {
        // CAMBIO 3: Filtrar los bloques ANTES de mapearlos
        const morningSlots = filterTimeBlocks(
          profesional.availableTimeBlocks,
          'morning'
        );
        const afternoonSlots = filterTimeBlocks(
          profesional.availableTimeBlocks,
          'afternoon'
        );

        return (
          <div
            key={profesional.workerId}
            className="shadow-lg rounded-md border-0"
          >
            {/* Tarjeta del Profesional */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {profesional.workerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium font-sans">
                  {profesional.workerName}
                </span>
              </div>
              <HiInformationCircle className="w-5 h-5 text-muted-foreground cursor-pointer" />
            </div>

            {/* CAMBIO 4: Añadir los Tabs */}
            <Tabs
              value={activeFilter}
              onValueChange={value => setActiveFilter(value as TimeSlotFilter)}
              className="w-full p-4"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="morning">Mañana</TabsTrigger>
                <TabsTrigger value="afternoon">Tarde</TabsTrigger>
              </TabsList>

              {/* Contenido de "Mañana" */}
              <TabsContent value="morning">
                {morningSlots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-4">
                    {morningSlots.map(slot => (
                      <Button
                        key={slot.start}
                        variant="outline"
                        className="font-normal font-sans"
                        onClick={() =>
                          onSlotSelect(profesional.workerId, slot.start)
                        }
                      >
                        {slot.start.substring(0, 5)}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center pt-6 font-sans">
                    No hay horas disponibles en la mañana.
                  </p>
                )}
              </TabsContent>

              {/* Contenido de "Tarde" */}
              <TabsContent value="afternoon">
                {afternoonSlots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-4">
                    {afternoonSlots.map(slot => (
                      <Button
                        key={slot.start}
                        variant="outline"
                        className="font-normal font-sans"
                        onClick={() =>
                          onSlotSelect(profesional.workerId, slot.start)
                        }
                      >
                        {slot.start.substring(0, 5)}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center pt-6 font-sans">
                    No hay horas disponibles en la tarde.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        );
      })}
    </div>
  );
};
