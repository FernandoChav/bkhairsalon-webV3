export enum UserRole {
  ADMIN = 'Administrador',
  STYLIST = 'Estilista',
  RECEPTIONIST = 'Recepcionista',
  CLIENT = 'Cliente',
}

export interface UserRoleData {
  id: string;
  name: UserRole;
}
