import { atom } from 'jotai';

import { CategoryResponse, ServiceResponse } from '@/models/responses';

// Category Sheet
export const selectedCategoryAtom = atom<CategoryResponse | null>(null);
export const isCategorySheetOpenAtom = atom(false);

// Service Sheet
export const selectedServiceAtom = atom<ServiceResponse | null>(null);
export const isServiceSheetOpenAtom = atom(false);

// Create Service Modal
export const isCreateServiceModalOpenAtom = atom(false);
export const selectedServiceCategoryAtom = atom<CategoryResponse | null>(null);

// Create Category Modal
export const isCreateCategoryModalOpenAtom = atom(false);
export const selectedParentCategoryAtom = atom<CategoryResponse | null>(null);

// Edit Category Modal
export const isEditCategoryModalOpenAtom = atom(false);
export const selectedEditCategoryAtom = atom<CategoryResponse | null>(null);

// Update Service Modal
export const isUpdateServiceModalOpenAtom = atom(false);
export const selectedUpdateServiceAtom = atom<ServiceResponse | null>(null);

// Drag and Drop State
export const isEditModeAtom = atom(false);
export const expandedCategoriesAtom = atom<Set<string>>(new Set<string>());

// Delete Service Confirmation
export const isDeleteServiceModalOpenAtom = atom(false);
export const selectedDeleteServiceAtom = atom<ServiceResponse | null>(null);