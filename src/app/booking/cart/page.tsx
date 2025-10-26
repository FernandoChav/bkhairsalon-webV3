'use client';

// Importa la NUEVA vista que crearemos
import { CartBookingView } from '@/views/app/booking//components/cart-booking-view';

// Esta página será el contenedor, muy similar a la otra página de booking
export default function CartBookingPage() {
  return (
    <div className="pt-12">
      {/* Usamos 'max-w-4xl' para mantener consistencia */}
      <div className="max-w-4xl mx-auto pb-12">
        <h1 className="text-3xl font-bold font-montserrat px-4 sm:px-0">
          Revisar y Agendar Cita
        </h1>
        <p className="text-muted-foreground mb-8 font-sans px-4 sm:px-0">
          Confirma tus servicios y selecciona un día y hora.
        </p>

        <hr className="my-8 mx-4 sm:mx-0" />

        {/* Aquí llamamos a la nueva vista. No necesita props,
          ya que obtendrá el carrito desde el hook.
        */}
        <CartBookingView />
      </div>
    </div>
  );
}
