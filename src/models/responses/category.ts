import { BaseEntity } from '../entities/base-entity';
import { ServiceResponse } from './service';

export interface CategoryResponse extends BaseEntity {
  name: string;
  description?: string;
  level: number;
  fullPath: string;
  isFinal: boolean;
  isActive: boolean;
  sortOrder: number;
  parentCategoryId?: string;
  subcategories: CategoryResponse[];
  services: ServiceResponse[];
}
