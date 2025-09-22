export interface CategoryDto {
  id: string;
  name: string;
  level: number;
  fullPath: string;
  isFinal: boolean;
  parentCategoryId?: string;
  subCategories: CategoryDto[];
}