import {
  UserIcon,
  // ClipboardListIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/user/api.user';

function Header() {
  const [searchInput, setSearchInput] = useState('');
  const history = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { currentUser } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const userSeachHandler = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/users',
      search: `search=${searchInput}`,
    });
  };
  const auditionPostSeachHandler = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/auditionposts',
      search: `search=${searchInput}`,
    });
  };

  return (
    <div>
      <header
        className="sticky top-0 z-50 
                grid grid-cols-3 bg-white
                shadow-md p-2 md:px-10"
      >
        <div
          // onClick = {()=>router.push("/")}
          className="relative flex items-center 
                h-10 cursor-pointer my-auto"
        >
          <h1>Crew Finder</h1>
        </div>
        {currentUser ? (
          <div className="md:flex md:flex-col hidden  items-center py-2 ">
            <input
              className="w-full pl-5 mx-2 rounded-full border-none bg-gray-100 text-sm text-gray-600 placeholder-gray-400 "
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              name=""
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
                  {/* <ClipboardListIcon className="h-4" /> */}
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
              <button className="flex md:inline text-red-400">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="flex text-red-400">Sign up</button>
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
