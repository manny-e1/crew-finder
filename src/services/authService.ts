import { CurrentUser } from '../atoms/localStorageAtoms';
import axios from '../axios';
import { Gender, Role, Talent } from '../enums/enums';

export interface ISignInParams {
  email: string;
  password: string;
}
export interface ISignUpParams {
  fullName: string;
  username: string;
  email: string;
  password: string;
  birthdate: string;
  address: {
    country: string;
    region: string;
  };
  phoneNumber: string;
  role: Role;
  talent: Talent;
  gender: Gender;
}

export const signInUser = async (
  signInData: ISignInParams
): Promise<CurrentUser> => {
  const res = await axios.post('/users/login', signInData);
  return res.data;
};

export const signUpUser = async (signUpData: ISignUpParams): Promise<any> => {
  const res = await axios.post('/users', signUpData);
  return res.data;
};
