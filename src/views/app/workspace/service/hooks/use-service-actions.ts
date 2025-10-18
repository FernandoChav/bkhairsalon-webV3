import { useSetAtom } from 'jotai';

import { useCallback } from 'react';

import {
  isCreateServiceModalOpenAtom,
  isServiceSheetOpenAtom,
  isUpdateServiceModalOpenAtom,
  selectedServiceAtom,
  selectedServiceCategoryAtom,
  selectedUpdateServiceAtom,
} from '@/atoms';
import { CategoryResponse, ServiceResponse } from '@/models/responses';

interface UseServiceActionsReturn {
  // Handlers
  handleServiceClick: (service: ServiceResponse) => void;
  handleCreateService: (category: CategoryResponse) => void;
  handleEditService: (service: ServiceResponse) => void;
  handleCloseServiceSheet: () => void;
  handleCloseCreateServiceModal: () => void;
  handleCloseUpdateServiceModal: () => void;
}

export const useServiceActions = (): UseServiceActionsReturn => {
  const setSelectedService = useSetAtom(selectedServiceAtom);
  const setIsServiceSheetOpen = useSetAtom(isServiceSheetOpenAtom);
  const setIsCreateServiceModalOpen = useSetAtom(isCreateServiceModalOpenAtom);
  const setSelectedServiceCategory = useSetAtom(selectedServiceCategoryAtom);
  const setIsUpdateServiceModalOpen = useSetAtom(isUpdateServiceModalOpenAtom);
  const setSelectedUpdateService = useSetAtom(selectedUpdateServiceAtom);

  // Handlers - Service
  const handleServiceClick = useCallback(
    (service: ServiceResponse) => {
      setSelectedService(service);
      setIsServiceSheetOpen(true);
    },
    [setSelectedService, setIsServiceSheetOpen]
  );

  const handleCreateService = useCallback(
    (category: CategoryResponse) => {
      setSelectedServiceCategory(category);
      setIsCreateServiceModalOpen(true);
    },
    [setSelectedServiceCategory, setIsCreateServiceModalOpen]
  );

  const handleEditService = useCallback(
    (service: ServiceResponse) => {
      setSelectedUpdateService(service);
      setIsUpdateServiceModalOpen(true);
      setIsServiceSheetOpen(false);
    },
    [
      setSelectedUpdateService,
      setIsUpdateServiceModalOpen,
      setIsServiceSheetOpen,
    ]
  );

  const handleCloseServiceSheet = useCallback(() => {
    setIsServiceSheetOpen(false);
  }, [setIsServiceSheetOpen]);

  const handleCloseCreateServiceModal = useCallback(() => {
    setIsCreateServiceModalOpen(false);
    setSelectedServiceCategory(null);
  }, [setIsCreateServiceModalOpen, setSelectedServiceCategory]);

  const handleCloseUpdateServiceModal = useCallback(() => {
    setIsUpdateServiceModalOpen(false);
    setSelectedUpdateService(null);
  }, [setIsUpdateServiceModalOpen, setSelectedUpdateService]);

  return {
    // Handlers
    handleServiceClick,
    handleCreateService,
    handleEditService,
    handleCloseServiceSheet,
    handleCloseCreateServiceModal,
    handleCloseUpdateServiceModal,
  };
};
