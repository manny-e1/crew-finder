import { atom } from 'jotai';
import { Talent } from '../enums';

export type CurrentUser = {
  token: string;
  talent: Talent;
  role: string;
};

const userData = localStorage.getItem('currentUser');

const currentUser: CurrentUser | null = userData ? JSON.parse(userData) : null;

export const currentUserAtom = atom<CurrentUser | null>(currentUser);
