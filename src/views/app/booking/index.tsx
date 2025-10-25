'use client';

// Componentes globales
import Image from 'next/image';

import {
  Calendar,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
} from '@/components/shadcn';

// Componentes locales
import { AvailabilityList } from './components/availability-list';
import { AvailabilitySkeleton } from './components/availability-skeleton';
// Hook de lógica local
import { useBookingView } from './hooks/use-booking-view';

interface BookingViewProps {
  serviceId: string;
  slotIntervalMinutes: number;
}

export const BookingView: React.FC<BookingViewProps> = ({
  serviceId,
  slotIntervalMinutes,
}) => {
  const {
    // Servicio
    serviceDetails,
    isLoadingService,
    isErrorService,
    // Disponibilidad
    selectedDate,
    availabilityData,
    isPendingAvailability,
    isErrorAvailability,
    // Handlers
    handleDateSelect,
    handleSlotSelect,
  } = useBookingView(serviceId, slotIntervalMinutes);

  // --- Renderizado de Carga del Servicio ---
  if (isLoadingService) {
    // (El Skeleton completo de carga inicial)
    return (
      <div className="flex flex-col gap-8">
        {/* Skeleton de Detalles */}
        <Card>
          <Skeleton className="h-64 w-full rounded-t-lg" />
          <CardContent className="p-6">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardContent>
        </Card>
        {/* Skeleton de Disponibilidad */}
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-8 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-6" />
            <div className="flex flex-col md:flex-row gap-8">
              <Skeleton className="h-80 w-full max-w-sm mx-auto md:max-w-none md:mx-0 md:w-80 rounded-md border" />
              <div className="flex-1">
                <AvailabilitySkeleton />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Renderizado de Error del Servicio ---
  if (isErrorService || !serviceDetails) {
    return (
      <div className="text-center text-destructive py-12">
        <h2>Error al cargar el servicio</h2>
        <p>
          No pudimos encontrar los detalles de este servicio. Intenta de nuevo.
        </p>
      </div>
    );
  }

  // --- Renderizado Principal (Servicio cargado) ---
  return (
    <div className="flex flex-col gap-8">
      {/* --- PARTE 1: DETALLES DEL SERVICIO (REAL) --- */}

      <Card>
        <CardHeader className="p-0">
          <div className="relative w-full h-80 overflow-hidden rounded-t-lg">
            {serviceDetails.images && serviceDetails.images.length > 0 ? (
              <Image
                src={serviceDetails.images[0]}
                alt={serviceDetails.name}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="bg-muted h-full flex items-center justify-center text-muted-foreground">
                Sin imagen disponible
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <span className="text-sm font-medium text-primary">Presencial</span>
          <h2 className="text-3xl font-bold mt-1">{serviceDetails.name}</h2>
          <p className="text-lg text-muted-foreground mt-1">
            ${serviceDetails.price.toLocaleString('es-CL')} CLP
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-2">Descripción</h3>
          <p className="text-muted-foreground">{serviceDetails.description}</p>
        </CardContent>
      </Card>

      {/* --- PARTE 2: SELECTOR DE DISPONIBILIDAD --- */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-1">2. Disponibilidad</h2>
          <p className="text-muted-foreground mb-6">Selecciona un horario</p>

          {/* === SOLUCIÓN CON CSS GRID === */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
            {/* Columna 1: Calendario */}
            <div
              className="flex-shrink-0 flex justify-center md:justify-start
                            w-full max-w-sm mx-auto md:max-w-none md:mx-0"
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border p-2 scale-95 md:scale-100"
                disabled={date =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </div>

            {/* Columna 2: Horarios */}
            <div className="flex flex-col w-full">
              {/* Contenedor que crece */}
              <div className="flex-1">
                {isPendingAvailability && <AvailabilitySkeleton />}

                {!isPendingAvailability && isErrorAvailability && (
                  <div className="flex flex-col items-center justify-center h-full text-destructive border border-destructive rounded-md p-4">
                    <p>Error al cargar la disponibilidad.</p>
                  </div>
                )}

                {!isPendingAvailability && !isErrorAvailability && (
                  <AvailabilityList
                    data={availabilityData}
                    onSlotSelect={handleSlotSelect}
                  />
                )}
              </div>

              {/* Texto de Zona Horaria */}
              {!isPendingAvailability && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Horarios mostrados en la zona horaria del negocio
                  (America/Santiago)
                </p>
              )}
            </div>
          </div>
          {/* === FIN DE LA SOLUCIÓN === */}
        </CardContent>
      </Card>
    </div>
  );
};
