import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { toast } from 'sonner';

import { useCallback, useMemo, useState } from 'react';

import {
  useGetAllCategoryQuery,
  useReorderElementsMutation,
} from '@/hooks/api';
import { ReorderElementRequest, ReorderState } from '@/models/requests';
import { CategoryResponse, ServiceResponse } from '@/models/responses';

interface UseServiceViewReturn {
  // Values - Data
  categories: CategoryResponse[];
  isLoading: boolean;
  isSaving: boolean;
  searchQuery: string;
  selectedCategory: CategoryResponse | null;
  isCategorySheetOpen: boolean;
  selectedService: ServiceResponse | null;
  isServiceSheetOpen: boolean;
  isCreateServiceModalOpen: boolean;
  isCreateCategoryModalOpen: boolean;
  selectedParentCategory: CategoryResponse | null;
  selectedServiceCategory: CategoryResponse | null;
  isEditCategoryModalOpen: boolean;
  selectedEditCategory: CategoryResponse | null;
  isUpdateServiceModalOpen: boolean;
  selectedUpdateService: ServiceResponse | null;
  // Values - Drag and Drop
  isEditMode: boolean;
  reorderState: ReorderState;
  activeId: string | null;
  validDropTargets: Set<string>;
  expandedCategories: Set<string>;
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
  // Handlers - Search
  handleSearchChange: (value: string) => void;
  // Handlers - Category
  handleCategoryClick: (category: CategoryResponse) => void;
  handleCreateCategory: () => void;
  handleCreateSubcategory: (parentCategory: CategoryResponse) => void;
  handleEditCategory: (category: CategoryResponse) => void;
  handleCloseCreateCategoryModal: () => void;
  handleCloseEditCategoryModal: () => void;
  handleCloseCategorySheet: () => void;
  // Handlers - Service
  handleServiceClick: (service: ServiceResponse) => void;
  handleCreateService: (category: CategoryResponse) => void;
  handleEditService: (service: ServiceResponse) => void;
  handleCloseCreateServiceModal: () => void;
  handleCloseUpdateServiceModal: () => void;
  handleCloseServiceSheet: () => void;
  // Handlers - Edit Mode
  handleStartEditMode: () => void;
  handleCancelEditMode: () => void;
  handleSaveChanges: () => Promise<void>;
  // Handlers - Expand/Collapse
  handleToggleExpand: (categoryId: string) => void;
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

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Category states
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryResponse | null>(null);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [selectedParentCategory, setSelectedParentCategory] =
    useState<CategoryResponse | null>(null);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [selectedEditCategory, setSelectedEditCategory] =
    useState<CategoryResponse | null>(null);

  // Service states
  const [selectedService, setSelectedService] =
    useState<ServiceResponse | null>(null);
  const [isServiceSheetOpen, setIsServiceSheetOpen] = useState(false);
  const [isCreateServiceModalOpen, setIsCreateServiceModalOpen] =
    useState(false);
  const [selectedServiceCategory, setSelectedServiceCategory] =
    useState<CategoryResponse | null>(null);
  const [isUpdateServiceModalOpen, setIsUpdateServiceModalOpen] =
    useState(false);
  const [selectedUpdateService, setSelectedUpdateService] =
    useState<ServiceResponse | null>(null);

