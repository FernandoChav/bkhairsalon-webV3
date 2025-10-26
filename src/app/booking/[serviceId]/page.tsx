'use client';

import { useParams } from 'next/navigation';

import { BookingView } from '@/views';

// Ya NO necesitamos TEST_INTERVAL

export default function BookingPage() {
  const params = useParams();

  const serviceId = Array.isArray(params.serviceId)
    ? params.serviceId[0]
    : params.serviceId;

  if (!serviceId) {
    return <div>Cargando...</div>; // O un skeleton
  }

  return (
    <div className="pt-12">
      <div className="max-w-4xl mx-auto pb-12">
        <h1 className="text-3xl font-bold font-serif px-4 sm:px-0">
          Reserva tu Cita
        </h1>
        <p className="text-muted-foreground mb-8 font-sans px-4 sm:px-0">
          Selecciona un día y hora para tu servicio.
        </p>

        <hr className="my-8 mx-4 sm:mx-0" />

        {/* CAMBIO: Ahora solo pasamos 'serviceId'.
          BookingView se encargará de buscar el intervalo.
        */}
        <BookingView serviceId={serviceId} />
      </div>
    </div>
  );
}
