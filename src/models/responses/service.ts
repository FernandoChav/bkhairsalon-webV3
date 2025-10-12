export interface ServiceResponse {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  startTime: string;
  endTime: string;
  sortOrder: number;
  commissionPercentage: number;
  categoryId: string;
  categoryName: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface PublicServiceResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  durationInMinutes: number;
  images: string[];
}
