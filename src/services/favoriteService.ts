import axios from '../axios';
import { IAuditionPost } from './auditionPostService';

export interface IFavorite {
  auditionPost: IAuditionPost;
}

export type CheckFavorite = { message: 'Found' | 'Not Found' };
export type FavoriteParams = {
  favorited: boolean;
  auditionPostId: string;
};

export const favoriteAuditionPost = async ({
  auditionPostId,
  favorited,
}: FavoriteParams): Promise<any> => {
  const res = favorited
    ? await axios.delete(`/favorites/${auditionPostId}`)
    : await axios.post('/favorites', { auditionPostId });
  return res.data;
};

export const getFavorites = async (): Promise<IFavorite[]> => {
  const res = await axios.get('/favorites');
  return res.data;
};

export const getFavoriteById = async (
  favoriteId: string
): Promise<IFavorite> => {
  const res = await axios.get(`/favorites/${favoriteId}`);
  return res.data;
};

export const checkFavorite = async (
  auditionPostId: string
): Promise<CheckFavorite> => {
  console.log('check', auditionPostId);

  const res = await axios.get(`/favorites/check/${auditionPostId}`);
  return res.data;
};
