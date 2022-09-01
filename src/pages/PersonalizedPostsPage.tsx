import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { queryAtom } from '../atoms/queryAtom';
import PostCard from '../components/PostCard';
import {
  getAuditionPosts,
  getPersonalizedAuditionPosts,
  IAuditionPost,
} from '../services/auditionPostService';

function Personalized() {
  const { isLoading, error, data } = useQuery<IAuditionPost[], Error>(
    ['personalizedAuditionPosts'],
    getPersonalizedAuditionPosts,
    { refetchOnWindowFocus: false }
  );
  return (
    <div className="py-2 px-3">
      {data?.map((auditionPost) => (
        <PostCard key={auditionPost._id} auditionPost={auditionPost} />
      ))}
    </div>
  );
}

export default Personalized;
