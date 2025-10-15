export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  slug?: string;
  isDeleted: boolean;
}
