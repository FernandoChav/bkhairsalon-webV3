export interface EditUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // ISO date string
  currentPassword: string;
}
