import { Link } from 'react-router-dom';
import CatagoryButton from './CategoryButton';
import { IAuditionPost } from '../services/auditionPostService';

function PostCard({
  auditionPost,
  fromSearch,
}: {
  auditionPost: IAuditionPost;
  fromSearch?: boolean;
}) {
  return (
    <div
      className="opacity-200 flex border-b py-4 px-2
       pr-4 first:border-t"
    >
      <div className="mb-10 flex flex-grow flex-col pl-5 ">
        <div className=" pb-5">
          <h2 className="text-xl ">
            <Link className="" to={`/auditions/${auditionPost._id}`}>
              {auditionPost.title}
            </Link>
          </h2>
          {fromSearch && (
            <p className="text-sm font-light">
              Posted by: {auditionPost?.author?.fullName}
            </p>
          )}
        </div>

        <p className="flex-grow pt-2 text-sm text-gray-500 line-clamp-1 sm:line-clamp-2 lg:line-clamp-3">
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
