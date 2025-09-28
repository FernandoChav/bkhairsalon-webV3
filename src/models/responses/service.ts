export interface ServiceResponse {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  startTime: string;
  endTime: string;
  commissionPercentage: number;
  categoryName: string;
  createdAt: string;
  createdBy: string;
}

export interface PublicServiceResponse {
  id: string;
  name: string;
  description?: string;
  price: number;
  durationInMinutes: number;
}
