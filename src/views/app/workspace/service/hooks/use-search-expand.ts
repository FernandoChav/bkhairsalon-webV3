import { useAtom } from 'jotai';

import { useCallback } from 'react';

import { expandedCategoriesAtom } from '@/atoms';

interface UseSearchExpandReturn {
  // Values
  expandedCategories: Set<string>;
  // Handlers
  handleToggleExpand: (categoryId: string) => void;
}

export const useSearchExpand = (): UseSearchExpandReturn => {
  const [expandedCategories, setExpandedCategories] = useAtom(
    expandedCategoriesAtom
  );

  // Handlers - Expand/Collapse
  const handleToggleExpand = useCallback(
    (categoryId: string) => {
      setExpandedCategories(prev => {
        const newSet = new Set(prev);
        if (newSet.has(categoryId)) {
          newSet.delete(categoryId);
        } else {
          newSet.add(categoryId);
        }
        return newSet;
      });
    },
    [setExpandedCategories]
  );

  return {
    // Values
    expandedCategories,
    // Handlers
    handleToggleExpand,
  };
};
