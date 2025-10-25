'use client';

import { BookingView } from '@/views';

// --- DATOS DE PRUEBA (TEMPORALES) ---
const TEST_SERVICE_ID = 'a1d27de2-0ba6-4a7e-8348-65090f69671e';
const TEST_INTERVAL = 10;
// ------------------------------------

export default function BookingPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/*
          CAMBIO 1: Añadir 'font-serif' al título principal.
          Esto lo alinea con el estilo "premium" del resto del sitio.
        */}
        <h1 className="text-3xl font-bold font-serif">Reserva tu Cita</h1>

        {/*
          CAMBIO 2: (Opcional pero recomendado)
          Añadir 'font-sans' al párrafo descriptivo para ser explícitos
          y asegurar que usa la fuente base (moderna), no la serif.
        */}
        <p className="text-muted-foreground mb-8 font-sans">
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
