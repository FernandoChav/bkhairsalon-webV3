'use client';

import { ArrowLeft } from 'lucide-react';

import { FC, Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/shadcn/button';
import { useFormatPrice } from '@/hooks/common';

import {
  CardPaymentForm,
  CashPaymentInfo,
  PaymentButton,
  PaymentMethodSelector,
  PaymentSummary,
  TransferPaymentForm,
} from './components';
import { usePayment } from './hooks';

function PaymentContent() {
  const searchParams = useSearchParams();
  const totalParam = searchParams.get('total');
  const total = totalParam ? parseInt(totalParam) : 0;

  const formatPrice = useFormatPrice();
  const { paymentMethod, setPaymentMethod, isProcessing, handlePayment } =
    usePayment();

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 mb-6 transition-colors p-0 h-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver</span>
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Pago</h1>
          <p className="text-neutral-600">
            Completa tu pago para confirmar la reserva
          </p>
        </div>

        <PaymentSummary total={total} formatPrice={formatPrice} />

        <PaymentMethodSelector
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
        />

        {paymentMethod === 'card' && <CardPaymentForm />}
        {paymentMethod === 'transfer' && <TransferPaymentForm />}
        {paymentMethod === 'cash' && <CashPaymentInfo />}

        <PaymentButton isProcessing={isProcessing} onPayment={handlePayment} />
      </div>
    </div>
  );
}

// Main page component with Suspense
export const PaymentView: FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
            <p className="text-neutral-600">Cargando...</p>
          </div>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
};
