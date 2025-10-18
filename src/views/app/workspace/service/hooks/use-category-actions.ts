import { useSetAtom } from 'jotai';

import { useCallback } from 'react';

import {
  isCategorySheetOpenAtom,
  isCreateCategoryModalOpenAtom,
  isEditCategoryModalOpenAtom,
  selectedCategoryAtom,
  selectedEditCategoryAtom,
  selectedParentCategoryAtom,
} from '@/atoms';
import { CategoryResponse } from '@/models/responses';

interface UseCategoryActionsReturn {
  // Handlers
  handleCategoryClick: (category: CategoryResponse) => void;
  handleCreateSubcategory: (parentCategory: CategoryResponse) => void;
  handleEditCategory: (category: CategoryResponse) => void;
  handleCloseCategorySheet: () => void;
  handleCloseCreateCategoryModal: () => void;
  handleCloseEditCategoryModal: () => void;
}

export const useCategoryActions = (): UseCategoryActionsReturn => {
  const setSelectedCategory = useSetAtom(selectedCategoryAtom);
  const setIsCategorySheetOpen = useSetAtom(isCategorySheetOpenAtom);
  const setIsCreateCategoryModalOpen = useSetAtom(
    isCreateCategoryModalOpenAtom
  );
  const setSelectedParentCategory = useSetAtom(selectedParentCategoryAtom);
  const setIsEditCategoryModalOpen = useSetAtom(isEditCategoryModalOpenAtom);
  const setSelectedEditCategory = useSetAtom(selectedEditCategoryAtom);

  // Handlers - Category
  const handleCategoryClick = useCallback(
    (category: CategoryResponse) => {
      setSelectedCategory(category);
      setIsCategorySheetOpen(true);
    },
    [setSelectedCategory, setIsCategorySheetOpen]
  );

  const handleCreateSubcategory = useCallback(
    (parentCategory: CategoryResponse) => {
      setSelectedParentCategory(parentCategory);
      setIsCreateCategoryModalOpen(true);
    },
    [setSelectedParentCategory, setIsCreateCategoryModalOpen]
  );

  const handleEditCategory = useCallback(
    (category: CategoryResponse) => {
      setSelectedEditCategory(category);
      setIsEditCategoryModalOpen(true);
    },
    [setSelectedEditCategory, setIsEditCategoryModalOpen]
  );

  const handleCloseCategorySheet = useCallback(() => {
    setIsCategorySheetOpen(false);
  }, [setIsCategorySheetOpen]);

  const handleCloseCreateCategoryModal = useCallback(() => {
    setIsCreateCategoryModalOpen(false);
    setSelectedParentCategory(null);
  }, [setIsCreateCategoryModalOpen, setSelectedParentCategory]);

  const handleCloseEditCategoryModal = useCallback(() => {
    setIsEditCategoryModalOpen(false);
    setSelectedEditCategory(null);
  }, [setIsEditCategoryModalOpen, setSelectedEditCategory]);

  return {
    // Handlers
    handleCategoryClick,
    handleCreateSubcategory,
    handleEditCategory,
    handleCloseCategorySheet,
    handleCloseCreateCategoryModal,
    handleCloseEditCategoryModal,
  };
};
