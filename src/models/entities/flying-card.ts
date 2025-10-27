import { Service } from './service';

export interface FlyingCard {
  id: string;
  service: Service;
  startX: number;
  startY: number;
}
