import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { currentUserAtom } from '../atoms/localStorageAtoms';
import ApplicationDetail from '../components/ApplicationDetail';
import AuditionPost from '../components/AuditionPost';
import {
  getAuditionPostById,
  IAuditionPost,
} from '../services/auditionPostService';
import { listApplications } from '../store/application/api.application';
import { auditionPostDetail } from '../store/auditionPost/api.auditionpost';
import { hideDiv } from '../store/ui/hideDiv';
import { logout } from '../store/user/api.user';

function AuditionPostDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentUser] = useAtom(currentUserAtom);
  const {
    isLoading,
    error,
    data: auditionPost,
  } = useQuery<IAuditionPost, Error>([`auditionPost${id}`, id ?? ''], () =>
    getAuditionPostById(id ?? '')
  );

  const applicationList = [];
  const { hidden, application } = useSelector((state) => state.hideDiv);

  // const { loading, error, auditionPost } = detailAuditionPost;
  useEffect(() => {
    dispatch(auditionPostDetail(id));
    dispatch(listApplications(id));
    dispatch(hideDiv());
  }, [dispatch, id]);

  let width = 'max-w-7xl';

  if (currentUser?.id === auditionPost?.author?.id) {
    width = 'max-w-5xl';
  }
  return (
    <div className={width + ' h-screen mx-auto mt-10'}>
      <div
        className={
          'bg-transparent items-center justify-center ' +
          hidden +
          ' absolute inset-x-0 inset-y-0 '
        }
      >
        <ApplicationDetail application={application} />
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error && error.message === 'Not Authenticated' ? (
        localStorage && localStorage.removeItem('currentUser')
      ) : error && error.message !== 'Not Authenticated' ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <AuditionPost
            key={auditionPost?.id}
            auditionPost={auditionPost}
            currentUser={currentUser}
            applicationList={applicationList}
          />
        </div>
      )}
    </div>
  );
}

export default AuditionPostDetailPage;
