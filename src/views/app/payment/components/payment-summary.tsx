'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

interface PaymentSummaryProps {
  total: number;
  formatPrice: (price: number) => string;
}

export const PaymentSummary = ({ total, formatPrice }: PaymentSummaryProps) => {
  return (
    <Card className="mb-6 bg-white font-montserrat">
      <CardHeader>
        <CardTitle className="font-montserrat font-semibold">
          Resumen de pago
        </CardTitle>
        <CardDescription>Total a pagar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-neutral-700">Total:</span>
          <span className="text-3xl font-bold text-neutral-900">
            {formatPrice(total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
