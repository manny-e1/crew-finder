import { Role, Talent, Verification } from '../util/enums';

export interface IUser {
  _id: string;
  fullName?: string;
  email?: string;
  role: Role;
  verification?: Verification;
  talent?: Talent;
  username?: string;
  phoneNumber?: string;
  otherTalents?: Talent[];
  address?: {
    country: string;
    region: string;
  };
}
