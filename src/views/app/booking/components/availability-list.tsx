'use client';

import { HiOutlineFolder } from 'react-icons/hi';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
} from '@/components/shadcn';
import { AvailabilityResponse } from '@/models/responses';

import { ProfessionalAvailabilityCard } from '.';

interface AvailabilityListProps {
  data: AvailabilityResponse[];
  onSlotSelect: (workerId: string, time: string) => void;
}

export const AvailabilityList: React.FC<AvailabilityListProps> = ({
  data,
  onSlotSelect,
}) => {
  // Caso 1: No hay disponibilidad (sin cambios)
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full font-montserrat text-muted-foreground border rounded-md">
        <HiOutlineFolder className="w-12 h-12 mt-2" />
        <p className="font-sans pb-2">No hay disponibilidad para este día.</p>
      </div>
    );
  }

  // Caso 2: Usar Acordeón para los profesionales
  return (
    <Accordion
      type="single" // Solo un profesional abierto a la vez
      collapsible // Se pueden cerrar todos
      className="w-full"
      defaultValue={data[0].workerId} // Abrir el primero por defecto
    >
      {data.map(profesional => (
        <AccordionItem
          value={profesional.workerId}
          key={profesional.workerId}
          className="border-0 shadow-lg rounded-md mb-2" // Cada item es una tarjeta
        >
          {/* El Trigger es la cabecera del profesional */}
          <AccordionTrigger className="flex w-full items-center font-montserrat justify-between p-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {profesional.workerName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium font-montserrat">
                {profesional.workerName}
              </span>
            </div>
            {/* El icono de 'chevron' del acordeón aparecerá aquí */}
          </AccordionTrigger>

          {/* El Contenido es la tarjeta del profesional */}
          <AccordionContent className="p-4 border-t">
            <ProfessionalAvailabilityCard
              profesional={profesional}
              onSlotSelect={onSlotSelect}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
