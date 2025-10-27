import { useAtomValue } from 'jotai';
import { HiExclamation, HiTrash } from 'react-icons/hi';
import { FC, useState } from 'react';

import { isDeleteServiceModalOpenAtom } from '@/atoms';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/shadcn';
import { cn } from '@/libs';
import { ServiceResponse } from '@/models/responses';

import { useDeleteService } from '../hooks';

interface DeleteServiceModalProps {
  onClose: () => void;
  service: ServiceResponse;
}

export const DeleteServiceModal: FC<DeleteServiceModalProps> = ({
  onClose,
  service,
}) => {
  const isOpen = useAtomValue(isDeleteServiceModalOpenAtom);
  const { handleDelete, isLoading } = useDeleteService({
    onSuccess: onClose,
    service,
  });

  const [confirmationStep, setConfirmationStep] = useState<1 | 2>(1);

  const handleFirstConfirmation = () => {
    setConfirmationStep(2);
  };

  const handleSecondConfirmation = () => {
    handleDelete();
  };

  const handleCancel = () => {
    setConfirmationStep(1);
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setConfirmationStep(1);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="!max-w-md p-0 border-border">
        <DialogTitle className="sr-only">Eliminar Servicio</DialogTitle>
        <DialogDescription className="sr-only">
          Confirma la eliminación del servicio seleccionado
        </DialogDescription>

        <div className="p-6 space-y-6">
          {/* Header con ícono */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'flex items-center justify-center w-12 h-12 rounded-full',
                confirmationStep === 1
                  ? 'bg-orange-100 dark:bg-orange-900/20'
                  : 'bg-destructive/10'
              )}
            >
              {confirmationStep === 1 ? (
                <HiExclamation className="w-6 h-6 text-orange-600 dark:text-orange-500" />
              ) : (
                <HiTrash className="w-6 h-6 text-destructive" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                {confirmationStep === 1
                  ? '¿Eliminar servicio?'
                  : '¿Estás completamente seguro?'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {confirmationStep === 1
                  ? 'Esta acción desactivará el servicio'
                  : 'Esta acción no se puede deshacer'}
              </p>
            </div>
          </div>

          {/* Información del servicio */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-muted-foreground min-w-[80px]">
                Servicio:
              </span>
              <span className="text-sm font-semibold text-foreground">
                {service.name}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-muted-foreground min-w-[80px]">
                Categoría:
              </span>
              <span className="text-sm text-foreground">
                {service.categoryName}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-muted-foreground min-w-[80px]">
                Precio:
              </span>
              <span className="text-sm text-foreground">
                ${service.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Mensaje de advertencia según el paso */}
          {confirmationStep === 1 ? (
            <div className="space-y-2">
              <p className="text-sm text-foreground">
                Al eliminar este servicio:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>No estará disponible para nuevas citas</li>
                <li>Las citas existentes no se verán afectadas</li>
                <li>El servicio quedará marcado como inactivo</li>
              </ul>
            </div>
          ) : (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm text-destructive font-medium">
                Esta es la confirmación final. El servicio será desactivado
                permanentemente del sistema.
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={
                confirmationStep === 1
                  ? handleFirstConfirmation
                  : handleSecondConfirmation
              }
              disabled={isLoading}
              className={cn(
                'flex-1 transition-all duration-300',
                confirmationStep === 2 &&
                  'bg-destructive hover:bg-destructive/90 shadow-lg'
              )}
            >
              {isLoading
                ? 'Eliminando...'
                : confirmationStep === 1
                  ? 'Continuar'
                  : 'Eliminar definitivamente'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
