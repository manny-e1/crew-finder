import { Role, Talent, Verification } from '../util/enums';

export interface IUser {
  id: string;
  fullName?: string;
  role: Role;
  verification?: Verification;
  talent?: Talent;
  username?: string;
}
