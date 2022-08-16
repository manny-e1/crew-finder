import { UserIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';
import { FormEvent, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { currentUserAtom } from '../atoms/localStorageAtoms';

function Header() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const logoutHandler = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const userSeachHandler = (e: MouseEvent<HTMLElement>) => {
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
        <a className="text-xl">Crew Finder</a>
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
            <div className="w-1/4 rounded-md absolute top-12 bg-white mx-auto p-3 ">
              <div
                className="flex space-x-1 p-2 "
                onClick={(e) => userSeachHandler(e)}
              >
                <UserIcon className="h-4" />
                <div>
                  <p className="font-light text-size-sm">Talent</p>
                  <p className="text-sm font-light">lorem ipsum orem ipsum</p>
                </div>
              </div>
              <div
                className="flex space-x-1 p-2"
                onClick={(e) => auditionPostSeachHandler(e)}
              >
                <ClipboardDocumentListIcon className="h-4" />
                <div>
                  <p className="font-light text-size-sm">Audition posts</p>
                  <p className="text-sm font-light">lorem ipsum orem ipsum</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center "></div>
      )}

      {currentUser ? (
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          {currentUser.role === 'PRO_DIRECTOR' && (
            <Link to="/post/title-description">
              <button className="hidden md:inline-flex text-red-400">
                Post
              </button>
            </Link>
          )}
          <button
            className="hidden md:inline-flex text-red-400"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          <Link to="/login">
            <a className="flex md:inline text-red-400">Sign In</a>
          </Link>
          <Link to="/signup">
            <a className="flex text-red-400">Sign up</a>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
