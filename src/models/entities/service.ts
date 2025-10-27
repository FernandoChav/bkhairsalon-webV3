import { BaseEntity } from './base-entity';

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

export interface BookedService extends Service {
  id: string;
  forWho: string;
}
