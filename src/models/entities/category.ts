import { BaseEntity } from './base';
import { Service } from './service';

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  isActive: boolean;
  level: number;
  fullPath: string;
  isFinal: boolean;
  sortOrder: number;
  parentCategoryId?: string;
  parentCategory?: Category;
  subCategories?: Category[];
  services?: Service[];
}
