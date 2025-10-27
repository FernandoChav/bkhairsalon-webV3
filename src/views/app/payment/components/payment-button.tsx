'use client';

import { Check } from 'lucide-react';

import { Button } from '@/components/shadcn/button';

interface PaymentButtonProps {
  isProcessing: boolean;
  onPayment: () => void;
}

export const PaymentButton = ({
  isProcessing,
  onPayment,
}: PaymentButtonProps) => {
  return (
    <div className="mt-4">
      <Button
        onClick={onPayment}
        className="w-full"
        size="lg"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            Procesando...
          </>
        ) : (
          <>
            <Check className="w-5 h-5 mr-2" />
            Confirmar pago
          </>
        )}
      </Button>

      <p className="text-xs text-center text-neutral-500 mt-4">
        Al confirmar el pago, aceptas nuestros términos y condiciones
      </p>
    </div>
  );
};
