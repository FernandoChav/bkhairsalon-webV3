'use client';

import { useAtomValue } from 'jotai';

import { FC } from 'react';

import {
  isEditModeAtom,
  selectedServiceCategoryAtom,
  selectedUpdateServiceAtom,
} from '@/atoms';

import {
  CategoryCard,
  CategoryDetailsSheet,
  CategoryList,
  CreateCategoryModal,
  CreateServiceModal,
  EditCategoryModal,
  ServiceCard,
  ServiceDetailsSheet,
  ServiceHeader,
  ServiceViewSkeleton,
  UpdateServiceModal,
} from './components';
import { useCategoryActions, useServiceActions, useServiceView } from './hooks';

export const ServiceView: FC = () => {
  // Atoms for shared state
  const selectedServiceCategory = useAtomValue(selectedServiceCategoryAtom);
  const selectedUpdateService = useAtomValue(selectedUpdateServiceAtom);
  const isEditMode = useAtomValue(isEditModeAtom);

  // Main view logic
  const {
    categories,
    isLoading,
    isSaving,
    reorderState,
    activeId,
    validDropTargets,
    draggingLevel,
    sensors,
    hasCategories,
    hasPendingChanges,
    categoryMap,
    handleCreateCategory,
    handleStartEditMode,
    handleCancelEditMode,
    handleSaveChanges,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useServiceView();

  // Category actions
  const {
    handleCloseCategorySheet,
    handleCloseCreateCategoryModal,
    handleCloseEditCategoryModal,
  } = useCategoryActions();

  // Service actions
  const {
    handleCloseServiceSheet,
    handleCloseCreateServiceModal,
    handleCloseUpdateServiceModal,
  } = useServiceActions();

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
      return (
        info && (
          <CategoryCard category={info.category} onCategoryClick={() => {}} />
        )
      );
    }

    // Service
    let service = null;
    categoryMap.forEach(info => {
      const found = info.category.services?.find(s => s.id === elementId);
      if (found) service = found;
    });

    return (
      service && <ServiceCard service={service} onServiceClick={() => {}} />
    );
  })();

  // Show loading state
  if (isLoading || isSaving) {
    return <ServiceViewSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <ServiceHeader
        isEditButtonDisabled={isEditButtonDisabled}
        saveButtonText={saveButtonText}
        hasPendingChanges={hasPendingChanges}
        handleStartEditMode={handleStartEditMode}
        handleCreateCategory={handleCreateCategory}
        handleSaveChanges={handleSaveChanges}
        handleCancelEditMode={handleCancelEditMode}
      />

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

      {/* Categories List */}
      <CategoryList
        hasCategories={hasCategories}
        categoriesToRender={categoriesToRender}
        sensors={sensors}
        validDropTargets={validDropTargets}
        activeId={activeId}
        draggingLevel={draggingLevel}
        dragOverlayContent={dragOverlayContent}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleDragOver={handleDragOver}
        handleCreateCategory={handleCreateCategory}
      />

      {/* Details Sheets */}
      <CategoryDetailsSheet onClose={handleCloseCategorySheet} />

      <ServiceDetailsSheet onClose={handleCloseServiceSheet} />

      {/* Create Service Modal */}
      {selectedServiceCategory && (
        <CreateServiceModal
          selectedCategory={selectedServiceCategory}
          onClose={handleCloseCreateServiceModal}
        />
      )}

      {/* Create Category Modal */}
      <CreateCategoryModal onClose={handleCloseCreateCategoryModal} />

      {/* Edit Category Modal */}
      <EditCategoryModal onClose={handleCloseEditCategoryModal} />

      {/* Update Service Modal */}
      {selectedUpdateService && (
        <UpdateServiceModal
          onClose={handleCloseUpdateServiceModal}
          service={selectedUpdateService}
        />
      )}
    </div>
  );
};
