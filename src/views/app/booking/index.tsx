'use client';

// Componentes globales
import { HiOutlineClock } from 'react-icons/hi';

import Image from 'next/image';

// NUEVO: Importar icono de reloj

import {
  // Calendar ya no se usa
  Card,
  CardContent,
  CardHeader,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Skeleton,
} from '@/components/shadcn';

// Componentes locales
import { AvailabilityList } from './components/availability-list';
import { AvailabilitySkeleton } from './components/availability-skeleton';
// Importamos el nuevo selector de semana
import { WeekSelector } from './components/week-selector';
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
    return (
      <div className="flex flex-col gap-8">
        {/* Skeleton de Detalles */}
        <Card className="shadow-lg border-0">
          <Skeleton className="h-80 w-full rounded-t-lg" />
          <CardContent className="p-6">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-1/2 mb-2 font-serif" />
            <Skeleton className="h-6 w-1/4 mb-2" />{' '}
            {/* CAMBIO: Reducido mb-6 a mb-2 */}
            <Skeleton className="h-5 w-1/3 mb-6" />{' '}
            {/* NUEVO: Skeleton para la duración */}
            <Skeleton className="h-4 w-1/3 mb-2 font-serif" />
            <Skeleton className="h-4 w-full font-sans" />
            <Skeleton className="h-4 w-full mt-2 font-sans" />
          </CardContent>
        </Card>
        {/* Skeleton de Disponibilidad */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <Skeleton className="h-8 w-1/3 mb-2 font-serif" />
            <Skeleton className="h-4 w-1/2 mb-6 font-sans" />
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:items-start">
              {/* CAMBIO: Skeleton ahora es h-32 para coincidir con WeekSelector */}
              <Skeleton className="h-32 w-full max-w-sm mx-auto md:max-w-none md:mx-0 md:w-80 rounded-md border" />
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
        <h2 className="font-serif text-2xl font-semibold">
          Error al cargar el servicio
        </h2>
        <p className="font-sans mt-2">
          No pudimos encontrar los detalles de este servicio. Intenta de nuevo.
        </p>
      </div>
    );
  }

  // --- Renderizado Principal (Servicio cargado) ---
  return (
    <div className="flex flex-col gap-8">
      {/* --- PARTE 1: DETALLES DEL SERVICIO (REAL) --- */}

      <Card className="shadow-lg border-0 overflow-hidden">
        <CardHeader className="p-0">
          <Carousel
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {serviceDetails.images && serviceDetails.images.length > 0 ? (
                serviceDetails.images.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full h-80">
                      <Image
                        src={imageUrl}
                        alt={`${serviceDetails.name} - imagen ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="relative w-full h-80 bg-muted flex items-center justify-center text-muted-foreground font-sans">
                    Sin imagen disponible
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            {serviceDetails.images && serviceDetails.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-4" />
                <CarouselNext className="absolute right-4" />
              </>
            )}
          </Carousel>
        </CardHeader>
        <CardContent className="p-6">
          <span className="text-sm font-medium text-primary font-sans">
            Presencial
          </span>
          <h2 className="text-3xl font-bold mt-1 font-serif">
            {serviceDetails.name}
          </h2>
          <p className="text-lg text-muted-foreground mt-1 font-sans">
            ${serviceDetails.price.toLocaleString('es-CL')} CLP
          </p>

          <div className="flex items-center gap-1.5 text-base text-muted-foreground mt-2 font-sans">
            <HiOutlineClock className="w-4 h-4" />
            <span>Duración: {serviceDetails.durationInMinutes} minutos</span>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2 font-serif">
            Descripción
          </h3>
          <p className="text-muted-foreground font-sans">
            {serviceDetails.description}
          </p>
        </CardContent>
      </Card>

      {/* --- PARTE 2: SELECTOR DE DISPONIBILIDAD --- */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-1 font-serif">
            2. Disponibilidad
          </h2>
          <p className="text-muted-foreground mb-6 font-sans">
            Selecciona un horario
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:items-start">
            <div
              className="shrink-0 flex justify-center md:justify-start
                           w-full max-w-sm mx-auto md:w-80 md:max-w-none md:mx-0"
            >
              <WeekSelector
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>

            {/* Columna 2: Horarios */}
            <div className="flex flex-col w-full min-w-0">
              {/* Contenedor que crece */}
              <div className="flex-1">
                {isPendingAvailability && <AvailabilitySkeleton />}

                {!isPendingAvailability && isErrorAvailability && (
                  <div className="flex flex-col items-center justify-center h-full text-red-700 bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="font-medium font-sans">
                      Error al cargar la disponibilidad
                    </p>
                    <p className="text-sm font-sans">
                      Por favor, intenta refrescar la página.
                    </p>
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
                <p className="text-xs text-muted-foreground text-center mt-4 font-sans">
                  Horarios mostrados en la zona horaria del negocio
                  (Antofagasta, GMT-4)
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
