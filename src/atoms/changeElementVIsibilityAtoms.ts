import { atom } from 'jotai';
import { IApplication } from '../services/applicationService';

export type ApplicationVisiblity = {
  display: 'hidden' | 'flex';
  application?: IApplication;
};

export const applicationVisibilityAtom = atom<ApplicationVisiblity>({
  display: 'hidden',
});

export type ButtonVisibility = {
  display: 'hidden' | 'flex';
};

export const editButtonVisibilityAtom = atom<ButtonVisibility>({
  display: 'hidden',
});

export const imageUploadVisibilityAtom = atom<ButtonVisibility>({
  display: 'hidden',
});
