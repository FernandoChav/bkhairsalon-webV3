import {
  HiChevronDown,
  HiChevronRight,
  HiFolder,
  HiFolderOpen,
  HiPencil,
  HiPlus,
  HiScissors,
  HiTrash,
} from 'react-icons/hi';

import { FC, useState } from 'react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn';
import { CategoryResponse, ServiceResponse } from '@/models/responses';

import { ServiceCard } from './service-card';

interface CategoryCardProps {
  category: CategoryResponse;
  level?: number;
  onCategoryClick: (category: CategoryResponse) => void;
  onServiceClick?: (service: ServiceResponse) => void;
  onCreateService?: (category: CategoryResponse) => void;
  onCreateSubcategory?: (category: CategoryResponse) => void;
}

export const CategoryCard: FC<CategoryCardProps> = ({
  category,
  level = 0,
  onCategoryClick,
  onServiceClick,
  onCreateService,
  onCreateSubcategory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasSubcategories = (category.subCategories?.length ?? 0) > 0;
  const hasServices = (category.services?.length ?? 0) > 0;
  const canExpand = hasSubcategories || hasServices;

  // Calcular indentación
  const indentLevel = level * 24;

  return (
    <div className="space-y-2" style={{ marginLeft: `${indentLevel}px` }}>
      {/* Category Card */}
      <Card className="group hover:shadow-xs hover:border-border/80 transition-all">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-3 flex-1">
              {/* Expand Button */}
              {canExpand && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-8 w-8 p-0 cursor-pointer"
                >
                  {isExpanded ? (
                    <HiChevronDown className="h-4 w-4" />
                  ) : (
                    <HiChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
              {!canExpand && <div className="w-8" />}

              {/* Icon */}
              <div className="text-2xl">
                {isExpanded ? (
                  <HiFolderOpen className="h-6 w-6 text-orange-500" />
                ) : (
                  <HiFolder className="h-6 w-6 text-orange-500" />
                )}
              </div>

              {/* Category Info */}
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onCategoryClick(category)}
                    className="font-semibold text-lg hover:text-primary hover:underline transition-colors text-left cursor-pointer"
                  >
                    {category.name}
                  </button>

                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {hasSubcategories && (
                      <Badge variant="secondary" className="text-xs">
                        <HiFolder className="h-3 w-3 mr-1" />
                        {category.subCategories?.length} subcategorías
                      </Badge>
                    )}
                    {/* TODO: Implementar cuando se agreguen servicios a CategoryResponse */}
                    {/* {hasServices && (
                      <Badge variant="secondary" className="text-xs">
                        <HiScissors className="h-3 w-3 mr-1" />
                        {category.services?.length} servicios
                      </Badge>
                    )} */}
                  </div>
                </div>

                {category.description && (
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                )}

                <p className="text-xs text-muted-foreground">
                  {category.fullPath}
                </p>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 px-3 cursor-pointer"
                      >
                        <HiPlus className="h-4 w-4 mr-1" />
                        <span className="text-xs">Crear</span>
                        <HiChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Crear nuevo elemento</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent
                  align="end"
                  className="rounded-lg border border-border shadow-md"
                >
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => onCreateSubcategory?.(category)}
                  >
                    <HiFolder className="h-4 w-4 mr-2" />
                    Nueva Subcategoría
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => onCreateService?.(category)}
                  >
                    <HiScissors className="h-4 w-4 mr-2" />
                    Nuevo Servicio
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    <HiPencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar categoría</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive cursor-pointer"
                  >
                    <HiTrash className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Eliminar categoría</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>

        {/* Expanded Content */}
        {isExpanded && canExpand && (
          <div className="border-t border-border px-4 pb-3 pt-3 bg-muted/20">
            {/* Services */}
            {hasServices && (
              <div className="space-y-2 mb-3">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Servicios:
                </h4>
                {category.services?.map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onServiceClick={onServiceClick}
                  />
                ))}
              </div>
            )}

            {/* Subcategories */}
            {hasSubcategories && (
              <div className="space-y-2">
                {hasServices && (
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 mt-4">
                    Subcategorías:
                  </h4>
                )}
                {!hasServices && (
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Subcategorías:
                  </h4>
                )}
                {category.subCategories?.map(subCategory => (
                  <CategoryCard
                    key={subCategory.id}
                    category={subCategory}
                    level={level + 1}
                    onCategoryClick={onCategoryClick}
                    onServiceClick={onServiceClick}
                    onCreateService={onCreateService}
                    onCreateSubcategory={onCreateSubcategory}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
