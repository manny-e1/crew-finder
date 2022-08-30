import { Role, Talent, Verification } from '../enums/enums';
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

export type UserUpdateType = {
  fullName?: string;
  avatar?: string;
  bio?: string;
  gender?: string;
  address?: {
    country?: string;
    region?: string;
  };
  talent?: Talent;

  phoneNumber?: string;
  otherTalents?: Talent[];
};

export const getUserDetail = async (id: string): Promise<IUser> => {
  const res = await axios.get(`/users/${id}`);
  return res.data;
};

export const getUsers = async (query: string): Promise<IUser[]> => {
  const res = await axios.get(`/users?search=${query}`);
  return res.data;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  const res = await axios.get('/users/all');
  return res.data;
};

export const updateUser = async (data: UserUpdateType): Promise<any> => {
  const res = await axios.put('/users/update', data);
  return res.data;
};

export const deleteUser = async (id: string): Promise<any> => {
  const res = await axios.delete(`/users/${id}`);
  return res.data;
};
