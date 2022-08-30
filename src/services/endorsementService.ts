import axios from '../axios';
import { IUser } from './userService';

export interface IEndorsement {
  endorser: IUser | string;
  endorsee: IUser | string;
}

export const getGivenEndorsements = async (): Promise<IEndorsement[]> => {
  const res = await axios.get('/endorsements/given');
  return res.data;
};

export const getReceivedEndorsements = async (
  endorseeId: string
): Promise<IEndorsement[]> => {
  const res = await axios.get(`/endorsements/received/${endorseeId}`);
  return res.data;
};

export const endorseUser = async (data: {
  endorseeId: string;
}): Promise<any> => {
  const res = await axios.post('/endorsements', data);
  return res.data;
};

export const deleteEndorsement = async (id: string): Promise<any> => {
  const res = await axios.delete(`/endorsements/${id}`);
  return res.data;
};
