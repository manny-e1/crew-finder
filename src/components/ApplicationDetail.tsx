import { CheckBadgeIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { MouseEvent } from 'react';
import { MoonLoader } from 'react-spinners';
import { applicationVisibilityAtom } from '../atoms/changeElementVIsibilityAtoms';
import {
  getApplicationById,
  IApplication,
  updateApplication,
} from '../services/applicationService';
import { Status } from '../enums/enums';
import { capitalizeFirstLetter } from '../util/firstLetterCapitalizer';

function ApplicationDetail({
  applicationId,
  auditionPostId,
}: {
  applicationId: string;
  auditionPostId: string;
}) {
  // const [status, setStatus] = useState(application?.applicationStatus);
  const [_, setApplicationVisibility] = useAtom(applicationVisibilityAtom);
  const queryClient = new QueryClient();
  const {
    isLoading,
    error,
    isSuccess,
    data: application,
    refetch,
  } = useQuery<IApplication, AxiosError<{ message: string }, any>>(
    ['application', applicationId],
    () => getApplicationById(applicationId)
  );
  const {
    isLoading: isUpdating,
    error: updateError,
    mutate,
  } = useMutation<
    { applicationId: string; applicationStatus: Status },
    AxiosError<{ message: string }, any>,
    any
  >(updateApplication, {
    onSuccess: (_) => {
      refetch();
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'applications' &&
          query.queryKey[1] === auditionPostId,
      });
    },
  });
  // const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.updateApplication);
  const clickHandler = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    setApplicationVisibility({ display: 'hidden' });
  };
  const submitHandler = (e: MouseEvent<HTMLButtonElement>, status: Status) => {
    e.preventDefault();
    mutate({ id: applicationId, applicationStatus: status });
  };

  return (
    <>
      <div className="z-100 fixed inset-0   bg-black opacity-70"></div>
      <div className="z-100 fixed top-[50%] left-[50%] w-[80%] -translate-x-[50%] -translate-y-[50%] transform  rounded bg-gray-200 md:w-[30%]">
        <div className="flex justify-end ">
          <XMarkIcon
            className="mt-2 mr-2 h-7 w-7 cursor-pointer hover:text-red-500 "
            onClick={clickHandler}
          />
        </div>
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <MoonLoader />{' '}
          </div>
        )}
        {error && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-red-500-text-sm">
              {error.response?.data!['message']}
            </div>
          </div>
        )}
        {isSuccess && (
          <div className="px-5 py-5">
            <p className="">Application Letter:</p>
            <p className="text-size-sm pt-1  font-light">
              {application?.applicationLetter}
            </p>
            <div className="my-2 flex items-center space-x-2">
              <p className="">Application Status:</p>
              <p
                className={
                  application?.applicationStatus === Status.PENDING
                    ? 'font-light  text-yellow-400'
                    : application?.applicationStatus === Status.APPROVED
                    ? 'font-light  text-green-500'
                    : 'font-light  text-red-500'
                }
              >
                {capitalizeFirstLetter(application?.applicationStatus!)}
              </p>
            </div>
            <h3 className="pb-1">About the Applicant: </h3>
            <div className="space-y-1 pl-3 font-light">
              <div className="flex space-x-2 ">
                <p className="md:text-size-sm text-sm">Name: </p>
                <div className="flex space-x-1">
                  <p className="md:text-size-sm text-sm text-blue-400">
                    {application?.applicantId?.fullName}
                  </p>
                  <CheckBadgeIcon
                    className={
                      application?.applicantId?.verification === 'FAMOUS'
                        ? 'h-4 text-blue-500'
                        : application?.applicantId?.verification === 'ENDORSED'
                        ? 'h-4 text-black'
                        : 'hidden'
                    }
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <p className="md:text-size-sm text-sm">Email: </p>
                <p className="md:text-size-sm text-sm">
                  {application?.applicantId?.email!}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="md:text-size-sm text-sm">Role: </p>
                <p className="md:text-size-sm text-sm">
                  {application?.applicantId?.role}
                </p>
              </div>
              <div className="flex space-x-2">
                <p className="md:text-size-sm text-sm">Talent: </p>
                <p className="md:text-size-sm text-sm">
                  {capitalizeFirstLetter(application?.applicantId?.talent!)}
                </p>
              </div>
            </div>
            <div className="mt-3 md:mt-8">
              {application?.applicationStatus === 'PENDING' ? (
                <div className="flex justify-evenly">
                  <button
                    className="rounded-full bg-green-500 py-0.5 px-10"
                    type="submit"
                    onClick={(e) => {
                      submitHandler(e, Status.APPROVED);
                    }}
                  >
                    Accept
                  </button>
                  {isUpdating && <p className="text-sm">Updating...</p>}

                  <button
                    className="rounded-full bg-red-500 py-0.5 px-10"
                    type="submit"
                    onClick={(e) => {
                      submitHandler(e, Status.REJECTED);
                    }}
                  >
                    Reject
                  </button>
                </div>
              ) : application?.applicationStatus === 'APPROVED' ? (
                <div className="flex justify-evenly">
                  <button
                    className="rounded-full bg-yellow-400 py-0.5 px-10"
                    type="submit"
                    onClick={(e) => {
                      submitHandler(e, Status.PENDING);
                    }}
                  >
                    Pend
                  </button>
                  {isUpdating && <p className="text-sm">Updating...</p>}

                  <button
                    className="rounded-full bg-red-500 py-0.5 px-10"
                    type="submit"
                    onClick={(e) => {
                      submitHandler(e, Status.REJECTED);
                    }}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <div className="flex justify-evenly">
                  <button
                    className="rounded-full bg-green-500 py-0.5 px-10"
                    type="submit"
                    onClick={(e) => {
                      submitHandler(e, Status.APPROVED);
                    }}
                  >
                    Accept
                  </button>
                  {isUpdating && <p className="text-sm">Updating...</p>}
                  <button
                    className="rounded-full bg-yellow-400 py-0.5 px-10"
                    type="submit"
                    onClick={(e) => {
                      submitHandler(e, Status.PENDING);
                    }}
                  >
                    Pend
                  </button>
                </div>
              )}
              {updateError && (
                <p className="text-sm text-red-500">
                  {updateError.response?.data!['message']}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ApplicationDetail;
