import { UserIcon, DocumentIcon } from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';
import {
  ChangeEvent,
  ComponentProps,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchDropDownVisibilityAtom } from '../atoms/changeElementVIsibilityAtoms';
import { currentUserAtom } from '../atoms/localStorageAtoms';
import { Role } from '../util/enums';

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
    <div className="flex items-center gap-2 p-2 " onClick={onClick}>
      <Icon className="h-5" />
      <div>
        <p className="text-size-sm font-light">{type}</p>
        <p className="text-sm font-light">{description}</p>
      </div>
    </div>
  );
}

function Header() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [searchDropDownVisibility, setSearchDropDownVisibllity] = useAtom(
    searchDropDownVisibilityAtom
  );
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

  useEffect(() => {
    if (searchInput) {
      setSearchDropDownVisibllity('block');
    } else {
      setSearchDropDownVisibllity('hidden');
    }
  }, [searchInput]);

  return (
    <nav
      className="sticky top-0 z-50 
                grid grid-cols-3 bg-white
                p-2 shadow-md md:px-10"
    >
      <Link
        to="/"
        className="relative my-auto flex 
                h-10 cursor-pointer items-center"
      >
        <p className="text-xl">Crew Finder</p>
      </Link>
      {currentUser ? (
        <div className="hidden items-center py-2  md:flex md:flex-col ">
          <input
            className="mx-2 w-full rounded-full border-none bg-gray-100 pl-5 text-sm text-gray-600 placeholder-gray-400 "
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            name="search"
            placeholder="start your search"
          />

          <div
            className={`absolute top-14 mx-auto w-80 rounded-sm bg-white p-3 ${searchDropDownVisibility}`}
          >
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
        </div>
      ) : (
        <div className="flex items-center "></div>
      )}

      {currentUser ? (
        <div className="flex items-center justify-end space-x-4 text-gray-500">
          {currentUser.role === Role.proDirector && (
            <Link to="/post/title-description">
              <p className="hidden text-red-400 md:inline-flex">Post</p>
            </Link>
          )}
          <Link
            to={`/profile/${currentUser.id}`}
            className="hidden text-red-400 md:inline-flex"
          >
            Profile
          </Link>
          <button
            className="hidden text-red-400 md:inline-flex"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end space-x-4 text-gray-500">
          <Link to="/login">
            <p className="flex text-red-400 md:inline">Sign In</p>
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
