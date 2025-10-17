import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  HiClock,
  HiCurrencyDollar,
  HiMenu,
  HiPencil,
  HiScissors,
  HiTrash,
} from 'react-icons/hi';

import { FC } from 'react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn';
import { ServiceResponse } from '@/models/responses';

interface ServiceCardProps {
  service: ServiceResponse;
  onServiceClick?: (service: ServiceResponse) => void;
  onEditService?: (service: ServiceResponse) => void;
  isEditMode?: boolean;
  validDropTargets?: Set<string>;
}

// Componente Draggable para ServiceCard
const DraggableServiceCard: FC<ServiceCardProps> = ({
  service,
  onServiceClick,
  onEditService,
  isEditMode = false,
  validDropTargets = new Set(),
}) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `service-${service.id}`,
    data: {
      type: 'service',
      service,
    },
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `service-drop-${service.id}`,
    data: {
      type: 'service',
      service,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  // Verificar si este elemento es un drop target válido
  const isValidDropTarget = validDropTargets.has(`service-drop-${service.id}`);
  const showDropIndicator = isOver && isValidDropTarget;

  return (
    <div
      ref={node => {
        setDraggableRef(node);
        setDroppableRef(node);
      }}
      style={style}
      className={`transition-all duration-200 ${isEditMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
      {...(isEditMode ? attributes : {})}
      {...(isEditMode ? listeners : {})}
    >
      <div
        className={`${showDropIndicator ? 'ring-2 ring-primary ring-offset-2 rounded-xl' : ''}`}
      >
        <ServiceCardContent
          service={service}
          onServiceClick={onServiceClick}
          onEditService={onEditService}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

// Componente de contenido de ServiceCard (sin drag)
const ServiceCardContent: FC<ServiceCardProps> = ({
  service,
  onServiceClick,
  onEditService,
  isEditMode = false,
}) => {
  return (
    <Card className="group shadow-none hover:shadow-lg hover:border-border/80 transition-all">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3 flex-1">
            {/* Drag Handle */}
            {isEditMode && (
              <div className="cursor-grab active:cursor-grabbing">
                <HiMenu className="h-4 w-4 text-muted-foreground" />
              </div>
            )}

            <HiScissors className="h-5 w-5 text-orange-500" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => !isEditMode && onServiceClick?.(service)}
                  className={`font-medium ${isEditMode ? 'cursor-default' : 'hover:text-primary hover:underline cursor-pointer'} transition-colors text-left`}
                  disabled={isEditMode}
                >
                  {service.name}
                </button>

                {/* Price Badge */}
                <Badge variant="outline" className="text-xs">
                  <HiCurrencyDollar className="h-3 w-3 mr-0.5" />$
                  {service.price.toLocaleString()}
                </Badge>

                {/* Duration Badge */}
                <Badge variant="outline" className="text-xs">
                  <HiClock className="h-3 w-3 mr-0.5" />
                  {service.duration} min
                </Badge>

                {/* Commission Badge */}
                <Badge variant="secondary" className="text-xs">
                  {service.commissionPercentage}% comisión
                </Badge>
              </div>

              {service.description && (
                <p className="text-xs text-muted-foreground">
                  {service.description}
                </p>
              )}
            </div>
          </div>

          {/* Right Section - Actions */}
          {!isEditMode && (
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 cursor-pointer"
                    onClick={() => onEditService?.(service)}
                  >
                    <HiPencil className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar servicio</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-destructive cursor-pointer"
                  >
                    <HiTrash className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Eliminar servicio</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Exportar el componente principal que decide si usar drag o no
export const ServiceCard: FC<ServiceCardProps> = props => {
  if (props.isEditMode) {
    return <DraggableServiceCard {...props} />;
  }
  return <ServiceCardContent {...props} />;
};
