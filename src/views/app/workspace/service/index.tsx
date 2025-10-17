'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { HiCheck, HiPencil, HiPlus, HiSearch, HiX } from 'react-icons/hi';
import { toast } from 'sonner';

import { FC, useMemo, useState } from 'react';

import {
  Button,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn';
import {
  useGetAllCategoryQuery,
  useReorderElementsMutation,
} from '@/hooks/api';
import { ReorderElementRequest, ReorderState } from '@/models/requests';
import { CategoryResponse, ServiceResponse } from '@/models/responses';

import {
  CategoryCard,
  CategoryDetailsSheet,
  CreateCategoryModal,
  CreateServiceModal,
  EditCategoryModal,
  ServiceCard,
  ServiceDetailsSheet,
  ServiceViewSkeleton,
  UpdateServiceModal,
} from './components';

export const ServiceView: FC = () => {
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    refetch,
  } = useGetAllCategoryQuery(true, true); // includeSubcategories=true, includeServices=true

  const reorderMutation = useReorderElementsMutation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryResponse | null>(null);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<ServiceResponse | null>(null);
  const [isServiceSheetOpen, setIsServiceSheetOpen] = useState(false);
  const [isCreateServiceModalOpen, setIsCreateServiceModalOpen] =
    useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [selectedParentCategory, setSelectedParentCategory] =
    useState<CategoryResponse | null>(null);
  const [selectedServiceCategory, setSelectedServiceCategory] =
    useState<CategoryResponse | null>(null);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [selectedEditCategory, setSelectedEditCategory] =
    useState<CategoryResponse | null>(null);
  const [isUpdateServiceModalOpen, setIsUpdateServiceModalOpen] =
    useState(false);
  const [selectedUpdateService, setSelectedUpdateService] =
    useState<ServiceResponse | null>(null);

  // Estados para drag-and-drop
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

  // Estado para controlar expansión de categorías
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  // Estado para rastrear qué nivel se está arrastrando
  const [draggingLevel, setDraggingLevel] = useState<number | null>(null);
  const [draggingParentId, setDraggingParentId] = useState<string | null>(null);

  // Configuración de sensores para drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleCategoryClick = (category: CategoryResponse) => {
    setSelectedCategory(category);
    setIsCategorySheetOpen(true);
  };

  const handleServiceClick = (service: ServiceResponse) => {
    setSelectedService(service);
    setIsServiceSheetOpen(true);
  };

  const handleCreateService = (category: CategoryResponse) => {
    setSelectedServiceCategory(category);
    setIsCreateServiceModalOpen(true);
  };

  const handleCreateCategory = () => {
    setSelectedParentCategory(null);
    setIsCreateCategoryModalOpen(true);
  };

  const handleCreateSubcategory = (parentCategory: CategoryResponse) => {
    setSelectedParentCategory(parentCategory);
    setIsCreateCategoryModalOpen(true);
  };

  const handleEditCategory = (category: CategoryResponse) => {
    setSelectedEditCategory(category);
    setIsEditCategoryModalOpen(true);
  };

  const handleCloseCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(false);
    setSelectedParentCategory(null);
  };

  const handleCloseCreateServiceModal = () => {
    setIsCreateServiceModalOpen(false);
    setSelectedServiceCategory(null);
  };

  const handleCloseEditCategoryModal = () => {
    setIsEditCategoryModalOpen(false);
    setSelectedEditCategory(null);
  };

  const handleEditService = (service: ServiceResponse) => {
    setSelectedUpdateService(service);
    setIsUpdateServiceModalOpen(true);
    setIsServiceSheetOpen(false); // Cerrar el sheet de detalles
  };

  const handleCloseUpdateServiceModal = () => {
    setIsUpdateServiceModalOpen(false);
    setSelectedUpdateService(null);
  };

  // Funciones para drag-and-drop
  const handleStartEditMode = () => {
    setIsEditMode(true);
    setReorderState({
      categories: [...categories],
      pendingChanges: [],
    });
    // No colapsar automáticamente al entrar en modo edición
  };

  const handleCancelEditMode = () => {
    setIsEditMode(false);
    setReorderState({
      categories: [],
      pendingChanges: [],
    });
    setDraggingLevel(null);
    setDraggingParentId(null);
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);

      // Construir request con la estructura actual
      const request = buildReorderRequest(reorderState.categories);

      // Enviar la request
      await reorderMutation.mutateAsync(request);

      // Cerrar modo de edición y limpiar estado optimista
      setIsEditMode(false);
      setReorderState({
        categories: [],
        pendingChanges: [],
      });

      // Forzar un refetch completo de los datos
      await refetch();

      // Mostrar mensaje de éxito
      toast.success('Orden actualizado correctamente');
    } catch (error) {
      // Mostrar mensaje de error
      toast.error('Error al actualizar el orden');
      console.error('Error al reordenar:', error);

      // En caso de error, limpiar el estado
      setIsEditMode(false);
      setReorderState({
        categories: [],
        pendingChanges: [],
      });
    } finally {
      setIsSaving(false);
    }
  };

  const buildReorderRequest = (categories: CategoryResponse[]) => {
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
  };

  // Función para manejar la expansión de categorías
  const handleToggleExpand = (categoryId: string) => {
    // Permitir expandir/colapsar en modo edición, pero con restricciones
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
  };

  // Función para determinar si una categoría debe estar colapsada durante el drag
  const shouldCollapseCategory = (categoryId: string): boolean => {
    if (draggingLevel === null) return false;

    const categoryInfo = categoryMap.get(categoryId);
    if (!categoryInfo) return false;

    // Si estamos arrastrando categorías raíz (nivel 0), colapsar todas las categorías raíz
    if (draggingLevel === 0 && categoryInfo.level === 0) {
      return true;
    }

    // Si estamos arrastrando subcategorías de una categoría específica,
    // colapsar solo esas subcategorías
    if (draggingLevel > 0 && draggingParentId) {
      return (
        categoryInfo.parent?.id === draggingParentId &&
        categoryInfo.level === draggingLevel
      );
    }

    return false;
  };

  // Función para colapsar categorías del nivel apropiado al iniciar drag
  const collapseAppropriateLevel = (
    elementId: string,
    elementType: 'category' | 'service'
  ) => {
    if (elementType === 'service') {
      // Para servicios, encontrar la categoría padre y colapsar otros servicios
      const parentCategory = Array.from(categoryMap.values()).find(info =>
        info.category.services?.some(s => s.id === elementId)
      );

      if (parentCategory) {
        // No colapsar nada para servicios, solo marcar el contexto
        setDraggingLevel(-1); // Nivel especial para servicios
        setDraggingParentId(parentCategory.category.id);
      }
      return;
    }

    // Para categorías
    const draggedCategoryInfo = categoryMap.get(elementId);
    if (!draggedCategoryInfo) return;

    const level = draggedCategoryInfo.level;
    const parentId = draggedCategoryInfo.parent?.id || null;

    setDraggingLevel(level);
    setDraggingParentId(parentId);

    // Colapsar categorías del mismo nivel y contexto
    const categoriesToCollapse = new Set<string>();

    categoryMap.forEach((info, catId) => {
      if (info.level === level) {
        // Si es nivel 0, colapsar todas las categorías raíz
        if (level === 0) {
          categoriesToCollapse.add(catId);
        }
        // Si es un nivel más profundo, colapsar solo las del mismo padre
        else if (info.parent?.id === parentId) {
          categoriesToCollapse.add(catId);
        }
      }
    });

    // Actualizar el estado de expansión
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      categoriesToCollapse.forEach(id => newSet.delete(id));
      return newSet;
    });
  };

  // Cache para búsquedas optimizadas
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

  // Funciones de drag-and-drop
  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as string;
    setActiveId(activeId);
    setValidDropTargets(new Set());

    // Determinar el tipo y colapsar el nivel apropiado
    const elementType = activeId.startsWith('category-')
      ? 'category'
      : 'service';
    const elementId = activeId.replace(/^(category-|service-)/, '');

    collapseAppropriateLevel(elementId, elementType);
  };

  const handleDragEnd = (event: DragEndEvent) => {
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

    // Validar si realmente hubo un movimiento
    if (activeId === overId) {
      setActiveId(null);
      setValidDropTargets(new Set());
      setDraggingLevel(null);
      setDraggingParentId(null);
      return;
    }

    // Determinar el tipo de elementos
    const activeType = activeId.startsWith('category-')
      ? 'category'
      : 'service';

    // Para overId, puede ser category-drop- o service-drop-
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

    // Solo permitir reordenamiento del mismo tipo
    if (activeType !== overType) {
      setActiveId(null);
      setValidDropTargets(new Set());
      setDraggingLevel(null);
      setDraggingParentId(null);
      return;
    }

    // Obtener los índices actuales antes del movimiento
    const activeElementId = activeId.replace(/^(category-|service-)/, '');
    const overElementId = actualOverId;

    if (activeType === 'category') {
      const result = handleCategoryReorder(activeElementId, overElementId);
      if (!result) {
        // No hubo cambio real
        setActiveId(null);
        setValidDropTargets(new Set());
        setDraggingLevel(null);
        setDraggingParentId(null);
        return;
      }
    } else {
      const result = handleServiceReorder(activeElementId, overElementId);
      if (!result) {
        // No hubo cambio real
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
  };

  // Función optimizada para encontrar y reordenar categorías
  const findAndReorderCategories = (
    categories: CategoryResponse[],
    activeCategoryId: string,
    overCategoryId: string,
    level: number = 0
  ): {
    found: boolean;
    updatedCategories: CategoryResponse[];
    changed: boolean;
  } => {
    // Buscar en el nivel actual
    const activeIndex = categories.findIndex(
      cat => cat.id === activeCategoryId
    );
    const overIndex = categories.findIndex(cat => cat.id === overCategoryId);

    if (activeIndex !== -1 && overIndex !== -1) {
      // Verificar si realmente hay un cambio
      if (activeIndex === overIndex) {
        return { found: true, updatedCategories: categories, changed: false };
      }

      // Reordenar usando arrayMove
      const reorderedCategories = arrayMove(categories, activeIndex, overIndex);

      // Actualizar sortOrder
      const updatedCategories = reorderedCategories.map((category, index) => ({
        ...category,
        sortOrder: index + 1,
      }));

      return { found: true, updatedCategories, changed: true };
    }

    // Si no se encuentra en este nivel, buscar recursivamente en subcategorías
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
  };

  const handleCategoryReorder = (
    activeCategoryId: string,
    overCategoryId: string
  ): boolean => {
    let changed = false;

    setReorderState(prevState => {
      const newCategories = [...prevState.categories];

      // Usar la función recursiva para encontrar y reordenar
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
  };

  // Función optimizada para encontrar y reordenar servicios
  const findAndReorderServices = (
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

      // Buscar servicios en esta categoría
      const activeServiceIndex = services.findIndex(
        service => service.id === activeServiceId
      );
      const overServiceIndex = services.findIndex(
        service => service.id === overServiceId
      );

      if (activeServiceIndex !== -1 && overServiceIndex !== -1) {
        // Verificar si realmente hay un cambio
        if (activeServiceIndex === overServiceIndex) {
          return { found: true, updatedCategories: categories, changed: false };
        }

        // Reordenar servicios
        const reorderedServices = arrayMove(
          services,
          activeServiceIndex,
          overServiceIndex
        );

        // Actualizar sortOrder
        const updatedServices = reorderedServices.map((service, index) => ({
          ...service,
          sortOrder: index + 1,
        }));

        // Actualizar la categoría con los servicios reordenados
        const updatedCategories = [...categories];
        updatedCategories[i] = {
          ...category,
          services: updatedServices,
        };

        return { found: true, updatedCategories, changed: true };
      }

      // Si no se encuentra en esta categoría, buscar recursivamente en subcategorías
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
  };

  const handleServiceReorder = (
    activeServiceId: string,
    overServiceId: string
  ): boolean => {
    let changed = false;

    setReorderState(prevState => {
      const newCategories = [...prevState.categories];

      // Usar la función recursiva para encontrar y reordenar servicios
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
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setValidDropTargets(new Set());
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Determinar el tipo de elementos
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

    // Validaciones de restricciones
    if (activeType !== overType) {
      setValidDropTargets(new Set());
      return;
    }

    let isValidDrop = false;

    if (activeType === 'category') {
      const activeCategoryId = activeId.replace('category-', '');
      const overCategoryId = actualOverId;

      // Usar el mapa para búsqueda rápida
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

      // Encontrar las categorías que contienen estos servicios
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

    // Actualizar drop targets válidos
    if (isValidDrop) {
      setValidDropTargets(new Set([overId]));
    } else {
      setValidDropTargets(new Set());
    }
  };

  const hasCategories = categories.length > 0;
  const hasPendingChanges = reorderState.pendingChanges.length > 0;

  // Show loading state while fetching categories or saving changes
  if (categoriesLoading || isSaving) {
    return <ServiceViewSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
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
                    disabled={reorderMutation.isPending || !hasPendingChanges}
                  >
                    <HiCheck className="h-4 w-4" />
                    {reorderMutation.isPending
                      ? 'Guardando...'
                      : 'Guardar Cambios'}
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

      {/* Indicador de cambios pendientes */}
      {isEditMode && hasPendingChanges && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-blue-800">
              Tienes cambios pendientes
            </span>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {hasCategories && !isEditMode && (
        <div className="relative mb-4">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar categorías o servicios..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Categories List */}
      {hasCategories ? (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <div className="space-y-3">
            {(isEditMode ? reorderState.categories : categories).map(
              (category: CategoryResponse) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onCategoryClick={handleCategoryClick}
                  onServiceClick={handleServiceClick}
                  onCreateService={handleCreateService}
                  onCreateSubcategory={handleCreateSubcategory}
                  onEditCategory={handleEditCategory}
                  onEditService={handleEditService}
                  isEditMode={isEditMode}
                  validDropTargets={validDropTargets}
                  expandedCategories={expandedCategories}
                  onToggleExpand={handleToggleExpand}
                  isDragging={!!activeId}
                  draggingLevel={draggingLevel}
                />
              )
            )}
          </div>

          <DragOverlay>
            {activeId ? (
              <div
                className={`opacity-90 scale-105 ${activeId.startsWith('category-') ? 'rotate-1' : 'rotate-3'}`}
              >
                {activeId.startsWith('category-')
                  ? (() => {
                      const categoryId = activeId.replace('category-', '');
                      const info = categoryMap.get(categoryId);

                      return info ? (
                        <CategoryCard
                          category={info.category}
                          onCategoryClick={() => {}}
                          isEditMode={false}
                          expandedCategories={new Set()}
                          onToggleExpand={() => {}}
                          isDragging={false}
                          draggingLevel={null}
                        />
                      ) : null;
                    })()
                  : (() => {
                      const serviceId = activeId.replace('service-', '');
                      let service: ServiceResponse | null = null;

                      categoryMap.forEach(info => {
                        const found = info.category.services?.find(
                          s => s.id === serviceId
                        );
                        if (found) service = found;
                      });

                      return service ? (
                        <ServiceCard
                          service={service}
                          onServiceClick={() => {}}
                          isEditMode={false}
                        />
                      ) : null;
                    })()}
              </div>
            ) : null}
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
      )}

      {/* Details Sheets */}
      <CategoryDetailsSheet
        category={selectedCategory}
        isOpen={isCategorySheetOpen}
        onClose={() => setIsCategorySheetOpen(false)}
      />

      <ServiceDetailsSheet
        service={selectedService}
        isOpen={isServiceSheetOpen}
        onClose={() => setIsServiceSheetOpen(false)}
      />

      {/* Create Service Modal */}
      {selectedServiceCategory && (
        <CreateServiceModal
          isOpen={isCreateServiceModalOpen}
          onClose={handleCloseCreateServiceModal}
          selectedCategory={selectedServiceCategory}
        />
      )}

      {/* Create Category Modal */}
      <CreateCategoryModal
        isOpen={isCreateCategoryModalOpen}
        onClose={handleCloseCreateCategoryModal}
        parentCategory={selectedParentCategory}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        onClose={handleCloseEditCategoryModal}
        category={selectedEditCategory}
      />

      {/* Update Service Modal */}
      {selectedUpdateService && (
        <UpdateServiceModal
          isOpen={isUpdateServiceModalOpen}
          onClose={handleCloseUpdateServiceModal}
          service={selectedUpdateService}
        />
      )}
    </div>
  );
};
