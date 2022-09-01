import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { queryAtom } from '../atoms/queryAtom';
import PostCard from '../components/PostCard';
import {
  getAuditionPosts,
  IAuditionPost,
} from '../services/auditionPostService';

function RecentPostsPage() {
  const [query] = useAtom(queryAtom);
  console.log(query);

  const { isLoading, error, data } = useQuery<IAuditionPost[], Error>(
    ['auditionPosts', query],
    () => getAuditionPosts(query),
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

export default RecentPostsPage;
