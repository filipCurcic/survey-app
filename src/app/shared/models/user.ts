import { Permission } from './permission';
export interface User {
  id: number;
  email: string;
  password: string;
  permission: Permission;
}
