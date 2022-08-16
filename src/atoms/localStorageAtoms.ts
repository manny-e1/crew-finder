import { atom } from 'jotai';

export type CurrentUser = {
  token: string;
  role: string;
};

const userData = localStorage.getItem('currentUser');

const currentUser: CurrentUser | null = userData ? JSON.parse(userData) : null;

export const currentUserAtom = atom<CurrentUser | null>(currentUser);
