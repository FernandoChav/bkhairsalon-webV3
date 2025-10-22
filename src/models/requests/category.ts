import { CategoryResponse } from '../responses';

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  parentCategoryId?: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description: string;
}

// Drag and Drop Types
export interface DragContext {
  categoryId?: string; // Para servicios, indica en qué categoría están
  parentCategoryId?: string; // Para subcategorías, indica el padre
  level: number; // Nivel de anidamiento
}

export interface ReorderState {
  categories: CategoryResponse[];
  pendingChanges: PendingChange[];
}

export interface PendingChange {
  id: string;
  type: 'category' | 'service';
  newSortOrder: number;
  parentCategoryId?: string; // Para categorías
  categoryId?: string; // Para servicios
  context: DragContext;
}

// Reorder Request Types
export interface ReorderElementRequest {
  id: string;
  sortOrder: number;
  services: ReorderServiceRequest[];
  subcategories?: ReorderElementRequest[];
}

export interface ReorderServiceRequest {
  id: string;
  sortOrder: number;
}

export interface ReorderElementsRequest {
  categories: ReorderElementRequest[];
}
