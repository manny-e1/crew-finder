import { QueryClient, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { applicationVisibilityAtom } from '../atoms/changeElementVIsibilityAtoms';
import { currentUserAtom } from '../atoms/localStorageAtoms';
import ApplicationDetail from '../components/ApplicationDetail';
import ApplicationList from '../components/ApplicationList';
import AuditionPost from '../components/AuditionPost';
import {
  getAuditionPostById,
  IAuditionPost,
} from '../services/auditionPostService';

const auditionPostDetailQuery = (id: string) => ({
  queryKey: ['auditionPost', 'detail', id],

  queryFn: async () => getAuditionPostById(id),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const query = auditionPostDetailQuery(params._id);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery<IAuditionPost, Error>(query))
    );
  };

function AuditionPostDetailPage() {
  const { id } = useParams();
  const [currentUser] = useAtom(currentUserAtom);
  const [{ display, application }] = useAtom(applicationVisibilityAtom);

  const { error, data: auditionPost } = useQuery<IAuditionPost, Error>(
    auditionPostDetailQuery(id!)
  );

  if (error && error.message === 'Not Authenticated') {
    localStorage && localStorage.removeItem('currentUser');
  }
  if (error && error.message !== 'Not Authenticated') {
    <p>{error.message}</p>;
  }

  if (!auditionPost) return <p>null</p>;

  return (
    <div
      className={`${
        currentUser?.id === auditionPost?.author?._id
          ? 'max-w-5xl'
          : 'max-w-7xl'
      } mx-auto mt-10`}
    >
      {display === 'flex' && (
        <div
          className={
            'items-center justify-center bg-transparent ' +
            display +
            ' absolute inset-x-0 inset-y-0 '
          }
        >
          <ApplicationDetail
            applicationId={application?._id!}
            auditionPostId={auditionPost._id}
          />
        </div>
      )}

      <div>
        <AuditionPost
          key={auditionPost?._id}
          auditionPost={auditionPost}
          currentUser={currentUser}
        />
      </div>
      {currentUser?.id === auditionPost.author._id && (
        <ApplicationList auditionPostId={auditionPost._id} />
      )}
    </div>
  );
}

export default AuditionPostDetailPage;
