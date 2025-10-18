import { useAtom } from 'jotai';
import { HiCheck, HiPencil, HiPlus, HiX } from 'react-icons/hi';

import { FC } from 'react';

import { isEditModeAtom } from '@/atoms';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn';

interface ServiceHeaderProps {
  isEditButtonDisabled: boolean;
  saveButtonText: string;
  hasPendingChanges: boolean;
  handleStartEditMode: () => void;
  handleCreateCategory: () => void;
  handleSaveChanges: () => void;
  handleCancelEditMode: () => void;
}

export const ServiceHeader: FC<ServiceHeaderProps> = ({
  isEditButtonDisabled,
  saveButtonText,
  hasPendingChanges,
  handleStartEditMode,
  handleCreateCategory,
  handleSaveChanges,
  handleCancelEditMode,
}) => {
  const [isEditMode] = useAtom(isEditModeAtom);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Gestionar Servicios
          </h1>
          <p className="text-muted-foreground">
            Organiza tus servicios por categorías para una mejor gestión
          </p>
        </div>

        {!isEditMode ? (
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={handleStartEditMode}
                >
                  <HiPencil className="h-4 w-4" />
                  Reordenar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reordenar categorías y servicios</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={handleCreateCategory}
                >
                  <HiPlus className="h-4 w-4" />
                  Nueva Categoría
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Crear nueva categoría para organizar servicios</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={handleSaveChanges}
                  disabled={isEditButtonDisabled}
                >
                  <HiCheck className="h-4 w-4" />
                  {saveButtonText}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {hasPendingChanges
                    ? 'Guardar el nuevo orden'
                    : 'No hay cambios para guardar'}
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={handleCancelEditMode}
                >
                  <HiX className="h-4 w-4" />
                  Cancelar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cancelar cambios y volver al modo normal</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <HiPlus className="h-4 w-4" />
                  Nueva Categoría
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>No disponible en modo edición</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};
