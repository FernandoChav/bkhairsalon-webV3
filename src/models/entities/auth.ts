import { BaseEntity } from '../generics/api';

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}
