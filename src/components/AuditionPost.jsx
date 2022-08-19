import // HeartIcon,
// SearchIcon,
'@heroicons/react/outline';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../util/firstLetterCapitalizer';
import ApplicationList from './ApplicationList';
import CategoryButton from './CategoryButton';

function AuditionPost({
  auditionPost,
  currentUser,
  applicationList: { applications, loading, error },
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const searchApplication = applications?.filter(
    (application) =>
      application?.applicantId?.fullName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      application?.auditionPostId?.author?.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div
      className={`${
        currentUser?.id === auditionPost?.author?.id
          ? 'lg:inline-block lg:w-full'
          : 'lg:flex'
      }`}
    >
      <div className="bg-white border py-5 lg:w-full rounded-l-xl">
        <h2 className="text-xl border-b p-5">{auditionPost.title}</h2>
        <div className="border-b p-5">
          <div className="flex flex-wrap">
            {auditionPost?.talents?.map((talent) => (
              <CategoryButton key={talent} text={talent} />
            ))}
          </div>
          <p className="font-light text-md">Posted 13 days ago</p>
        </div>
        <p className="text-sm sm:text-base font-light p-5 border-b">
          {auditionPost.text}
        </p>
        <div className="flex md:flex-row flex-col justify-between">
          <div className="p-5 text-sm space-y-2 border-b">
            <h2 className="text-sm sm:text-base mb-2 font-medium">
              Preffered Qualifications
            </h2>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">Gender:</p>
              <div className="flex x-space-2">
                <p className="text-sm sm:text-base">
                  {' '}
                  {capitalizeFirstLetter(auditionPost?.gender?.join(',  '))}
                </p>
              </div>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">Region:</p>
              <p className="text-sm sm:text-base">{auditionPost?.region}</p>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">
                Endorsment count:
              </p>
              <p className="text-sm sm:text-base">
                {auditionPost?.endorsementCount}
              </p>
            </div>

            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">Language:</p>
              <div className="flex x-space-2">
                <p className="text-sm sm:text-base">
                  {capitalizeFirstLetter(auditionPost?.languages?.join(',  '))}
                </p>
              </div>
            </div>

            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">Age:</p>
              <p className="text-sm sm:text-base">
                {auditionPost?.ageRange?.min +
                  '-' +
                  auditionPost?.ageRange?.max}
              </p>
            </div>
          </div>
          <div className="p-5 text-sm space-y-2 border-b lg:border-b-0">
            <h2 className="text-sm sm:text-base mb-2 font-medium">
              Activity on this audition
            </h2>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">
                Application Count:
              </p>
              <p className="text-sm sm:text-base">
                {auditionPost.applicationCount}
              </p>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">Interviewing:</p>
              <p className="text-sm sm:text-base">0</p>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">
                Cancelled Applications:
              </p>
              <p className="text-sm sm:text-base">0</p>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">
                Accepting Applications:
              </p>
              <p className="text-sm sm:text-base">
                {auditionPost.isAcceptingApplicatons ? 'No' : 'Yes'}
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 text-sm space-y-2  lg:hidden">
          <h2 className="text-sm sm:text-base mb-2 font-medium">
            About the author
          </h2>
          <div className="flex justify-between sm:justify-start sm:space-x-2 cursor-pointer ">
            <p className="font-light text-sm sm:text-base">Name:</p>
            <Link to={`/profile/${auditionPost?.author?.id}`}>
              <a className="text-sm sm:text-base text-blue-500">
                {auditionPost.author?.fullName}
              </a>
            </Link>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="font-light text-sm sm:text-base">posts' count:</p>
            <p className="text-sm sm:text-base">2</p>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="font-light text-sm sm:text-base">Country:</p>
            <p className="text-sm sm:text-base">
              {auditionPost.author?.address?.country}
            </p>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <p className="font-light text-sm sm:text-base">Region:</p>
            <p className="text-sm sm:text-base">
              {auditionPost.author?.address?.region}
            </p>
          </div>
        </div>
      </div>
      {currentUser?.id !== auditionPost?.author?.id && (
        <div className="bg-white  py-5 px-5 border rounded-r-xl">
          <div className="flex py-3 justify-around lg:inline-block lg:space-y-5 lg:pt-5 lg:pb-8 w-full  border-b">
            <Link to={`/auditions/${auditionPost._id}/apply`}>
              <button className="  bg-black text-center w-64 lg:w-full rounded-full py-2 text-lg text-white">
                Submit an application
              </button>
            </Link>
            <button className="border rounded-full flex justify-center items-center border-black h-11 w-11 lg:w-full md:w-80 sm:w-64 md:space-x-2 lg:py-3">
              {/* <HeartIcon className="text-black h-6" /> */}
              <span className="hidden md:flex">save</span>
            </button>
          </div>

          <div className="p-5 text-sm space-y-2 border-b w-full hidden lg:inline-block">
            <h2 className="text-sm sm:text-base mb-2 font-medium">
              About the author
            </h2>
            <div
              className="flex justify-between sm:justify-start sm:space-x-2 cursor-pointer"
              onClick={() =>
                history.push(`/profile/${auditionPost?.author?.id}`)
              }
            >
              <p className="font-light text-sm sm:text-base">Name:</p>
              <p className="text-sm sm:text-base">
                {auditionPost.author?.fullName}
              </p>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">posts' count:</p>
              <p className="text-sm sm:text-base">2</p>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">Country:</p>
              <p className="text-sm sm:text-base">
                {auditionPost.author?.address?.country}
              </p>
            </div>
            <div className="flex justify-between sm:justify-start sm:space-x-2">
              <p className="font-light text-sm sm:text-base">Region:</p>
              <p className="text-sm sm:text-base">
                {auditionPost.author?.address?.region}
              </p>
            </div>
          </div>
        </div>
      )}
      {currentUser?.id === auditionPost?.author?.id &&
        (loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white mt-2">
            <div className="flex justify-center items-center pt-3 pb-2 space-x-1">
              <input
                type="text"
                className="w-96 h-8 text-sm focus:co font-light rounded-full border-indigo-500 outline-none focus:border-indigo-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <SearchIcon className="bg-transparent h-6 text-indigo-400" /> */}
            </div>
            {searchApplication?.map((application) => (
              <div
                className="bg-white rounded-xl border-b"
                key={application._id}
              >
                <ApplicationList application={application} />
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default AuditionPost;
