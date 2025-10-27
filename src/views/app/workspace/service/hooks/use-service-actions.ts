import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

import {
  isCreateServiceModalOpenAtom,
  isServiceSheetOpenAtom,
  isUpdateServiceModalOpenAtom,
  selectedServiceAtom,
  selectedServiceCategoryAtom,
  selectedUpdateServiceAtom,
  isDeleteServiceModalOpenAtom,
  selectedDeleteServiceAtom,
} from '@/atoms';
import { CategoryResponse, ServiceResponse } from '@/models/responses';

interface UseServiceActionsReturn {
  // Handlers
  handleServiceClick: (service: ServiceResponse) => void;
  handleCreateService: (category: CategoryResponse) => void;
  handleEditService: (service: ServiceResponse) => void;
  handleDeleteService: (service: ServiceResponse) => void;
  handleCloseServiceSheet: () => void;
  handleCloseCreateServiceModal: () => void;
  handleCloseUpdateServiceModal: () => void;
  handleCloseDeleteServiceModal: () => void;
}

export const useServiceActions = (): UseServiceActionsReturn => {
  const setSelectedService = useSetAtom(selectedServiceAtom);
  const setIsServiceSheetOpen = useSetAtom(isServiceSheetOpenAtom);
  const setIsCreateServiceModalOpen = useSetAtom(isCreateServiceModalOpenAtom);
  const setSelectedServiceCategory = useSetAtom(selectedServiceCategoryAtom);
  const setIsUpdateServiceModalOpen = useSetAtom(isUpdateServiceModalOpenAtom);
  const setSelectedUpdateService = useSetAtom(selectedUpdateServiceAtom);
  const setIsDeleteServiceModalOpen = useSetAtom(isDeleteServiceModalOpenAtom);
  const setSelectedDeleteService = useSetAtom(selectedDeleteServiceAtom);

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

  const handleDeleteService = useCallback(
    (service: ServiceResponse) => {
      setSelectedDeleteService(service);
      setIsDeleteServiceModalOpen(true);
      setIsServiceSheetOpen(false);
    },
    [
      setSelectedDeleteService,
      setIsDeleteServiceModalOpen,
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

  const handleCloseDeleteServiceModal = useCallback(() => {
    setIsDeleteServiceModalOpen(false);
    setSelectedDeleteService(null);
  }, [setIsDeleteServiceModalOpen, setSelectedDeleteService]);

  return {
    // Handlers
    handleServiceClick,
    handleCreateService,
    handleEditService,
    handleDeleteService,
    handleCloseServiceSheet,
    handleCloseCreateServiceModal,
    handleCloseUpdateServiceModal,
    handleCloseDeleteServiceModal,
  };
};
