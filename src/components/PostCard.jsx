import { Link } from 'react-router-dom';
import CatagoryButton from './CategoryButton';

function PostCard({ key, auditionPost, fromSearch }) {
  return (
    <div
      className="flex py-4 px-2 pr-4 border-b
       opacity-200 first:border-t"
      key={key}
    >
      <div className="flex flex-col flex-grow pl-5 mb-10 ">
        <div className=" pb-5">
          <h2 className="text-xl ">
            <Link
              className=""
              to={{
                pathname: `/auditions/${auditionPost._id}`,
                state: { auditionPost },
              }}
            >
              {auditionPost.title}
            </Link>
          </h2>
          {fromSearch && (
            <p className="text-sm font-light">
              Posted by: {auditionPost?.author?.fullName}
            </p>
          )}
        </div>

        {/* <div className="border-b w-10 pt-2"/> */}
        <p className="text-sm pt-2 flex-grow text-gray-500 line-clamp-1 sm:line-clamp-2 lg:line-clamp-3">
          {auditionPost.text}
        </p>
        <div className="flex">
          <p className="flex items-center pt-3 pb-2 pr-2 text-sm font-extralight">
            Application Count:
          </p>
          <p className="items-center pt-3 pb-2 text-sm">
            {auditionPost.applicationCount}
          </p>
        </div>
        <div className="flex flex-wrap">
          {auditionPost.talents?.map((talent) => (
            <CatagoryButton key={talent} text={talent} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
