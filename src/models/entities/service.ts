import { BaseEntity } from './base';

export interface Service extends BaseEntity {
  name: string;
  duration: number;
  description?: string;
  price: number;
  startTime: string;
  endTime: string;
  sortOrder: number;
  commissionPercentage: number;
  categoryId: string;
}
