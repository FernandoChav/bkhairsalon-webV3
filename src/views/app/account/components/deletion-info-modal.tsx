import { FC } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn';
import type { DeletionInfoDto } from '@/models/responses';

interface DeletionInfoModalProps {
  isOpen: boolean;
  info?: DeletionInfoDto | null;
  handleClose: () => void;
  handleContinue: () => void;
}

export const DeletionInfoModal: FC<DeletionInfoModalProps> = ({
  isOpen,
  info,
  handleClose,
  handleContinue,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar cuenta</DialogTitle>
          <p className="text-sm text-gray-500">{info?.message}</p>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <p className="text-gray-700">
            {info?.data?.message ||
              'No hay información adicional sobre los datos que se perderán.'}
          </p>
          {info?.data?.hasPendingAppointments && (
            <p className="text-gray-700">
              Tienes {info.data.pendingAppointmentsCount} cita(s) pendiente(s)
              que se eliminarán al borrar tu cuenta.
            </p>
          )}
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleContinue}>
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
