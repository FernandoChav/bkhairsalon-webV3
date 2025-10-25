'use client';

import { BookingView } from '@/views';

// --- DATOS DE PRUEBA (TEMPORALES) ---
const TEST_SERVICE_ID = 'cc28a19d-e4a1-41ac-a8a5-1606d977835e';
const TEST_INTERVAL = 30;
// ------------------------------------

export default function BookingPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Reserva tu Cita</h1>
        <p className="text-muted-foreground mb-8">
          Selecciona un día y hora para tu servicio.
        </p>
        <hr className="my-8" />

        {/* 2. Renderiza la VISTA y le pasa las props */}
        <BookingView
          serviceId={TEST_SERVICE_ID}
          slotIntervalMinutes={TEST_INTERVAL}
        />
      </div>
    </div>
  );
}
