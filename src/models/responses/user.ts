export interface ProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // DateOnly from API comes as string
}

export interface DeletionInfoDto {
  message: string;
  data: {
    hasPendingAppointments: false;
    pendingAppointmentsCount: number;
    message: string;
  };
  errorData: ValidationError | null;
}

export interface ValidationError {
  errors: Record<string, string[]>;
}
