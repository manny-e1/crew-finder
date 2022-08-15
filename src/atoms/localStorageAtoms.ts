import { atom } from 'jotai';

type CurrentUser = {
  token: string;
  role: string;
};

const currentUser = localStorage.getItem('currentUser');

export const currentUserAtom = atom<CurrentUser | null>(
  currentUser ? JSON.parse(currentUser) : null
);
