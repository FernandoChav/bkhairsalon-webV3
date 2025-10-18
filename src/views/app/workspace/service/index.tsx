'use client';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import { HiCheck, HiPencil, HiPlus, HiSearch, HiX } from 'react-icons/hi';

import { FC } from 'react';

import {
  Button,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn';

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
import { useServiceView } from './hooks';

export const ServiceView: FC = () => {
  const {
    // Values - Data
    categories,
    isLoading,
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
  } = useServiceView();

  // Computed values for rendering
  const categoriesToRender = isEditMode ? reorderState.categories : categories;
  const isEditButtonDisabled = isSaving || !hasPendingChanges;
  const saveButtonText = isSaving ? 'Guardando...' : 'Guardar Cambios';

  // Computed values for drag overlay
  const dragOverlayContent = (() => {
    if (!activeId) return null;

    const isDraggingCategory = activeId.startsWith('category-');
    const elementId = activeId.replace(/^(category-|service-)/, '');

    if (isDraggingCategory) {
      const info = categoryMap.get(elementId);
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
    }

    // Service
    let service = null;
    categoryMap.forEach(info => {
      const found = info.category.services?.find(s => s.id === elementId);
      if (found) service = found;
    });

    return service ? (
      <ServiceCard
        service={service}
        onServiceClick={() => {}}
        isEditMode={false}
      />
    ) : null;
  })();

  // Show loading state
  if (isLoading || isSaving) {
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
            onChange={e => handleSearchChange(e.target.value)}
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
            {categoriesToRender.map(category => (
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
            ))}
          </div>

          <DragOverlay>
            {activeId ? (
              <div
                className={`opacity-90 scale-105 ${activeId.startsWith('category-') ? 'rotate-1' : 'rotate-3'}`}
              >
                {dragOverlayContent}
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
        onClose={handleCloseCategorySheet}
      />

      <ServiceDetailsSheet
        service={selectedService}
        isOpen={isServiceSheetOpen}
        onClose={handleCloseServiceSheet}
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
