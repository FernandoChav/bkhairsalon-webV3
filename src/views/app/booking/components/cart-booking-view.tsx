'use client';

import { HiOutlineClock } from 'react-icons/hi';

// Ajusta esta ruta si es necesario
import { Card, CardContent, Skeleton } from '@/components/shadcn';
import { useFormatPrice } from '@/hooks/common';
import {
  AvailabilityList,
  AvailabilitySkeleton,
  WeekSelector,
} from '@/views/app/booking/components';
import { useCartBookingView } from '@/views/app/booking/hooks';

// El hook de precio que ya usas

export const CartBookingView: React.FC = () => {
  const {
    cart,
    totalPrice,
    totalDuration,
    selectedDate,
    availabilityData,
    isPendingAvailability,
    isErrorAvailability,
    handleDateSelect,
    handleSlotSelect,
  } = useCartBookingView();

  const formatPrice = useFormatPrice();

  return (
    <div className="flex flex-col gap-8">
      {/* --- PARTE 1: RESUMEN DEL CARRITO --- */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 font-montserrat">
            1. Tus Servicios
          </h2>

          <div className="flex flex-col gap-3 mb-4">
            {/* Lista de servicios en el carrito */}
            {cart.map(service => (
              <div
                key={service.id}
                className="flex justify-between items-center font-montserrat"
              >
                <span>{service.name}</span>
                <span className="font-medium">
                  {formatPrice(service.price)}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          {/* Totales */}
          <div className="space-y-2 font-sans">
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Duración total estimada</span>
              <div className="flex items-center gap-1.5">
                <HiOutlineClock className="w-4 h-4" />
                <span>{totalDuration} minutos</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- PARTE 2: SELECTOR DE DISPONIBILIDAD --- */}
      {/* Esta parte es idéntica a la de 'BookingView' */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-1 font-montserrat">
            2. Disponibilidad
          </h2>
          <p className="text-muted-foreground mb-6 font-montserrat">
            Selecciona un horario para tu cita
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:items-start">
            {/* Columna 1: WeekSelector */}
            <div className="shrink-0 flex justify-center md:justify-start w-full max-w-sm mx-auto md:w-80 md:max-w-none md:mx-0">
              {selectedDate ? (
                <WeekSelector
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              ) : (
                <Skeleton className="h-32 w-full md:w-80 rounded-md border" />
              )}
            </div>

            {/* Columna 2: Horarios */}
            <div className="flex flex-col w-full min-w-0">
              <div className="flex-1">
                {isPendingAvailability && <AvailabilitySkeleton />}

                {!isPendingAvailability && isErrorAvailability && (
                  <div className="text-center text-destructive">
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
