'use client';

import { ChevronUp, ShoppingCart } from 'lucide-react';

import { FC } from 'react';

// NUEVO: Importar Link
import Link from 'next/link';

import { Button } from '@/components/shadcn/button';
import { CartItem } from '@/models/entities';

interface Props {
  cart: CartItem[];
  totalPrice: number;
  isCartOpen: boolean;
  getCategoryName: (categoryId: string) => string;
  formatPrice: (price: number) => string;
  onToggleCart: () => void;
  onRemoveFromCart: (cartId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: FC<Props> = ({
  cart,
  totalPrice,
  isCartOpen,
  getCategoryName,
  formatPrice,
  onToggleCart,
  onRemoveFromCart,
}) => (
  <div
    className={`fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg transition-all duration-300 ${
      isCartOpen ? 'translate-y-0' : 'translate-y-[calc(100%-4rem)]'
    }`}
  >
    {/* --- Cabecera del Drawer (sin cambios) --- */}
    <button
      onClick={onToggleCart}
      className="w-full flex items-center justify-between px-4 py-4 hover:bg-neutral-50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        <span className="font-semibold">Carrito ({cart.length})</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-lg">{formatPrice(totalPrice)}</span>
        <ChevronUp
          className={`w-5 h-5 transition-transform ${
            isCartOpen ? '' : 'rotate-180'
          }`}
        />
      </div>
    </button>

    {/* --- Contenido del Drawer (sin cambios) --- */}
    {isCartOpen && (
      <div className="max-h-96 overflow-y-auto border-t border-neutral-200">
        {cart.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            Tu carrito está vacío
          </div>
        ) : (
          <>
            {/* ... (lista de items, sin cambios) ... */}
            <div className="divide-y divide-neutral-200">
              {cart.map(item => (
                <div
                  key={item.cartId}
                  className="flex items-center justify-between p-4 hover:bg-neutral-50"
                >
                  <div className="grow">
                    <p className="font-medium text-neutral-900">{item.name}</p>
                    <p className="text-sm text-neutral-600">
                      {getCategoryName(item.categoryId)}
                    </p>
                    <p className="text-sm font-semibold text-neutral-900">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFromCart(item.cartId)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>

            {/* --- Footer del Drawer (AQUÍ ESTÁ EL CAMBIO) --- */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-neutral-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* CAMBIO: Envolvemos el botón en un <Link> */}
              {/*
                - Hacemos que el Link sea condicional para no navegar si el carrito está vacío.
                - 'pointer-events-none' y 'aria-disabled' desactivan el Link si el carrito está vacío.
              */}
              <Link
                href={cart.length > 0 ? '/booking/cart' : '#'}
                className={`w-full ${
                  cart.length === 0 ? 'pointer-events-none' : ''
                }`}
                aria-disabled={cart.length === 0}
                tabIndex={cart.length === 0 ? -1 : undefined}
              >
                <Button
                  // onClick={onCheckout} // ELIMINADO: Ya no se usa para esto
                  className="w-full"
                  size="lg"
                  disabled={cart.length === 0} // MANTENIDO: Para el estilo visual de deshabilitado
                >
                  Agendar horas
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    )}
  </div>
);
