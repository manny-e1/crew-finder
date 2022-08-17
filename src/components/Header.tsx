import { UserIcon, DocumentIcon } from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';
import {
  ComponentProps,
  FormEvent,
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { currentUserAtom } from '../atoms/localStorageAtoms';
import { Role } from '../enums';

function SearchDropdownRow({
  type,
  description,
  onClick,
  icon: Icon,
}: {
  type: string;
  description: string;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  icon: (props: ComponentProps<'svg'>) => ReactElement;
}) {
  return (
    <div className="flex gap-2 p-2 items-center " onClick={onClick}>
      <Icon className="h-5" />
      <div>
        <p className="font-light text-size-sm">{type}</p>
        <p className="text-sm font-light">{description}</p>
      </div>
    </div>
  );
}

function Header() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const logoutHandler = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const userSearchHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate({
      pathname: '/users',
      search: `search=${searchInput}`,
    });
  };
  const auditionPostSeachHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate({
      pathname: '/auditionposts',
      search: `search=${searchInput}`,
    });
  };

  return (
    <nav
      className="sticky top-0 z-50 
                grid grid-cols-3 bg-white
                shadow-md p-2 md:px-10"
    >
      <Link
        to="/"
        className="relative flex items-center 
                h-10 cursor-pointer my-auto"
      >
        <p className="text-xl">Crew Finder</p>
      </Link>
      {currentUser ? (
        <div className="md:flex md:flex-col hidden  items-center py-2 ">
          <input
            className="w-full pl-5 mx-2 rounded-full border-none bg-gray-100 text-sm text-gray-600 placeholder-gray-400 "
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            name="search"
            placeholder="start your search"
          />
          {searchInput && (
            <div className="w-1/4 rounded-sm absolute top-14 bg-white mx-auto p-3 ">
              <SearchDropdownRow
                type="Talent"
                description="lorem ipsum"
                onClick={userSearchHandler}
                icon={UserIcon}
              />
              <SearchDropdownRow
                type="Audition posts"
                description="lorem ipsum"
                onClick={auditionPostSeachHandler}
                icon={DocumentIcon}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center "></div>
      )}

      {currentUser ? (
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          {currentUser.role === Role.proDirector && (
            <Link to="/post/title-description">
              <p className="hidden md:inline-flex text-red-400">Post</p>
            </Link>
          )}
          <p
            className="hidden md:inline-flex text-red-400"
            onClick={logoutHandler}
          >
            Logout
          </p>
        </div>
      ) : (
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          <Link to="/login">
            <p className="flex md:inline text-red-400">Sign In</p>
          </Link>
          <Link to="/signup">
            <p className="flex text-red-400">Sign up</p>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
