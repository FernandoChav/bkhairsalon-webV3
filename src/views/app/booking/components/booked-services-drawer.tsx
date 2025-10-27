'use client';

import { ChevronUp, X } from 'lucide-react';

import { FC } from 'react';

import { Button } from '@/components/shadcn/button';
import type { BookedService } from '@/models/entities';

interface Props {
  bookedServices: BookedService[];
  totalPrice: number;
  isOpen: boolean;
  getCategoryName: (categoryId: string) => string;
  formatPrice: (price: number) => string;
  onToggle: () => void;
  onRemove: (id: string) => void;
  onContinue: () => void;
}

export const BookedServicesDrawer: FC<Props> = ({
  bookedServices,
  totalPrice,
  isOpen,
  getCategoryName,
  formatPrice,
  onToggle,
  onRemove,
  onContinue,
}) => (
  <div
    className={`fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg transition-transform duration-300 ${
      isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-4rem)]'
    }`}
  >
    {/* Header */}
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-4 hover:bg-neutral-50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">
          Horas agendadas ({bookedServices.length})
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-lg">{formatPrice(totalPrice)}</span>
        <ChevronUp
          className={`w-5 h-5 transition-transform ${isOpen ? '' : 'rotate-180'}`}
        />
      </div>
    </button>

    {/* Content */}
    {isOpen && (
      <div className="max-h-96 overflow-y-auto border-t border-neutral-200">
        {bookedServices.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            No hay horas agendadas
          </div>
        ) : (
          <>
            <div className="divide-y divide-neutral-200">
              {bookedServices.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-4 hover:bg-neutral-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {getCategoryName(item.categoryId)}
                    </p>
                    <p className="text-sm text-neutral-900 font-semibold">
                      {formatPrice(item.price)}
                    </p>
                    <p className="text-sm text-neutral-600">
                      Para: {item.forWho}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-neutral-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <Button
                onClick={onContinue}
                className="w-full"
                size="lg"
                disabled={bookedServices.length === 0}
              >
                Continuar
              </Button>
            </div>
          </>
        )}
      </div>
    )}
  </div>
);
