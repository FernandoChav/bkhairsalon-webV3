export enum UserRole {
  ADMIN = 'Admin',
  STYLIST = 'Stylist',
  RECEPTIONIST = 'Receptionist',
  CLIENT = 'Client',
}

export interface UserRoleData {
  id: string;
  name: UserRole;
}
