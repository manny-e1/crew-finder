import axios from '../axios';
import { Talent } from '../enums';

export interface IAuthResponse {
  token: string;
  isActive: boolean;
  talent: Talent;
  role: string;
}

export interface ISignInParams {
  email: string;
  password: string;
}

export const signInUser = async (
  signInData: ISignInParams
): Promise<IAuthResponse> => {
  const res = await axios.post('/users/login', signInData);
  return res.data;
};
