import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { login } from '../store/user/api.user';
import type { UseMutationResult } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import { ISignInParams, IUser, signInUser } from '../services/authService';
import { currentUserAtom } from '../atoms/localStorageAtoms';
import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react-markdown/lib/react-markdown';

function Login(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    isLoading,
    error,
    mutate,
  }: UseMutationResult<IUser, Error, ISignInParams> = useMutation<
    IUser,
    Error,
    ISignInParams
  >(signInUser, {
    onSuccess: (data) => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      <Navigate to="/" />;
    },
  });

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate({ email, password });
  };
  return (
    <div>
      <Header />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <form action="" className="mb-0 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-gray-300  rounded-lg shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-gray-300  rounded-lg shadow-sm
                focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 
              border border-transparent rounded-md shadow-sm text-sm 
              font-medium text-white bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-indigo-500"
                  onClick={submitHandler}
                >
                  Sign in
                </button>
              </div>
              {error && <p className="text-red-400">{error.message}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
