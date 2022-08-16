import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { listAuditionPosts } from '../store/auditionPost/api.auditionpost';

function AuditionPostSearchPage({ location }) {
  const search = new URLSearchParams(location.search).get('search') ?? '';

  const dispatch = useDispatch();
  const { loading, auditionPosts, error } = useSelector(
    (state) => state.auditionPostList
  );
  useEffect(() => {
    dispatch(listAuditionPosts(`?search=${search}`));
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white mt-5 ">
      {auditionPosts?.map((auditionPost) => (
        <PostCard auditionPost={auditionPost} fromSearch={true} />
      ))}
    </div>
  );
}

export default AuditionPostSearchPage;
