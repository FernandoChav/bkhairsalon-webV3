import { useCallback, useMemo } from 'react';

import { CategoryResponse } from '@/models/responses';

interface UseCategoryFieldParams {
  categories: {
    data: CategoryResponse[];
    isLoading: boolean;
    error: unknown;
  };
}

interface UseCategoryFieldReturn {
  // Values
  hasCategories: boolean;
  isCategoriesDisabled: boolean;
  selectPlaceholder: string;
  categoryOptions: CategoryResponse[];
  // Handlers
  handleOpenChange: (
    open: boolean,
    currentValue: string | undefined,
    onBlur: () => void
  ) => void;
}

export const useCategoryField = ({
  categories,
}: UseCategoryFieldParams): UseCategoryFieldReturn => {
  const isCategoriesLoading = categories.isLoading;
  const hasCategoriesError = !!categories.error;
  const hasCategories = categories.data.length > 0;
  const isCategoriesDisabled = isCategoriesLoading;

  const selectPlaceholder = useMemo(() => {
    if (isCategoriesLoading) return 'Cargando categorías...';
    if (hasCategoriesError) return 'Error al cargar categorías';
    if (!hasCategories) return 'No hay categorías disponibles';
    return 'Selecciona una categoría';
  }, [isCategoriesLoading, hasCategoriesError, hasCategories]);

  const categoryOptions = useMemo(() => {
    return categories.data || [];
  }, [categories.data]);

  const handleOpenChange = useCallback(
    (
      open: boolean,
      currentValue: string | undefined,
      onBlur: () => void
    ): void => {
      if (!open && !currentValue) {
        onBlur();
      }
    },
    []
  );

  return {
    // Values
    hasCategories,
    isCategoriesDisabled,
    selectPlaceholder,
    categoryOptions,
    // Handlers
    handleOpenChange,
  };
};
