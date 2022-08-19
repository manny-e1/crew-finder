// import { BadgeCheckIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateApplication } from '../store/application/api.application';
import { hideDiv } from '../store/ui/hideDiv';
import { capitalizeFirstLetter } from '../util/firstLetterCapitalizer';

function ApplicationDetail({ application }) {
  // console.log(application);

  // const [status, setStatus] = useState(application?.applicationStatus);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.updateApplication);
  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(hideDiv());
  };
  const submitHandler = (e, status) => {
    const updateData = { applicationStatus: status };
    e.preventDefault();
    dispatch(
      updateApplication(
        application?._id,
        application?.auditionPostId?._id,
        updateData
      )
    );
    dispatch(hideDiv());
  };

  return (
    <div className="bg-gray-100 absolute inset-x-6 md:inset-x-10 lg:inset-x-1/3 rounded-2xl">
      <div className="flex justify-end px-3 py-2 sm:px-5 sm:py-5">
        <p
          className="cursor-pointer text-2xl md:text-4xl"
          onClick={(e) => clickHandler(e)}
        >
          X
        </p>
      </div>
      <div className="px-5 py-3 md:px-10 sm:px-5 md:py-20">
        <p className="text-size-sm">Application Letter:</p>
        <p className="text-sm font-light pt-1">
          {application?.applicationLetter}
        </p>
        <div className="flex space-x-2 items-center my-2">
          <p className="text-size-sm">Application Status:</p>
          <p
            className={
              application?.applicationStatus === 'PENDING'
                ? 'text-yellow-400 text-size-sm font-light'
                : application?.applicationStatus === 'APPROVED'
                ? 'text-green-500 text-size-sm font-light'
                : 'text-red-500 text-size-sm font-light'
            }
          >
            {capitalizeFirstLetter(application?.applicationStatus)}
          </p>
        </div>
        <h3 className="text-size-sm pb-1">About the Applicant: </h3>
        <div className="pl-3 space-y-1 font-light">
          <div className="flex space-x-2 ">
            <p className="text-sm md:text-size-sm">Name: </p>
            <div className="flex space-x-1">
              <p className="text-sm md:text-size-sm text-blue-400">
                {application?.applicantId?.fullName}
              </p>
              {/* <BadgeCheckIcon
                className={
                  application?.applicantId?.verification === 'FAMOUS'
                    ? 'h-4 text-blue-500'
                    : application?.applicantId?.verification === 'ENDORSED'
                    ? 'h-4 text-black'
                    : 'hidden'
                }
              /> */}
            </div>
          </div>
          <div className="flex space-x-2">
            <p className="text-sm md:text-size-sm">Email: </p>
            <p className="text-sm md:text-size-sm">
              {application?.applicantId?.email}
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
              {capitalizeFirstLetter(application?.applicantId?.talent)}
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
                  submitHandler(e, 'APPROVED');
                }}
              >
                Accept
              </button>
              <button
                className="py-0.5 px-10 rounded-full bg-red-500"
                type="submit"
                onClick={(e) => {
                  submitHandler(e, 'REJECTED');
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
                  submitHandler(e, 'PENDING');
                }}
              >
                Pend
              </button>
              <button
                className="py-0.5 px-10 rounded-full bg-red-500"
                type="submit"
                onClick={(e) => {
                  submitHandler(e, 'REJECTED');
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
                  submitHandler(e, 'APPROVED');
                }}
              >
                Accept
              </button>
              <button
                className="py-0.5 px-10 rounded-full bg-yellow-400"
                type="submit"
                onClick={(e) => {
                  submitHandler(e, 'PENDING');
                }}
              >
                Pend
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;
