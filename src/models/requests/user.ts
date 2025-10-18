export interface EditUserRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string; // ISO date string
  currentPassword: string;
}

export interface DeleteUserRequest {
  password: string;
}
