import { Role, Talent, Verification } from '../util/enums';
import axios from '../axios';
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
  bio?: string;
  avatar?: string;
  birthdate?: Date;
  gender?: string;
  address?: {
    country: string;
    region: string;
  };
}

export const getUserDetail = async (id: string): Promise<IUser> => {
  const res = await axios.get(`/users/${id}`);
  return res.data;
};

export const getUsers = async (query: string): Promise<IUser[]> => {
  const res = await axios.get(`/users/${query}`);
  return res.data;
};
