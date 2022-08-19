import { QueryClient, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { applicationVisibilityAtom } from '../atoms/changeElementVIsibilityAtoms';
import { currentUserAtom } from '../atoms/localStorageAtoms';
import ApplicationDetail from '../components/ApplicationDetail';
import AuditionPost from '../components/AuditionPost';
import {
  getApplicationsForAuditionPosts,
  IApplication,
} from '../services/applicationService';
import {
  getAuditionPostById,
  IAuditionPost,
} from '../services/auditionPostService';
import { listApplications } from '../store/application/api.application';
import { auditionPostDetail } from '../store/auditionPost/api.auditionpost';
import { hideDiv } from '../store/ui/hideDiv';
import { logout } from '../store/user/api.user';

const auditionPostDetailQuery = (id: string) => ({
  queryKey: ['auditionPost', 'detail', id],

  queryFn: async () => getAuditionPostById(id),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const query = auditionPostDetailQuery(params.id);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery<IAuditionPost, Error>(query))
    );
  };

function AuditionPostDetailPage() {
  const { id } = useParams();
  const [currentUser] = useAtom(currentUserAtom);
  const [{ display, application }, setApplicationVisibility] = useAtom(
    applicationVisibilityAtom
  );

  const { error, data: auditionPost } = useQuery<IAuditionPost, Error>(
    auditionPostDetailQuery(id!)
  );
  const {
    error: applicationError,
    data: applications,
    isLoading,
  } = useQuery<IApplication[], Error>(['applications', id], () =>
    getApplicationsForAuditionPosts(id!)
  );

  // const applicationList: IApplication[] = [];
  // const ap = { applications: applicationList, loading: false, error: false };
  // const { hidden, application } = useSelector((state) => state.hideDiv);
  // const hidden = true;

  // const { loading, error, auditionPost } = detailAuditionPost;
  // useEffect(() => {
  // dispatch(auditionPostDetail(id));
  // dispatch(listApplications(id));
  // dispatch(hideDiv());
  // }, [dispatch, id]);
  console.log(currentUser?.id === auditionPost?.author?.id);

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
        currentUser?.id === auditionPost?.author?.id ? 'max-w-5xl' : 'max-w-7xl'
      } mx-auto mt-10`}
    >
      <div
        className={
          'bg-transparent items-center justify-center ' +
          display +
          ' absolute inset-x-0 inset-y-0 '
        }
      >
        <ApplicationDetail application={application} />
      </div>

      <div>
        <AuditionPost
          key={auditionPost?.id}
          auditionPost={auditionPost}
          currentUser={currentUser}
          applicationList={{
            applications,
            loading: isLoading,
            error: applicationError,
          }}
        />
      </div>
    </div>
  );
}

export default AuditionPostDetailPage;
