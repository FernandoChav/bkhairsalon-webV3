'use client';

import { Button } from '@/components/shadcn/button';

interface Props {
  categories: { slug?: string; name: string }[];
  isAllSelected: boolean;
  selectedCategory: string;
  selectAllCategories: () => void;
  filterByCategory: (slug: string) => void;
}

export const CategoryFilter: React.FC<Props> = ({
  categories,
  isAllSelected,
  selectedCategory,
  selectAllCategories,
  filterByCategory,
}) => (
  <div className="mb-6 flex flex-wrap gap-2">
    <Button
      variant={isAllSelected ? 'default' : 'outline'}
      onClick={selectAllCategories}
      className="rounded-full"
    >
      Todas
    </Button>

    {categories.map(category => (
      <Button
        key={category.slug}
        variant={selectedCategory === category.slug ? 'default' : 'outline'}
        onClick={() => filterByCategory(category.slug || 'all')}
        className="rounded-full"
      >
        {category.name}
      </Button>
    ))}
  </div>
);
