import axios from 'axios';
import { useAtom } from 'jotai';
import { CurrentUser, currentUserAtom } from './atoms/localStorageAtoms';
const instance = axios.create({ baseURL: 'http://localhost:5000' });
instance.interceptors.request.use(function (config) {
  const currentUser: CurrentUser | null =
    localStorage.getItem('currentUser') !== null
      ? JSON.parse(localStorage.getItem('currentUser')!)
      : null;

  const token = currentUser?.token;
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}` ?? '';
  }

  return config;
});
export default instance;
