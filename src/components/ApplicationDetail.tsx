import { CheckBadgeIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { MoonLoader } from 'react-spinners';
import { applicationVisibilityAtom } from '../atoms/changeElementVIsibilityAtoms';
import {
  getApplicationById,
  IApplication,
  updateApplication,
} from '../services/applicationService';
// import { updateApplication } from '../store/application/api.application';
import { hideDiv } from '../store/ui/hideDiv';
import { Status } from '../util/enums';
import { capitalizeFirstLetter } from '../util/firstLetterCapitalizer';

function ApplicationDetail({ id }: { id: string }) {
  // console.log(application);

  // const [status, setStatus] = useState(application?.applicationStatus);
  const [_, setApplicationVisibility] = useAtom(applicationVisibilityAtom);
  const {
    isLoading,
    error,
    isSuccess,
    data: application,
    refetch,
  } = useQuery<IApplication, AxiosError<{ message: string }, any>>(
    ['application', id],
    () => getApplicationById(id)
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
    },
  });
  const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.updateApplication);
  const clickHandler = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    setApplicationVisibility({ display: 'hidden' });
  };
  const submitHandler = (e: MouseEvent<HTMLButtonElement>, status: Status) => {
    e.preventDefault();
    mutate({ id, applicationStatus: status });
    // dispatch(
    //   updateApplication(
    //     application?._id,
    //     application?.auditionPostId?._id,
    //     updateData
    //   )
    // );
  };

  return (
    <div className="bg-gray-200 w-[80%] md:w-[30%] fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-100 rounded">
      <div className="flex justify-end ">
        <XMarkIcon
          className="w-7 h-7 mt-2 mr-2 hover:text-red-500 cursor-pointer "
          onClick={clickHandler}
        />
      </div>
      {isLoading && (
        <div className="flex w-full h-full justify-center items-center">
          <MoonLoader />{' '}
        </div>
      )}
      {error && (
        <div className="flex w-full h-full justify-center items-center">
          <div className="text-red-500-text-sm">
            {error.response?.data!['message']}
          </div>
        </div>
      )}
      {isSuccess && (
        <div className="px-5 py-5">
          <p className="">Application Letter:</p>
          <p className="font-light text-size-sm  pt-1">
            {application?.applicationLetter}
          </p>
          <div className="flex space-x-2 items-center my-2">
            <p className="">Application Status:</p>
            <p
              className={
                application?.applicationStatus === Status.PENDING
                  ? 'text-yellow-400  font-light'
                  : application?.applicationStatus === Status.APPROVED
                  ? 'text-green-500  font-light'
                  : 'text-red-500  font-light'
              }
            >
              {capitalizeFirstLetter(application?.applicationStatus!)}
            </p>
          </div>
          <h3 className="pb-1">About the Applicant: </h3>
          <div className="pl-3 space-y-1 font-light">
            <div className="flex space-x-2 ">
              <p className="text-sm md:text-size-sm">Name: </p>
              <div className="flex space-x-1">
                <p className="text-sm md:text-size-sm text-blue-400">
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
              <p className="text-sm md:text-size-sm">Email: </p>
              <p className="text-sm md:text-size-sm">
                {application?.applicantId?.email!}
              </p>
            </div>
            <div className="flex space-x-2">
              <p className="text-sm md:text-size-sm">Role: </p>
              <p className="text-sm md:text-size-sm">
                {application?.applicantId?.role}
              </p>
            </div>
            <div className="flex space-x-2">
              <p className="text-sm md:text-size-sm">Talent: </p>
              <p className="text-sm md:text-size-sm">
                {capitalizeFirstLetter(application?.applicantId?.talent!)}
              </p>
            </div>
          </div>
          <div className="mt-3 md:mt-8">
            {application?.applicationStatus === 'PENDING' ? (
              <div className="flex justify-evenly">
                <button
                  className="py-0.5 px-10 rounded-full bg-green-500"
                  type="submit"
                  onClick={(e) => {
                    submitHandler(e, Status.APPROVED);
                  }}
                >
                  Accept
                </button>
                {isUpdating && <p className="text-sm">Updating...</p>}

                <button
                  className="py-0.5 px-10 rounded-full bg-red-500"
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
                  className="py-0.5 px-10 rounded-full bg-yellow-400"
                  type="submit"
                  onClick={(e) => {
                    submitHandler(e, Status.PENDING);
                  }}
                >
                  Pend
                </button>
                {isUpdating && <p className="text-sm">Updating...</p>}

                <button
                  className="py-0.5 px-10 rounded-full bg-red-500"
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
                  className="py-0.5 px-10 rounded-full bg-green-500"
                  type="submit"
                  onClick={(e) => {
                    submitHandler(e, Status.APPROVED);
                  }}
                >
                  Accept
                </button>
                {isUpdating && <p className="text-sm">Updating...</p>}
                <button
                  className="py-0.5 px-10 rounded-full bg-yellow-400"
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
              <p className="text-red-500 text-sm">
                {updateError.response?.data!['message']}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationDetail;
