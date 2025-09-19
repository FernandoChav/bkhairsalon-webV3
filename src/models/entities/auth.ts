import { BaseEntity } from '@/models/entities/base';

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}
