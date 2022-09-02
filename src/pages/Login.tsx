import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { login } from '../store/user/api.user';
import type { UseMutationResult } from '@tanstack/react-query';
import { SetStateAction, useAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import { ISignInParams, signInUser } from '../services/authService';
import { CurrentUser, currentUserAtom } from '../atoms/localStorageAtoms';
import { useNavigate } from 'react-router-dom';

function Login(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, setCurrentUser] = useAtom<
    CurrentUser | null,
    SetStateAction<CurrentUser | null>,
    void
  >(currentUserAtom);
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    mutate,
  }: UseMutationResult<CurrentUser, Error, ISignInParams> = useMutation<
    CurrentUser,
    Error,
    ISignInParams
  >(signInUser, {
    onSuccess: (data) => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      setCurrentUser(data);
      navigate('/');
    },
  });

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({ email, password });
  };
  return (
    <>
      <Header />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg bg-white py-8 px-6 shadow sm:px-10">
          <div className="mb-0 space-y-6">
            <div>
              <label
                htmlFor="email"
                className=" text-sm font-medium text-gray-700"
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
                  className="w-full rounded-lg  border-gray-300 shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
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
                  className="w-full rounded-lg  border-gray-300 shadow-sm
                focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md border 
              border-transparent bg-indigo-600 py-2 px-4 text-sm 
              font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none
              focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
              disabled:opacity-50"
                onClick={submitHandler}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Sign in'}
              </button>
            </div>
            {error && <p className="text-red-400">{JSON.stringify(error)}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
