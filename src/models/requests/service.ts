export interface CreateServiceRequest {
  name: string;
  description: string;
  duration: number;
  price: number;
  startTime: string;
  endTime: string;
  commissionPercentage: number;
  categoryId: string;
  discountId?: string;
  photos: File[];
}
