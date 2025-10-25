'use client';

import { BookingView } from '@/views';

// --- DATOS DE PRUEBA (TEMPORALES) ---
const TEST_SERVICE_ID = 'a1d27de2-0ba6-4a7e-8348-65090f69671e';
const TEST_INTERVAL = 10;
// ------------------------------------

export default function BookingPage() {
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

        <BookingView
          serviceId={TEST_SERVICE_ID}
          slotIntervalMinutes={TEST_INTERVAL}
        />
      </div>
    </div>
  );
}
