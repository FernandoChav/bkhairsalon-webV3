export interface ProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // DateOnly from API comes as string
}
