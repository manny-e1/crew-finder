import axios from '../axios';
import { IAuditionPost } from './auditionPostService';

export interface IFavorite {
  auditionPost: IAuditionPost;
}

export const favoriteAuditionPost = async (
  auditionPostId: string
): Promise<any> => {
  const res = await axios.post('/favorites', { auditionPostId });
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

export const removeFavorite = async (
  favoriteId: string
): Promise<IFavorite> => {
  const res = await axios.delete(`/favorites/${favoriteId}`);
  return res.data;
};
