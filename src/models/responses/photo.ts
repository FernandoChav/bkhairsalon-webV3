export interface PhotoDto {
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
