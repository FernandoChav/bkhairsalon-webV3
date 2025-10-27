'use client';

import { Clock } from 'lucide-react';

import { FC } from 'react';

import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/shadcn/sheet';
import { useFormatMinutes } from '@/hooks/common';
import { Service } from '@/models/entities';

import { AvailabilitySelector } from '.';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService: Service | null;
  forWho: string;
  setForWho: (value: string) => void;
  getCategoryName: (categoryId: string) => string;
  formatPrice: (price: number) => string;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isConfirmDisabled?: boolean;
}

export const BookingSheet: FC<Props> = ({
  open,
  onOpenChange,
  selectedService,
  forWho,
  setForWho,
  formatPrice,
  onConfirm,
}) => {
  // Call hook at the top level
  const formatMinutes = useFormatMinutes();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[90vh] mx-auto max-w-3xl px-4 flex flex-col"
      >
        <div className="flex flex-col gap-1 mt-4 px-4 border-b pb-2">
          <SheetTitle>{selectedService?.name}</SheetTitle>
          <SheetDescription>{selectedService?.description}</SheetDescription>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {formatMinutes(selectedService?.duration ?? null)}
            </span>
          </div>
        </div>

        {/* Scrolleable */}
        <div className="flex-1 overflow-y-auto ">
          {selectedService && (
            <AvailabilitySelector
              serviceId={selectedService.id}
              slotIntervalMinutes={selectedService.duration}
              onSlotSelect={slotData => console.log('Selected:', slotData)}
            />
          )}
        </div>

        {/* Static Bottom Section */}
        <div className="border-t bg-white sticky bottom-0 pb-4">
          {/* Price */}
          <div className="bg-neutral-100 p-4 rounded-lg mt-4">
            <p className="text-2xl font-bold text-neutral-900">
              {selectedService && formatPrice(selectedService.price)}
            </p>
          </div>

          {/* Para: */}
          <div className="space-y-2 mt-4">
            <Label htmlFor="forWho">Para:</Label>
            <Input
              id="forWho"
              placeholder="Mí, hijo, mamá, amiga, etc."
              value={forWho}
              onChange={e => setForWho(e.target.value)}
              className="text-base"
            />
          </div>

          {/* Confirmar hora Button */}
          <Button
            onClick={onConfirm}
            className="w-full mt-4"
            size="lg"
            disabled={!forWho.trim()}
          >
            Confirmar hora
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
