'use client';

import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';

export const TransferPaymentForm = () => {
  return (
    <div className="space-y-4 pt-4 border-t border-neutral-200">
      <div className="bg-neutral-100 p-4 rounded-lg space-y-2">
        <p className="text-sm font-medium text-neutral-900">
          Datos para transferencia:
        </p>
        <p className="text-sm text-neutral-700">Banco: Banco de Chile</p>
        <p className="text-sm text-neutral-700">Cuenta corriente: 1234567890</p>
        <p className="text-sm text-neutral-700">RUT: 12.345.678-9</p>
        <p className="text-sm text-neutral-700">Nombre: Banguelia Karamanos</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="transferRef">Número de transferencia</Label>
        <Input id="transferRef" placeholder="Ingresa el número de referencia" />
      </div>
    </div>
  );
};
