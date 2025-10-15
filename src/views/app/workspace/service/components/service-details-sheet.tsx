import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { HiScissors } from 'react-icons/hi';

import { FC } from 'react';

import {
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shadcn';
import { ServiceResponse } from '@/models/responses';

interface ServiceDetailsSheetProps {
  service: ServiceResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceDetailsSheet: FC<ServiceDetailsSheetProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  if (!service) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es });
  };

  const formatTime = (timeString: string) => {
    // Extraer solo HH:MM del formato completo
    const time = new Date(`2000-01-01T${timeString}`);
    return format(time, 'HH:mm');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-6 border-l border-border [&>button]:cursor-pointer">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <HiScissors className="h-6 w-6 text-orange-500" />
            <div>
              <SheetTitle>{service.name}</SheetTitle>
              <SheetDescription>
                Servicio de {service.duration} minutos
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Descripción</h3>
            <p className="text-sm text-muted-foreground">
              {service.description || 'Sin descripción'}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Duración</span>
              <span className="text-sm font-medium">
                {service.duration} minutos
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Hora de inicio
              </span>
              <span className="text-sm font-medium">
                {formatTime(service.startTime)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Hora de fin</span>
              <span className="text-sm font-medium">
                {formatTime(service.endTime)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Precio</span>
              <span className="text-sm font-medium">
                ${service.price.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Comisión</span>
              <span className="text-sm font-medium">
                {service.commissionPercentage}%
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Creado</span>
              <span className="text-sm font-medium">
                {formatDate(service.createdAt)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Última actualización
              </span>
              <span className="text-sm font-medium">
                {formatDate(service.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
