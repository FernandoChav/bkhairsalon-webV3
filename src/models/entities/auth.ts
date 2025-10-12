import { UserRoleData } from './role';

export interface JWTUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRoleData[];
}
