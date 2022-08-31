import axios from '../axios';
import { IUser } from './userService';

export interface IReport {
  reporter: IUser;
  reportedUser: IUser;
  reason: string;
}

export const reportUser = async (data: {
  reportedUser: string;
  reason: string;
}): Promise<any> => {
  const res = await axios.post('/reports', data);
  return res.data;
};

export const getReports = async (): Promise<IReport[]> => {
  const res = await axios.get('/reports');
  return res.data;
};

export const getReportById = async (reportId: string): Promise<IReport> => {
  const res = await axios.get(`/reports/${reportId}`);
  return res.data;
};

export const removeReport = async (reportId: string): Promise<IReport> => {
  const res = await axios.delete(`/reports/${reportId}`);
  return res.data;
};
