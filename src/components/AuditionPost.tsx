import { HeartIcon } from '@heroicons/react/24/solid';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MouseEvent, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUser } from '../atoms/localStorageAtoms';
import { Status } from '../enums/enums';
import {
  getApplicationsForAuditionPosts,
  IApplication,
} from '../services/applicationService';
import { IAuditionPost } from '../services/auditionPostService';
import {
  checkFavorite,
  CheckFavorite,
  favoriteAuditionPost,
  FavoriteParams,
} from '../services/favoriteService';
import { capitalizeFirstLetter } from '../util/firstLetterCapitalizer';
import CategoryButton from './CategoryButton';

function AuditionPost({
  auditionPost,
  currentUser,
}: {
  auditionPost: IAuditionPost;
  currentUser: CurrentUser | null;
}) {
  const navigate = useNavigate();

  const { data: applications } = useQuery<IApplication[], Error>(
    ['applications', auditionPost._id],
    () => getApplicationsForAuditionPosts(auditionPost._id),
    {
      enabled: auditionPost._id !== undefined,
    }
  );

  const { data: checkResponse, refetch } = useQuery<CheckFavorite, Error>(
    ['favorites', auditionPost._id],
    () => checkFavorite(auditionPost._id),
    {
      enabled: auditionPost._id !== undefined,
    }
  );

  const { isLoading, mutate, error } = useMutation<
    any,
    AxiosError<{ message: string }>,
    FavoriteParams
  >(favoriteAuditionPost, {
    onSuccess: (_) => {
      refetch();
    },
  });

  const acceptedApplicationsCount = useMemo(
    () =>
      applications?.filter(
        (application) => application.applicationStatus === Status.APPROVED
      ).length,
    [applications]
  );
  const rejectedApplicationsCount = useMemo(
    () =>
      applications?.filter(
        (application) => application.applicationStatus === Status.REJECTED
      ).length,
    [applications]
  );

  console.log(auditionPost);

  const favoriteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const favorited = checkResponse?.message === 'Found';
    mutate({ auditionPostId: auditionPost._id, favorited });
  };

  return (
    <div
      className={`${
        currentUser?.id === auditionPost?.author?._id
          ? 'lg:inline-block lg:w-full'
          : 'lg:flex'
      }`}
    >
      <div className="rounded-l-xl border bg-white py-5 lg:w-full">
        <h2 className="border-b p-5 text-xl">{auditionPost.title}</h2>
        <div className="border-b p-5">
          <div className="flex flex-wrap">
            {auditionPost?.talents?.map((talent) => (
              <CategoryButton key={talent} text={talent} />
            ))}
          </div>
          <p className="text-md font-light">
            {auditionPost.createdAt.toString()}
          </p>
        </div>
        <p className="border-b p-5 text-sm font-light sm:text-base">
          {auditionPost.text}
        </p>
        <div className="space-y-2 border-b p-5 text-sm">
          <h2 className="mb-2 text-sm font-medium sm:text-base">
            Preferred Qualifications
          </h2>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">Gender:</p>
            <div className="flex space-x-2">
              <p className="text-sm sm:text-base">
                {' '}
                {capitalizeFirstLetter(auditionPost?.gender?.join(',  '))}
              </p>
            </div>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">Region:</p>
            <p className="text-sm sm:text-base">{auditionPost?.region}</p>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">Endorsment count:</p>
            <p className="text-sm sm:text-base">
              {auditionPost?.endorsementCount}
            </p>
          </div>

          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">Language:</p>
            <div className="x-space-2 flex">
              <p className="text-sm sm:text-base">
                {capitalizeFirstLetter(auditionPost?.languages?.join(',  '))}
              </p>
            </div>
          </div>

          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">Age:</p>
            <p className="text-sm sm:text-base">
              {auditionPost?.ageRange?.min + '-' + auditionPost?.ageRange?.max}
            </p>
          </div>
        </div>
        <div className="space-y-2 border-b p-5 text-sm lg:border-b-0">
          <h2 className="mb-2 text-sm font-medium sm:text-base">
            Activity on this audition
          </h2>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">
              Application Count:
            </p>
            <p className="text-sm sm:text-base">
              {auditionPost.applicationCount}
            </p>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">Interviewing:</p>
            <p className="text-sm sm:text-base">{acceptedApplicationsCount}</p>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">
              Rejected Applications:
            </p>
            <p className="text-sm sm:text-base">{rejectedApplicationsCount}</p>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">
              Accepting Applications:
            </p>
            <p className="text-sm sm:text-base">
              {auditionPost.isAcceptingApplication ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
        <div className="space-y-2 p-5 text-sm  lg:hidden">
          <h2 className="mb-2 text-sm font-medium sm:text-base">
            About the author
          </h2>
          <div className="flex cursor-pointer justify-between sm:justify-start sm:space-x-2 ">
            <p className="text-sm font-light sm:text-base">Name:</p>
            <Link
              to={`/profile/${auditionPost?.author?._id}`}
              className="text-sm text-blue-500 sm:text-base"
            >
              {auditionPost.author?.fullName}
            </Link>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">posts' count:</p>
            <p className="text-sm sm:text-base">2</p>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">Country:</p>
            <p className="text-sm sm:text-base">
              {auditionPost.author?.address?.country}
            </p>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-light sm:text-base">Region:</p>
            <p className="text-sm sm:text-base">
              {auditionPost.author?.address?.region}
            </p>
          </div>
        </div>
      </div>
      {currentUser?.id !== auditionPost?.author?._id && (
        <div className="rounded-r-xl  border bg-white py-5 px-5">
          <div className="flex w-full justify-around border-b py-3 lg:inline-block lg:space-y-5 lg:pt-5  lg:pb-8">
            <Link to={`/auditions/${auditionPost._id}/apply`}>
              <button className="  w-64 rounded-full bg-black py-2 text-center text-lg text-white lg:w-full">
                Submit an application
              </button>
            </Link>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black sm:w-64 md:w-80 md:space-x-2 lg:w-full lg:py-3"
              onClick={favoriteHandler}
            >
              {isLoading ? (
                <p>Loading... </p>
              ) : (
                <>
                  <HeartIcon
                    className={`h-6 ${
                      checkResponse?.message === 'Found'
                        ? 'text-red-500'
                        : 'text-black'
                    }`}
                  />
                  <span className="hidden md:flex">
                    {checkResponse?.message === 'Found' ? 'Unsave' : 'Save'}
                  </span>
                </>
              )}
            </button>
            {error && (
              <p className="text-sm text-red-500">
                {error.response?.data['message']}
              </p>
            )}
          </div>

          <div className="hidden w-full space-y-2 border-b p-5 text-sm lg:inline-block">
            <h2 className="mb-2 text-sm font-medium sm:text-base">
              About the author
            </h2>
            <div
              className="flex cursor-pointer justify-between sm:justify-start sm:space-x-2"
              onClick={() => navigate(`/profile/${auditionPost?.author?._id}`)}
            >
              <p className="text-sm font-light sm:text-base">Name:</p>
              <p className="text-sm sm:text-base">
                {auditionPost.author?.fullName}
              </p>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="text-sm font-light sm:text-base">posts' count:</p>
              <p className="text-sm sm:text-base">2</p>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="text-sm font-light sm:text-base">Country:</p>
              <p className="text-sm sm:text-base">
                {auditionPost.author?.address?.country}
              </p>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="text-sm font-light sm:text-base">Region:</p>
              <p className="text-sm sm:text-base">
                {auditionPost.author?.address?.region}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuditionPost;
