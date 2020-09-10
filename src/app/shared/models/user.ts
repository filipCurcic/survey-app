import { Permission } from './permission';
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  permission: Permission;
}
