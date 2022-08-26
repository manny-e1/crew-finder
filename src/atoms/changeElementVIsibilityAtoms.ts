import { atom } from 'jotai';
import { IApplication } from '../services/applicationService';

type Visibility = 'flex' | 'hidden' | 'block';

export type ApplicationVisiblity = {
  display: Visibility;
  application?: IApplication;
};

export const applicationVisibilityAtom = atom<ApplicationVisiblity>({
  display: 'hidden',
});

export type ButtonVisibility = {
  display: Visibility;
};

export const editButtonVisibilityAtom = atom<ButtonVisibility>({
  display: 'hidden',
});

export const imageUploadVisibilityAtom = atom<ButtonVisibility>({
  display: 'hidden',
});

export const searchDropDownVisibilityAtom = atom<Visibility>('hidden');
