import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/PostCard';
import {
  getAuditionPosts,
  IAuditionPost,
} from '../services/auditionPostService';

let oldSearch = '';

function AuditionPostSearchPage() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search') ?? '';

  const {
    isLoading,
    data: auditionPosts,
    error,
    refetch,
  } = useQuery<IAuditionPost[], AxiosError<{ message: string }>>(
    ['searchAudition'],
    () => getAuditionPosts(`?search=${search}`)
  );
  useEffect(() => {
    if (oldSearch !== search) {
      console.log(oldSearch !== search);
      refetch();
      oldSearch = search;
    }
  }, [search]);

  if (isLoading) return <p className="flex justify-center">Loading...</p>;
  if (error)
    return (
      <p className="flex justify-center">{error.response?.data['message']}</p>
    );

  return (
    <div className="mx-auto mt-5 max-w-5xl bg-white ">
      {auditionPosts?.map((auditionPost) => (
        <PostCard
          key={auditionPost._id}
          auditionPost={auditionPost}
          fromSearch={true}
        />
      ))}
    </div>
  );
}

export default AuditionPostSearchPage;
