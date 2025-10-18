import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  useSensors,
} from '@dnd-kit/core';
import { useAtom } from 'jotai';
import { HiPlus } from 'react-icons/hi';

import { FC, ReactNode } from 'react';

import { expandedCategoriesAtom, isEditModeAtom } from '@/atoms';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn';
import { CategoryResponse } from '@/models/responses';

import { CategoryCard } from './category-card';

interface CategoryListProps {
  hasCategories: boolean;
  categoriesToRender: CategoryResponse[];
  sensors: ReturnType<typeof useSensors>;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragOver: (event: DragOverEvent) => void;
  handleCreateCategory: () => void;
  activeId: string | null;
  draggingLevel: number | null;
  dragOverlayContent: ReactNode;
  validDropTargets: Set<string>;
}

export const CategoryList: FC<CategoryListProps> = ({
  hasCategories,
  categoriesToRender,
  sensors,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleCreateCategory,
  activeId,
  draggingLevel,
  dragOverlayContent,
  validDropTargets,
}) => {
  const [isEditMode] = useAtom(isEditModeAtom);
  const [expandedCategories] = useAtom(expandedCategoriesAtom);

  return hasCategories ? (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="space-y-3">
        {categoriesToRender.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            isEditMode={isEditMode}
            validDropTargets={validDropTargets}
            expandedCategories={expandedCategories}
            isDragging={!!activeId}
            draggingLevel={draggingLevel}
          />
        ))}
      </div>

      <DragOverlay>
        {activeId && (
          <div
            className={`opacity-90 scale-105 ${activeId.startsWith('category-') ? 'rotate-1' : 'rotate-3'}`}
          >
            {dragOverlayContent}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  ) : (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h3 className="text-lg font-semibold mb-2">No hay categorías</h3>
      <p className="text-muted-foreground mb-4">
        Crea tu primera categoría para comenzar a organizar tus servicios
      </p>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleCreateCategory}
          >
            <HiPlus className="h-4 w-4" />
            Crear Primera Categoría
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Crear tu primera categoría para organizar servicios</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
