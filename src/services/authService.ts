import { CurrentUser } from '../atoms/localStorageAtoms';
import axios from '../axios';

export interface ISignInParams {
  email: string;
  password: string;
}

export const signInUser = async (
  signInData: ISignInParams
): Promise<CurrentUser> => {
  const res = await axios.post('/users/login', signInData);
  return res.data;
};
