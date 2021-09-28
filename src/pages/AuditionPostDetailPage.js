import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ApplicationDetail from '../components/ApplicationDetail';
import AuditionPost from '../components/AuditionPost';
import { listApplications } from '../store/application/api.application';
import { auditionPostDetail } from '../store/auditionPost/api.auditionpost';
import { hideDiv } from '../store/ui/hideDiv';
import { logout } from '../store/user/api.user';

function AuditionPostDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const detailAuditionPost = useSelector((state) => state.auditionPostDetail);
  const { currentUser } = useSelector((state) => state.userLogin);
  const applicationList = useSelector((state) => state.applicationList);
  const { hidden, application } = useSelector((state) => state.hideDiv);

  const { loading, error, auditionPost } = detailAuditionPost;
  useEffect(() => {
    dispatch(auditionPostDetail(id));
    dispatch(listApplications(id));
    dispatch(hideDiv());
  }, [dispatch, id]);

  let width = 'max-w-7xl';

  if (currentUser?._id === auditionPost?.author?._id) {
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
      {loading ? (
        <h1>Loading...</h1>
      ) : error && error === 'Not Authenticated' ? (
        dispatch(logout())
      ) : error && error !== 'Not Authenticated' ? (
        <div>{error}</div>
      ) : (
        <div>
          <AuditionPost
            key={auditionPost._id}
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
