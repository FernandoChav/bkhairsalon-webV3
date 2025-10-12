import {
  HiClock,
  HiCurrencyDollar,
  HiInformationCircle,
  HiScissors,
  HiUser,
} from 'react-icons/hi';

import { FC } from 'react';

import {
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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

        <div className="mt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-lg">
              <TabsTrigger
                value="general"
                className="cursor-pointer rounded-lg"
              >
                <HiInformationCircle className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="pricing"
                className="cursor-pointer rounded-lg"
              >
                <HiCurrencyDollar className="h-4 w-4 mr-2" />
                Precios
              </TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-4 mt-4">
              {/* Description */}
              <div>
                <h3 className="text-sm font-medium mb-2">Descripción</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description || 'Sin descripción'}
                </p>
              </div>

              <Separator />

              {/* Schedule */}
              <div>
                <h3 className="text-sm font-medium mb-2">Horario</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Hora inicio:
                    </span>
                    <span className="text-sm font-medium">
                      {service.startTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Hora fin:
                    </span>
                    <span className="text-sm font-medium">
                      {service.endTime}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Duration */}
              <div>
                <h3 className="text-sm font-medium mb-2">Duración</h3>
                <div className="flex items-center gap-2">
                  <HiClock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{service.duration} minutos</span>
                </div>
              </div>

              <Separator />

              {/* Commission */}
              <div>
                <h3 className="text-sm font-medium mb-2">Comisión</h3>
                <div className="flex items-center gap-2">
                  <HiUser className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {service.commissionPercentage}%
                  </span>
                </div>
              </div>

              <Separator />

              {/* Order Information */}
              <div>
                <h3 className="text-sm font-medium mb-2">Orden</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Orden de visualización:
                  </span>
                  <span className="text-sm font-medium">
                    {service.sortOrder}
                  </span>
                </div>
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-4 mt-4">
              {/* Price Information */}
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Información de Precios
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Precio base:
                    </span>
                    <span className="text-sm font-medium">
                      ${service.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Comisión:
                    </span>
                    <span className="text-sm font-medium">
                      {service.commissionPercentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Ganancia por servicio:
                    </span>
                    <span className="text-sm font-medium text-primary">
                      $
                      {Math.round(
                        service.price * (service.commissionPercentage / 100)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Duration and Efficiency */}
              <div>
                <h3 className="text-sm font-medium mb-2">Eficiencia</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Duración:
                    </span>
                    <span className="text-sm font-medium">
                      {service.duration} min
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Precio por minuto:
                    </span>
                    <span className="text-sm font-medium">
                      $
                      {Math.round(
                        service.price / service.duration
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Identifiers */}
              <div>
                <h3 className="text-sm font-medium mb-2">Identificadores</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ID:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded-lg border border-border">
                      {service.id}
                    </code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      ID Categoría:
                    </span>
                    <code className="text-xs bg-muted px-2 py-1 rounded-lg border border-border">
                      {service.categoryId}
                    </code>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Dates */}
              <div>
                <h3 className="text-sm font-medium mb-2">Fechas</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Creado:
                    </span>
                    <span className="text-xs">
                      {new Date(service.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Actualizado:
                    </span>
                    <span className="text-xs">
                      {new Date(service.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
