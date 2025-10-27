export interface PhotoResponse {
  id: string;
  description?: string;
  url: string;
  publicId: string;
  altText?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  entityType: string;
  entityId: string;
  isPrimary: boolean;
}

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
  photos: PhotoResponse[];
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
export interface PublicServiceDetailResponse extends PublicServiceResponse {
  startTime?: string | null; // Puede ser null o no existir
  endTime?: string | null; // Puede ser null o no existir
}
