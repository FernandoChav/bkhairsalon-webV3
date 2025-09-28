import { FC } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn';
import { useGetCategoriesQuery } from '@/hooks/api';
import { CategoryDto } from '@/models/responses';

interface CategorySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const CategorySelector: FC<CategorySelectorProps> = ({
  value,
  onValueChange,
  placeholder = 'Selecciona una categoría',
  disabled = false,
}) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  // Flatten categories and filter only final categories
  const getFinalCategories = (cats: CategoryDto[]): CategoryDto[] => {
    const finalCats: CategoryDto[] = [];

    const traverse = (categories: CategoryDto[]) => {
      categories.forEach(category => {
        if (category.isFinal) {
          finalCats.push(category);
        }
        if (category.subCategories && category.subCategories.length > 0) {
          traverse(category.subCategories);
        }
      });
    };

    traverse(cats);
    return finalCats;
  };

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Cargando categorías..." />
        </SelectTrigger>
      </Select>
    );
  }

  if (error || !categories) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Error al cargar categorías" />
        </SelectTrigger>
      </Select>
    );
  }

  const finalCategories = getFinalCategories(categories);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {finalCategories.map(category => (
          <SelectItem key={category.id} value={category.id}>
            <span className="text-sm">{category.fullPath}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
