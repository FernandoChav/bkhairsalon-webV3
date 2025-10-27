'use client';

import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';

export const CardPaymentForm = () => {
  return (
    <div className="space-y-4 pt-4 border-t border-neutral-200">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Número de tarjeta</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Vencimiento</Label>
          <Input id="expiry" placeholder="MM/AA" maxLength={5} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" maxLength={4} type="password" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cardName">Nombre en la tarjeta</Label>
        <Input id="cardName" placeholder="Nombre completo" />
      </div>
    </div>
  );
};
