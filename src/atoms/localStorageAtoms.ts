import { atom } from 'jotai';
import { Talent } from '../enums/enums';

export type CurrentUser = {
  id: string;
  token: string;
  talent: Talent;
  role: string;
};

export type TitleAndDescription = {
  title: string;
  text: string;
};

const userData = localStorage.getItem('currentUser');

const currentUser: CurrentUser | null = userData ? JSON.parse(userData) : null;

export const currentUserAtom = atom<CurrentUser | null>(currentUser);

export const titleAndDescriptionAtom = atom<TitleAndDescription | null>(null);
export const talentsAtom = atom<Talent[] | null>(null);
