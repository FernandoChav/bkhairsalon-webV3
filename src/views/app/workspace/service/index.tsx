'use client';

import { HiPlus, HiSearch } from 'react-icons/hi';

import { FC, useState } from 'react';

import {
  Button,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shadcn';
import { useGetAllCategoryQuery } from '@/hooks/api';
import { CategoryResponse, ServiceResponse } from '@/models/responses';

import {
  CategoryCard,
  CategoryDetailsSheet,
  CreateCategoryModal,
  CreateServiceModal,
  EditCategoryModal,
  ServiceDetailsSheet,
  UpdateServiceModal,
} from './components';

export const ServiceView: FC = () => {
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetAllCategoryQuery(true, true); // includeSubcategories=true, includeServices=true

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

  const hasCategories = categories.length > 0;

  // Show loading state while fetching categories
  if (categoriesLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando categorías...</p>
          </div>
        </div>
      </div>
    );
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
      </div>

      {/* Search Bar */}
      {hasCategories && (
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
        <div className="space-y-3">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onCategoryClick={handleCategoryClick}
              onServiceClick={handleServiceClick}
              onCreateService={handleCreateService}
              onCreateSubcategory={handleCreateSubcategory}
              onEditCategory={handleEditCategory}
              onEditService={handleEditService}
            />
          ))}
        </div>
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
        categories={categories}
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
