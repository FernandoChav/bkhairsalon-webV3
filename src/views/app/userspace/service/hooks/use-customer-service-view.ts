'use client';

import { atom, useAtom } from 'jotai';

import { useMemo } from 'react';

import { useGetAllCategoryQuery, useGetAllServiceQuery } from '@/hooks/api';

export const selectedCategoryAtom = atom<string>('all');

export const useCustomerServiceView = () => {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllCategoryQuery(true, true);
  const { data: servicesData, isLoading: servicesLoading } =
    useGetAllServiceQuery();

  const categories = useMemo(() => categoriesData || [], [categoriesData]);
  const services = useMemo(() => {
    if (servicesData?.data) {
      return servicesData.data.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description || '',
        duration: service.durationInMinutes,
        price: service.price,
        startTime: '',
        endTime: '',
        sortOrder: 0,
        commissionPercentage: 0,
        categoryId: '',
        categoryName: '',
        images: service.images || [],
        photos: [],
        createdAt: '',
        updatedAt: '',
        createdBy: '',
      }));
    }
    return [];
  }, [servicesData]);

  const topLevelCategories = useMemo(
    () => categories.filter(cat => cat.level === 1 && cat.isActive),
    [categories]
  );

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return services;
    const selected = categories.find(cat => cat.slug === selectedCategory);
    if (!selected) return services;

    return services.filter(s => s.categoryId === selected.id);
  }, [selectedCategory, services, categories]);

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