  // Drag and drop states
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [reorderState, setReorderState] = useState<ReorderState>({
    categories: [],
    pendingChanges: [],
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [validDropTargets, setValidDropTargets] = useState<Set<string>>(
    new Set()
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [draggingLevel, setDraggingLevel] = useState<number | null>(null);
  const [draggingParentId, setDraggingParentId] = useState<string | null>(null);

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

  const shouldCollapseCategory = useCallback(
    (categoryId: string): boolean => {
      if (draggingLevel === null) return false;

      const categoryInfo = categoryMap.get(categoryId);
      if (!categoryInfo) return false;

      if (draggingLevel === 0 && categoryInfo.level === 0) {
        return true;
      }

      if (draggingLevel > 0 && draggingParentId) {
        return (
          categoryInfo.parent?.id === draggingParentId &&
          categoryInfo.level === draggingLevel
        );
      }

      return false;
    },
    [draggingLevel, draggingParentId, categoryMap]
  );

  const collapseAppropriateLevel = useCallback(
    (elementId: string, elementType: 'category' | 'service') => {
      if (elementType === 'service') {
        const parentCategory = Array.from(categoryMap.values()).find(info =>
          info.category.services?.some(s => s.id === elementId)
        );

        if (parentCategory) {
          setDraggingLevel(-1);
          setDraggingParentId(parentCategory.category.id);
        }
        return;
      }

      const draggedCategoryInfo = categoryMap.get(elementId);
      if (!draggedCategoryInfo) return;

      const level = draggedCategoryInfo.level;
      const parentId = draggedCategoryInfo.parent?.id || null;

      setDraggingLevel(level);
      setDraggingParentId(parentId);

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
    [categoryMap]
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

  // Handlers - Search
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  // Handlers - Category
  const handleCategoryClick = useCallback((category: CategoryResponse) => {
    setSelectedCategory(category);
    setIsCategorySheetOpen(true);
  }, []);

  const handleCreateCategory = useCallback(() => {
    setSelectedParentCategory(null);
    setIsCreateCategoryModalOpen(true);
  }, []);

  const handleCreateSubcategory = useCallback(
    (parentCategory: CategoryResponse) => {
      setSelectedParentCategory(parentCategory);
      setIsCreateCategoryModalOpen(true);
    },
    []
  );

  const handleEditCategory = useCallback((category: CategoryResponse) => {
    setSelectedEditCategory(category);
    setIsEditCategoryModalOpen(true);
  }, []);

  const handleCloseCreateCategoryModal = useCallback(() => {
    setIsCreateCategoryModalOpen(false);
    setSelectedParentCategory(null);
  }, []);

  const handleCloseEditCategoryModal = useCallback(() => {
    setIsEditCategoryModalOpen(false);
    setSelectedEditCategory(null);
  }, []);

  const handleCloseCategorySheet = useCallback(() => {
    setIsCategorySheetOpen(false);
  }, []);

  // Handlers - Service
  const handleServiceClick = useCallback((service: ServiceResponse) => {
    setSelectedService(service);
    setIsServiceSheetOpen(true);
  }, []);

  const handleCreateService = useCallback((category: CategoryResponse) => {
    setSelectedServiceCategory(category);
    setIsCreateServiceModalOpen(true);
  }, []);

  const handleEditService = useCallback((service: ServiceResponse) => {
    setSelectedUpdateService(service);
    setIsUpdateServiceModalOpen(true);
    setIsServiceSheetOpen(false);
  }, []);

  const handleCloseCreateServiceModal = useCallback(() => {
    setIsCreateServiceModalOpen(false);
    setSelectedServiceCategory(null);
  }, []);

  const handleCloseUpdateServiceModal = useCallback(() => {
    setIsUpdateServiceModalOpen(false);
    setSelectedUpdateService(null);
  }, []);

  const handleCloseServiceSheet = useCallback(() => {
    setIsServiceSheetOpen(false);
  }, []);

  // Handlers - Edit Mode
  const handleStartEditMode = useCallback(() => {
    setIsEditMode(true);
    setReorderState({
      categories: [...categories],
      pendingChanges: [],
    });
  }, [categories]);

  const handleCancelEditMode = useCallback(() => {
    setIsEditMode(false);
    setReorderState({
      categories: [],
      pendingChanges: [],
    });
    setDraggingLevel(null);
    setDraggingParentId(null);
  }, []);

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
  }, [reorderState.categories, buildReorderRequest, reorderMutation, refetch]);

  // Handlers - Expand/Collapse
  const handleToggleExpand = useCallback(
    (categoryId: string) => {
      const canExpand = !draggingLevel || !shouldCollapseCategory(categoryId);

      if (canExpand) {
        setExpandedCategories(prev => {
          const newSet = new Set(prev);
          if (newSet.has(categoryId)) {
            newSet.delete(categoryId);
          } else {
            newSet.add(categoryId);
          }
          return newSet;
        });
      }
    },
    [draggingLevel, shouldCollapseCategory]
  );

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
        setDraggingParentId(null);
        return;
      }

      const activeId = active.id as string;
      const overId = over.id as string;

      if (activeId === overId) {
        setActiveId(null);
        setValidDropTargets(new Set());
        setDraggingLevel(null);
        setDraggingParentId(null);
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
        setDraggingParentId(null);
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
          setDraggingParentId(null);
          return;
        }
      } else {
        const result = handleServiceReorder(activeElementId, overElementId);
        if (!result) {
          setActiveId(null);
          setValidDropTargets(new Set());
          setDraggingLevel(null);
          setDraggingParentId(null);
          return;
        }
      }

      setActiveId(null);
      setValidDropTargets(new Set());
      setDraggingLevel(null);
      setDraggingParentId(null);
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
    searchQuery,
    selectedCategory,
    isCategorySheetOpen,
    selectedService,
    isServiceSheetOpen,
    isCreateServiceModalOpen,
    isCreateCategoryModalOpen,
    selectedParentCategory,
    selectedServiceCategory,
    isEditCategoryModalOpen,
    selectedEditCategory,
    isUpdateServiceModalOpen,
    selectedUpdateService,
    // Values - Drag and Drop
    isEditMode,
    reorderState,
    activeId,
    validDropTargets,
    expandedCategories,
    draggingLevel,
    sensors,
    // Values - Computed
    hasCategories,
    hasPendingChanges,
    categoryMap,
    // Handlers - Search
    handleSearchChange,
    // Handlers - Category
    handleCategoryClick,
    handleCreateCategory,
    handleCreateSubcategory,
    handleEditCategory,
    handleCloseCreateCategoryModal,
    handleCloseEditCategoryModal,
    handleCloseCategorySheet,
    // Handlers - Service
    handleServiceClick,
    handleCreateService,
    handleEditService,
    handleCloseCreateServiceModal,
    handleCloseUpdateServiceModal,
    handleCloseServiceSheet,
    // Handlers - Edit Mode
    handleStartEditMode,
    handleCancelEditMode,
    handleSaveChanges,
    // Handlers - Expand/Collapse
    handleToggleExpand,
    // Handlers - Drag and Drop
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
};
