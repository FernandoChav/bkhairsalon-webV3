export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // ISO date string
  password: string;
  confirmPassword: string;
}

export interface LoginRequest { 
  email: string; 
  password: string; 
}
