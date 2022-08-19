import { AxiosResponse } from 'axios';
import axios from '../axios';
import { Gender, Status, Talent } from '../util/enums';
import { IUser } from './userService';

interface IAuditionPostId {
  _id: string;
  author: IUser;
}

export interface IApplication {
  auditionPostId: IAuditionPostId;
  applicantId: IUser;
  applicationLetter: string;
  applicationStatus: Status;
}
export interface ICreateApplicationParams {
  auditionPostId: string;
  applicationLetter: string;
}

export const getApplicationsForAuditionPosts = async (
  auditionPostId: string
): Promise<IApplication[]> => {
  const res = await axios.get(`/applications/audition/${auditionPostId}`);

  return res.data;
};

export const createApplication = async (data: {
  auditionPostId: string;
  applicationLetter: string;
}): Promise<any> => {
  const res = await axios.post('/applications', data);
  return res.data;
};
