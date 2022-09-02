import { QueryClient, useQuery } from '@tanstack/react-query';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import PostCard from '../components/PostCard';
import {
  getPersonalizedAuditionPosts,
  IAuditionPost,
} from '../services/auditionPostService';

const personalizedAuditionPostQuery = () => ({
  queryKey: ['auditionPost'],

  queryFn: getPersonalizedAuditionPosts,
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = personalizedAuditionPostQuery();

    return (
      queryClient.getQueryData<IAuditionPost[]>(query.queryKey) ??
      (await queryClient.fetchQuery<IAuditionPost[], Error>(query))
    );
  };

function PersonalizedPostsPage() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { data } = useQuery<IAuditionPost[], Error>({
    ...personalizedAuditionPostQuery(),
    initialData,
  });
  return (
    <div className="py-2 px-3">
      {data?.map((auditionPost) => (
        <PostCard key={auditionPost._id} auditionPost={auditionPost} />
      ))}
    </div>
  );
}

export default PersonalizedPostsPage;
