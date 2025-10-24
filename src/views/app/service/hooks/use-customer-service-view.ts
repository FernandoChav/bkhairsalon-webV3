'use client';

import { atom, useAtom } from 'jotai';

import { useMemo } from 'react';

import {
  useGetAllCategoryQuery,
  useGetAllServicePublicQuery,
} from '@/hooks/api';
import { CategoryResponse, ServiceResponse } from '@/models/responses';

export const selectedCategoryAtom = atom<string>('all');

export const useCustomerServiceView = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllCategoryQuery(true, true);
  const { data: servicesData, isLoading: servicesLoading } =
    useGetAllServicePublicQuery();

  const categories = useMemo(() => categoriesData || [], [categoriesData]);

  const topLevelCategories = useMemo(
    () => categories.filter(cat => cat.level === 1 && cat.isActive),
    [categories]
  );

  const filteredServices = useMemo(() => {
    if (!categories || !servicesData?.data) return [];

    const allServices: (ServiceResponse & {
      categoryId: string;
      categoryName: string;
    })[] = [];
    const traverseCategories = (cats: CategoryResponse[]) => {
      cats.forEach(cat => {
        if (cat.services) {
          cat.services.forEach(s => {
            allServices.push({
              ...s,
              categoryId: cat.id,
              categoryName: cat.name,
            });
          });
        }
        if (cat.subcategories) traverseCategories(cat.subcategories);
      });
    };
    traverseCategories(categories);

    if (selectedCategory === 'all') return allServices;

    const selectedCat = categories.find(cat => cat.slug === selectedCategory);
    if (!selectedCat) return allServices;

    return allServices.filter(s => s.categoryId === selectedCat.id);
  }, [selectedCategory, categories, servicesData]);

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || '';
  };

  const selectAllCategories = () => setSelectedCategory('all');
  const filterByCategory = (slug: string) => setSelectedCategory(slug || 'all');
  const isAllSelected = selectedCategory === 'all';

  const isLoading = categoriesLoading || servicesLoading;

  return {
    categories,
    topLevelCategories,
    filteredServices,
    selectedCategory,
    isAllSelected,
    getCategoryName,
    selectAllCategories,
    filterByCategory,
    isLoading,
  };
};
