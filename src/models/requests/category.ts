export interface CreateCategoryRequest {
  name: string;
  description?: string;
  parentCategoryId?: string;
}
