import { ServiceResponse } from './service';

export interface CategoryResponse {
  id: string;
  name: string;
  description?: string;
  level: number;
  fullPath: string;
  isFinal: boolean;
  isActive: boolean;
  parentCategoryId?: string;
  subCategories: CategoryResponse[];
  services: ServiceResponse[];
}
