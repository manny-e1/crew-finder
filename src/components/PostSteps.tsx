import React from 'react';
import { Link } from 'react-router-dom';

const PostSteps = ({
  step1,
  step2,
  step3,
}: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
}) => {
  return (
    <nav className="mt-5 mb-2">
      <ul className="flex justify-center space-x-10 mx-auto">
        <li className="">
          {step1 ? (
            <Link
              className="text-indigo-700 border-b pb-2 border-indigo-800"
              to="/post/title-description"
            >
              Title and Description
            </Link>
          ) : (
            <Link className="" aria-disabled to="">
              Title and Description
            </Link>
          )}
        </li>
        <li className="">
          {step2 ? (
            <Link
              className="text-indigo-700 border-b pb-2 border-indigo-800"
              to="/post/talents"
            >
              Talents
            </Link>
          ) : (
            <Link className="" aria-disabled to="">
              Talents
            </Link>
          )}
        </li>
        <li className="">
          {step3 ? (
            <Link
              className="text-indigo-700 border-b pb-2 border-indigo-800"
              to="/post/extra-requirements"
            >
              Others
            </Link>
          ) : (
            <Link className="" aria-disabled to="">
              Others
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default PostSteps;
