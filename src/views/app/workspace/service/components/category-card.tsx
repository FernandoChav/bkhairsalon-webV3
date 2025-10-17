import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  HiChevronDown,
  HiChevronRight,
  HiFolder,
  HiFolderOpen,
  HiMenu,
  HiPencil,
  HiPlus,
  HiScissors,
  HiTrash,
} from 'react-icons/hi';

import { FC, useEffect, useState } from 'react';

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
  onEditCategory?: (category: CategoryResponse) => void;
  onEditService?: (service: ServiceResponse) => void;
  isEditMode?: boolean;
  validDropTargets?: Set<string>;
  expandedCategories?: Set<string>;
  onToggleExpand?: (categoryId: string) => void;
  isDragging?: boolean;
  draggingLevel?: number | null;
}

// Componente Draggable para CategoryCard
const DraggableCategoryCard: FC<CategoryCardProps> = ({
  category,
  level = 0,
  onCategoryClick,
  onServiceClick,
  onCreateService,
  onCreateSubcategory,
  onEditCategory,
  onEditService,
  isEditMode = false,
  validDropTargets = new Set(),
  expandedCategories = new Set(),
  onToggleExpand,
  isDragging = false,
  draggingLevel = null,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging: isThisElementDragging,
  } = useDraggable({
    id: `category-${category.id}`,
    data: {
      type: 'category',
      category,
      level,
    },
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `category-drop-${category.id}`,
    data: {
      type: 'category',
      category,
      level,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isThisElementDragging ? 0.3 : 1,
    zIndex: isThisElementDragging ? 1000 : 'auto',
  };

  // Verificar si este elemento es un drop target válido
  const isValidDropTarget = validDropTargets.has(
    `category-drop-${category.id}`
  );
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
        <CategoryCardContent
          category={category}
          level={level}
          onCategoryClick={onCategoryClick}
          onServiceClick={onServiceClick}
          onCreateService={onCreateService}
          onCreateSubcategory={onCreateSubcategory}
          onEditCategory={onEditCategory}
          onEditService={onEditService}
          isEditMode={isEditMode}
          validDropTargets={validDropTargets}
          expandedCategories={expandedCategories}
          onToggleExpand={onToggleExpand}
          isDragging={isDragging}
          draggingLevel={draggingLevel}
        />
      </div>
    </div>
  );
};

// Componente de contenido de CategoryCard (sin drag)
const CategoryCardContent: FC<CategoryCardProps> = ({
  category,
  level = 0,
  onCategoryClick,
  onServiceClick,
  onCreateService,
  onCreateSubcategory,
  onEditCategory,
  onEditService,
  isEditMode = false,
  validDropTargets = new Set(),
  expandedCategories = new Set(),
  onToggleExpand,
  isDragging = false,
  draggingLevel = null,
}) => {
  const [localIsExpanded, setLocalIsExpanded] = useState(false);

  // Sincronizar con el estado global de expansión
  useEffect(() => {
    setLocalIsExpanded(expandedCategories.has(category.id));
  }, [expandedCategories, category.id]);

  const hasSubcategories = (category.subcategories?.length ?? 0) > 0;
  const hasServices = (category.services?.length ?? 0) > 0;
  const canExpand = hasSubcategories || hasServices;

  // Function to count services recursively (current category + all subcategories)
  const getTotalServicesCount = (cat: CategoryResponse): number => {
    let count = cat.services?.length ?? 0;

    if (cat.subcategories && cat.subcategories.length > 0) {
      count += cat.subcategories.reduce((total, subcategory) => {
        return total + getTotalServicesCount(subcategory);
      }, 0);
    }

    return count;
  };

  const totalServicesCount = getTotalServicesCount(category);

  // Calcular indentación
  const indentLevel = level * 24;

  const handleExpandClick = () => {
    if (onToggleExpand) {
      onToggleExpand(category.id);
    }
  };

  // Determinar si el botón de expansión debe estar deshabilitado durante el drag
  const isExpandDisabled = isDragging && draggingLevel === level;

  return (
    <div className="space-y-2" style={{ marginLeft: `${indentLevel}px` }}>
      {/* Category Card */}
      <Card className="group shadow-none hover:shadow-lg hover:border-border/80 transition-all">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-3 flex-1">
              {/* Drag Handle */}
              {isEditMode && (
                <div className="cursor-grab active:cursor-grabbing">
                  <HiMenu className="h-4 w-4 text-muted-foreground" />
                </div>
              )}

              {/* Expand Button - Siempre visible cuando hay contenido */}
              {canExpand && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExpandClick}
                  className={`h-8 w-8 p-0 ${isExpandDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  disabled={isExpandDisabled}
                >
                  {localIsExpanded ? (
                    <HiChevronDown className="h-4 w-4" />
                  ) : (
                    <HiChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
              {!canExpand && <div className="w-8" />}

              {/* Icon */}
              <div className="text-2xl">
                {localIsExpanded ? (
                  <HiFolderOpen className="h-6 w-6 text-orange-500" />
                ) : (
                  <HiFolder className="h-6 w-6 text-orange-500" />
                )}
              </div>

              {/* Category Info */}
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => !isEditMode && onCategoryClick(category)}
                    className={`font-semibold text-lg ${isEditMode ? 'cursor-default' : 'hover:text-primary hover:underline cursor-pointer'} transition-colors text-left`}
                    disabled={isEditMode}
                  >
                    {category.name}
                  </button>

                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {hasSubcategories && (
                      <Badge variant="secondary" className="text-xs">
                        <HiFolder className="h-3 w-3 mr-1" />
                        {category.subcategories?.length} subcategorías
                      </Badge>
                    )}
                    {totalServicesCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        <HiScissors className="h-3 w-3 mr-1" />
                        {totalServicesCount} servicios
                      </Badge>
                    )}
                  </div>
                </div>

                {category.description && (
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                )}
              </div>
            </div>

            {/* Right Section - Actions */}
            {!isEditMode && (
              <div className="flex items-center gap-1">
                <DropdownMenu modal={false}>
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
                      onClick={() => onEditCategory?.(category)}
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
            )}
          </div>
        </CardContent>

        {/* Expanded Content - Ahora puede mostrarse en modo edición */}
        {localIsExpanded && canExpand && (
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
                    onEditService={onEditService}
                    isEditMode={isEditMode}
                    validDropTargets={validDropTargets}
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
                {category.subcategories?.map(subcategory => (
                  <CategoryCard
                    key={subcategory.id}
                    category={subcategory}
                    level={level + 1}
                    onCategoryClick={onCategoryClick}
                    onServiceClick={onServiceClick}
                    onCreateService={onCreateService}
                    onCreateSubcategory={onCreateSubcategory}
                    onEditCategory={onEditCategory}
                    onEditService={onEditService}
                    isEditMode={isEditMode}
                    validDropTargets={validDropTargets}
                    expandedCategories={expandedCategories}
                    onToggleExpand={onToggleExpand}
                    isDragging={isDragging}
                    draggingLevel={draggingLevel}
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

// Exportar el componente principal que decide si usar drag o no
export const CategoryCard: FC<CategoryCardProps> = props => {
  if (props.isEditMode) {
    return <DraggableCategoryCard {...props} />;
  }
  return <CategoryCardContent {...props} />;
};
