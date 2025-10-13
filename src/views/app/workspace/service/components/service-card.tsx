import {
  HiClock,
  HiCurrencyDollar,
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
}

export const ServiceCard: FC<ServiceCardProps> = ({
  service,
  onServiceClick,
}) => {
  return (
    <Card className="group shadow-none hover:shadow-lg hover:border-border/80 transition-all">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3 flex-1">
            <HiScissors className="h-5 w-5 text-orange-500" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onServiceClick?.(service)}
                  className="font-medium hover:text-primary hover:underline transition-colors text-left cursor-pointer"
                >
                  {service.name}
                </button>

                {/* Price Badge */}
                <Badge variant="outline" className="text-xs">
                  <HiCurrencyDollar className="h-3 w-3 mr-0.5" />$
                  {(service.price / 1000).toFixed(0)}k
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
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 cursor-pointer"
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
        </div>
      </CardContent>
    </Card>
  );
};
