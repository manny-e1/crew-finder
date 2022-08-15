import axios from '../axios';

export interface IUser {
  token: string;
  isActive: boolean;
  role: string;
}

export interface ISignInParams {
  email: string;
  password: string;
}

export const signInUser = async (signInData: ISignInParams): Promise<IUser> => {
  const res = await axios.post('/users/login', signInData);
  return res.data;
};
