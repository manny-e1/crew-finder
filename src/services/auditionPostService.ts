import { AxiosResponse } from 'axios';
import axios from '../axios';
import { Gender, Talent } from '../enums';
import { IUser } from './userService';

export interface IAuditionPost {
  id: string;
  author: IUser;
  title: string;
  text: string;
  talents: Talent[];
  applicationCount: number;
  ageRange: { min: number; max: number };
  languages: string[];
  gender: Gender[];
  region: string;
  endorsementCount: number;
  isAcceptingApplication: boolean;
  createdAt: Date;
}

export const getAuditionPosts = async (
  query?: string
): Promise<IAuditionPost[]> => {
  let res: AxiosResponse;
  if (query && query.startsWith('?search')) {
    res = await axios.get(`/auditionPosts/search${query}`);
  } else {
    res = await axios.get(`/auditionPosts${query}`);
  }
  return res.data;
};
