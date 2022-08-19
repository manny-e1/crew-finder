import { atom } from 'jotai';
import { IApplication } from '../services/applicationService';

export type ApplicationVisiblity = {
  display: 'hidden' | 'flex';
  application?: IApplication;
};

export const applicationVisibilityAtom = atom<ApplicationVisiblity>({
  display: 'hidden',
});
