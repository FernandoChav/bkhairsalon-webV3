'use client';

import { CreditCard } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { Label } from '@/components/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/radio-group';

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export const PaymentMethodSelector = ({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodSelectorProps) => {
  return (
    <Card className="mb-6 bg-white">
      <CardHeader>
        <CardTitle className="font-montserrat font-semibold">
          Método de pago
        </CardTitle>
        <CardDescription>Selecciona cómo deseas pagar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <div className="flex items-center space-x-2 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Tarjeta de crédito/débito</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
            <RadioGroupItem value="transfer" id="transfer" />
            <Label htmlFor="transfer" className="flex-1 cursor-pointer">
              <span className="font-medium">Transferencia bancaria</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash" className="flex-1 cursor-pointer">
              <span className="font-medium">
                Pago en efectivo (en el local)
              </span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
