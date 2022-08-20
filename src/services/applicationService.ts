import { AxiosResponse } from 'axios';
import axios from '../axios';
import { Gender, Status, Talent } from '../util/enums';
import { IUser } from './userService';

interface IAuditionPostId {
  _id: string;
  author: IUser;
}

export interface IApplication {
  _id: string;
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
export const getApplicationById = async (
  applicationId: string
): Promise<IApplication> => {
  const res = await axios.get(`/applications/${applicationId}`);
  return res.data;
};

export const createApplication = async (data: {}): Promise<any> => {
  const res = await axios.post('/applications', data);
  return res.data;
};

export const updateApplication = async (data: {
  applicationId: string;
  applicationStatus: Status;
}): Promise<any> => {
  const res = await axios.put(`/applications/${data.applicationId}`, data);
  return res.data;
};
