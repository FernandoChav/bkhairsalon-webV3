import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useAtom, useSetAtom } from 'jotai';
import { toast } from 'sonner';

import { useCallback, useMemo, useState } from 'react';

import {
  expandedCategoriesAtom,
  isCreateCategoryModalOpenAtom,
  isEditModeAtom,
  selectedParentCategoryAtom,
} from '@/atoms';
import {
  useGetAllCategoryQuery,
  useReorderElementsMutation,
} from '@/hooks/api';
import { ReorderElementRequest, ReorderState } from '@/models/requests';
import { CategoryResponse } from '@/models/responses';

interface UseServiceViewReturn {
  // Values - Data
  categories: CategoryResponse[];
  isLoading: boolean;
  isSaving: boolean;
  // Values - Drag and Drop
  reorderState: ReorderState;
  activeId: string | null;
  validDropTargets: Set<string>;
  draggingLevel: number | null;
  sensors: ReturnType<typeof useSensors>;
  // Values - Computed
  hasCategories: boolean;
  hasPendingChanges: boolean;
  categoryMap: Map<
    string,
    {
      category: CategoryResponse;
      parent: CategoryResponse | null;
      level: number;
    }
  >;
  // Handlers - Category
  handleCreateCategory: () => void;
  // Handlers - Edit Mode
  handleStartEditMode: () => void;
  handleCancelEditMode: () => void;
  handleSaveChanges: () => Promise<void>;
  // Handlers - Drag and Drop
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragOver: (event: DragOverEvent) => void;
}

