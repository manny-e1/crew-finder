import { Role, Verification } from '../enums';

export interface IUser {
  id: string;
  fullName?: string;
  role: Role;
  verification?: Verification;
}
