'use client';

import { HiInformationCircle, HiOutlineFolder } from 'react-icons/hi';

import { Avatar, AvatarFallback, Button } from '@/components/shadcn';
import { AvailabilityResponse } from '@/models/responses';

interface AvailabilityListProps {
  data: AvailabilityResponse[];
  onSlotSelect: (workerId: string, time: string) => void;
}

export const AvailabilityList: React.FC<AvailabilityListProps> = ({
  data,
  onSlotSelect,
}) => {
  // Caso 1: No hay disponibilidad
  if (data.length === 0) {
    return (
      // === CÓDIGO LIMPIO CON h-full ===
      <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground border rounded-md">
        <HiOutlineFolder className="w-12 h-12" />
        <p>No hay disponibilidad para este día.</p>
      </div>
    );
  }

  // Caso 2: Hay profesionales disponibles
  return (
    <div className="flex flex-col gap-6">
      {data.map(profesional => (
        <div key={profesional.workerId}>
          {/* Tarjeta del Profesional */}
          <div className="flex items-center justify-between p-4 border rounded-t-md">
            <div className="flex items-center gap-3">
              <Avatar>
                {/* <AvatarImage src={profesional.workerImageUrl} alt={profesional.workerName} /> */}
                <AvatarFallback>
                  {profesional.workerName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{profesional.workerName}</span>
            </div>
            <HiInformationCircle className="w-5 h-5 text-muted-foreground cursor-pointer" />
          </div>

          {/* Grilla de Horarios (Slots) */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-4 border border-t-0 rounded-b-md">
            {profesional.availableTimeBlocks.map(slot => (
              <Button
                key={slot.start}
                variant="outline"
                className="font-normal"
                onClick={() => onSlotSelect(profesional.workerId, slot.start)}
              >
                {/* Formateamos "09:00:00" a "09:00" */}
                {slot.start.substring(0, 5)}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