export const useServiceView = (): UseServiceViewReturn => {
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    refetch,
  } = useGetAllCategoryQuery(true, true);

  const reorderMutation = useReorderElementsMutation();

  // Atoms for shared state
  const setIsCreateCategoryModalOpen = useSetAtom(
    isCreateCategoryModalOpenAtom
  );
  const setSelectedParentCategory = useSetAtom(selectedParentCategoryAtom);
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const setExpandedCategories = useSetAtom(expandedCategoriesAtom);

  // Local state for drag and drop (specific to this hook)
  const [isSaving, setIsSaving] = useState(false);
  const [reorderState, setReorderState] = useState<ReorderState>({
    categories: [],
    pendingChanges: [],
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [validDropTargets, setValidDropTargets] = useState<Set<string>>(
    new Set()
  );
  const [draggingLevel, setDraggingLevel] = useState<number | null>(null);

  // Sensors configuration
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Category map for optimized searches
  const categoryMap = useMemo(() => {
    const map = new Map<
      string,
      {
        category: CategoryResponse;
        parent: CategoryResponse | null;
        level: number;
      }
    >();

    const buildMap = (
      categories: CategoryResponse[],
      parent: CategoryResponse | null = null,
      level: number = 0
    ) => {
      categories.forEach(category => {
        map.set(category.id, { category, parent, level });
        if (category.subcategories) {
          buildMap(category.subcategories, category, level + 1);
        }
      });
    };

    buildMap(isEditMode ? reorderState.categories : categories);
    return map;
  }, [categories, reorderState.categories, isEditMode]);

  // Computed values
  const hasCategories = categories.length > 0;
  const hasPendingChanges = reorderState.pendingChanges.length > 0;

  // Helper functions
  const buildReorderRequest = useCallback((categories: CategoryResponse[]) => {
    const processCategory = (
      category: CategoryResponse
    ): ReorderElementRequest => ({
      id: category.id,
      sortOrder: category.sortOrder,
      services:
        category.services?.map(service => ({
          id: service.id,
          sortOrder: service.sortOrder,
        })) || [],
      subcategories: category.subcategories?.map(processCategory) || [],
    });

    return {
      categories: categories.map(processCategory),
    };
  }, []);

  const collapseAppropriateLevel = useCallback(
    (elementId: string, elementType: 'category' | 'service') => {
      if (elementType === 'service') {
        const parentCategory = Array.from(categoryMap.values()).find(info =>
          info.category.services?.some(s => s.id === elementId)
        );

        if (parentCategory) {
          setDraggingLevel(-1);
        }
        return;
      }

      const draggedCategoryInfo = categoryMap.get(elementId);
      if (!draggedCategoryInfo) return;

      const level = draggedCategoryInfo.level;
      const parentId = draggedCategoryInfo.parent?.id || null;

      setDraggingLevel(level);

      const categoriesToCollapse = new Set<string>();

      categoryMap.forEach((info, catId) => {
        if (info.level === level) {
          if (level === 0) {
            categoriesToCollapse.add(catId);
          } else if (info.parent?.id === parentId) {
            categoriesToCollapse.add(catId);
          }
        }
      });

      setExpandedCategories(prev => {
        const newSet = new Set(prev);
        categoriesToCollapse.forEach(id => newSet.delete(id));
        return newSet;
      });
    },
    [categoryMap, setExpandedCategories]
  );

  const findAndReorderCategories = useCallback(
    (
      categories: CategoryResponse[],
      activeCategoryId: string,
      overCategoryId: string,
      level: number = 0
    ): {
      found: boolean;
      updatedCategories: CategoryResponse[];
      changed: boolean;
    } => {
      const activeIndex = categories.findIndex(
        cat => cat.id === activeCategoryId
      );
      const overIndex = categories.findIndex(cat => cat.id === overCategoryId);

      if (activeIndex !== -1 && overIndex !== -1) {
        if (activeIndex === overIndex) {
          return { found: true, updatedCategories: categories, changed: false };
        }

        const reorderedCategories = arrayMove(
          categories,
          activeIndex,
          overIndex
        );
        const updatedCategories = reorderedCategories.map(
          (category, index) => ({
            ...category,
            sortOrder: index + 1,
          })
        );

        return { found: true, updatedCategories, changed: true };
      }

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        if (category.subcategories && category.subcategories.length > 0) {
          const result = findAndReorderCategories(
            category.subcategories,
            activeCategoryId,
            overCategoryId,
            level + 1
          );

          if (result.found) {
            const updatedCategories = [...categories];
            updatedCategories[i] = {
              ...category,
              subcategories: result.updatedCategories,
            };

            return { found: true, updatedCategories, changed: result.changed };
          }
        }
      }

      return { found: false, updatedCategories: categories, changed: false };
    },
    []
  );

  const findAndReorderServices = useCallback(
    (
      categories: CategoryResponse[],
      activeServiceId: string,
      overServiceId: string
    ): {
      found: boolean;
      updatedCategories: CategoryResponse[];
      changed: boolean;
    } => {
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const services = category.services || [];

        const activeServiceIndex = services.findIndex(
          service => service.id === activeServiceId
        );
        const overServiceIndex = services.findIndex(
          service => service.id === overServiceId
        );

        if (activeServiceIndex !== -1 && overServiceIndex !== -1) {
          if (activeServiceIndex === overServiceIndex) {
            return {
              found: true,
              updatedCategories: categories,
              changed: false,
            };
          }

          const reorderedServices = arrayMove(
            services,
            activeServiceIndex,
            overServiceIndex
          );

          const updatedServices = reorderedServices.map((service, index) => ({
            ...service,
            sortOrder: index + 1,
          }));

          const updatedCategories = [...categories];
          updatedCategories[i] = {
            ...category,
            services: updatedServices,
          };

          return { found: true, updatedCategories, changed: true };
        }

        if (category.subcategories && category.subcategories.length > 0) {
          const result = findAndReorderServices(
            category.subcategories,
            activeServiceId,
            overServiceId
          );

          if (result.found) {
            const updatedCategories = [...categories];
            updatedCategories[i] = {
              ...category,
              subcategories: result.updatedCategories,
            };

            return { found: true, updatedCategories, changed: result.changed };
          }
        }
      }

      return { found: false, updatedCategories: categories, changed: false };
    },
    []
  );

  const handleCategoryReorder = useCallback(
    (activeCategoryId: string, overCategoryId: string): boolean => {
      let changed = false;

      setReorderState(prevState => {
        const newCategories = [...prevState.categories];

        const result = findAndReorderCategories(
          newCategories,
          activeCategoryId,
          overCategoryId
        );

        if (result.found && result.changed) {
          changed = true;
          return {
            ...prevState,
            categories: result.updatedCategories,
            pendingChanges: [
              ...prevState.pendingChanges.filter(
                change => change.id !== activeCategoryId
              ),
              {
                id: activeCategoryId,
                type: 'category' as const,
                newSortOrder: 1,
                context: { level: 0 },
              },
            ],
          };
        }

        return prevState;
      });

      return changed;
    },
    [findAndReorderCategories]
  );

  const handleServiceReorder = useCallback(
    (activeServiceId: string, overServiceId: string): boolean => {
      let changed = false;

      setReorderState(prevState => {
        const newCategories = [...prevState.categories];

        const result = findAndReorderServices(
          newCategories,
          activeServiceId,
          overServiceId
        );

        if (result.found && result.changed) {
          changed = true;
          return {
            ...prevState,
            categories: result.updatedCategories,
            pendingChanges: [
              ...prevState.pendingChanges.filter(
                change => change.id !== activeServiceId
              ),
              {
                id: activeServiceId,
                type: 'service' as const,
                newSortOrder: 1,
                categoryId: '',
                context: { level: 0 },
              },
            ],
          };
        }

        return prevState;
      });

      return changed;
    },
    [findAndReorderServices]
  );

  // Handlers - Category
  const handleCreateCategory = useCallback(() => {
    setSelectedParentCategory(null);
    setIsCreateCategoryModalOpen(true);
  }, [setSelectedParentCategory, setIsCreateCategoryModalOpen]);

  // Handlers - Edit Mode
  const handleStartEditMode = useCallback(() => {
    setIsEditMode(true);
    setReorderState({
      categories: [...categories],
      pendingChanges: [],
    });
  }, [categories, setIsEditMode]);

  const handleCancelEditMode = useCallback(() => {
    setIsEditMode(false);
    setReorderState({
      categories: [],
      pendingChanges: [],
    });
    setDraggingLevel(null);
  }, [setIsEditMode]);

  const handleSaveChanges = useCallback(async () => {
    try {
      setIsSaving(true);

      const request = buildReorderRequest(reorderState.categories);
      await reorderMutation.mutateAsync(request);

      setIsEditMode(false);
      setReorderState({
        categories: [],
        pendingChanges: [],
      });

      await refetch();
      toast.success('Orden actualizado correctamente');
    } catch (error) {
      toast.error('Error al actualizar el orden');
      console.error('Error al reordenar:', error);

      setIsEditMode(false);
      setReorderState({
        categories: [],
        pendingChanges: [],
      });
    } finally {
      setIsSaving(false);
    }
  }, [
    reorderState.categories,
    buildReorderRequest,
    reorderMutation,
    refetch,
    setIsEditMode,
  ]);

  // Handlers - Drag and Drop
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const activeId = event.active.id as string;
      setActiveId(activeId);
      setValidDropTargets(new Set());

      const elementType = activeId.startsWith('category-')
        ? 'category'
        : 'service';
      const elementId = activeId.replace(/^(category-|service-)/, '');

      collapseAppropriateLevel(elementId, elementType);
    },
    [collapseAppropriateLevel]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        setActiveId(null);
        setValidDropTargets(new Set());
        setDraggingLevel(null);
        return;
      }

      const activeId = active.id as string;
      const overId = over.id as string;

      if (activeId === overId) {
        setActiveId(null);
        setValidDropTargets(new Set());
        setDraggingLevel(null);
        return;
      }

      const activeType = activeId.startsWith('category-')
        ? 'category'
        : 'service';

      let overType: string;
      let actualOverId: string;

      if (overId.startsWith('category-drop-')) {
        overType = 'category';
        actualOverId = overId.replace('category-drop-', '');
      } else if (overId.startsWith('service-drop-')) {
        overType = 'service';
        actualOverId = overId.replace('service-drop-', '');
      } else {
        overType = overId.startsWith('category-') ? 'category' : 'service';
        actualOverId = overId.replace(/^(category-|service-)/, '');
      }

      if (activeType !== overType) {
        setActiveId(null);
        setValidDropTargets(new Set());
        setDraggingLevel(null);
        return;
      }

      const activeElementId = activeId.replace(/^(category-|service-)/, '');
      const overElementId = actualOverId;

      if (activeType === 'category') {
        const result = handleCategoryReorder(activeElementId, overElementId);
        if (!result) {
          setActiveId(null);
          setValidDropTargets(new Set());
          setDraggingLevel(null);
          return;
        }
      } else {
        const result = handleServiceReorder(activeElementId, overElementId);
        if (!result) {
          setActiveId(null);
          setValidDropTargets(new Set());
          setDraggingLevel(null);
          return;
        }
      }

      setActiveId(null);
      setValidDropTargets(new Set());
      setDraggingLevel(null);
    },
    [handleCategoryReorder, handleServiceReorder]
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        setValidDropTargets(new Set());
        return;
      }

      const activeId = active.id as string;
      const overId = over.id as string;

      const activeType = activeId.startsWith('category-')
        ? 'category'
        : 'service';

      let overType: string;
      let actualOverId: string;

      if (overId.startsWith('category-drop-')) {
        overType = 'category';
        actualOverId = overId.replace('category-drop-', '');
      } else if (overId.startsWith('service-drop-')) {
        overType = 'service';
        actualOverId = overId.replace('service-drop-', '');
      } else {
        overType = overId.startsWith('category-') ? 'category' : 'service';
        actualOverId = overId.replace(/^(category-|service-)/, '');
      }

      if (activeType !== overType) {
        setValidDropTargets(new Set());
        return;
      }

      let isValidDrop = false;

      if (activeType === 'category') {
        const activeCategoryId = activeId.replace('category-', '');
        const overCategoryId = actualOverId;

        const activeInfo = categoryMap.get(activeCategoryId);
        const overInfo = categoryMap.get(overCategoryId);

        if (
          activeInfo &&
          overInfo &&
          activeInfo.level === overInfo.level &&
          activeInfo.parent?.id === overInfo.parent?.id
        ) {
          isValidDrop = true;
        }
      } else {
        const activeServiceId = activeId.replace('service-', '');
        const overServiceId = actualOverId;

        let activeCategoryId: string | null = null;
        let overCategoryId: string | null = null;

        categoryMap.forEach((info, catId) => {
          if (info.category.services?.some(s => s.id === activeServiceId)) {
            activeCategoryId = catId;
          }
          if (info.category.services?.some(s => s.id === overServiceId)) {
            overCategoryId = catId;
          }
        });

        if (
          activeCategoryId &&
          overCategoryId &&
          activeCategoryId === overCategoryId
        ) {
          isValidDrop = true;
        }
      }

      if (isValidDrop) {
        setValidDropTargets(new Set([overId]));
      } else {
        setValidDropTargets(new Set());
      }
    },
    [categoryMap]
  );

  return {
    // Values - Data
    categories,
    isLoading: categoriesLoading,
    isSaving,
    // Values - Drag and Drop
    reorderState,
    activeId,
    validDropTargets,
    draggingLevel,
    sensors,
    // Values - Computed
    hasCategories,
    hasPendingChanges,
    categoryMap,
    // Handlers - Category
    handleCreateCategory,
    // Handlers - Edit Mode
    handleStartEditMode,
    handleCancelEditMode,
    handleSaveChanges,
    // Handlers - Drag and Drop
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
};
