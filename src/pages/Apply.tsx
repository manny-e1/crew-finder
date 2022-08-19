import { useMutation } from '@tanstack/react-query';
import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { apply } from '../store/application/api.application';
import { createApplication } from '../services/applicationService';
import { AxiosError } from 'axios';

function Apply() {
  const [applicationLetter, setApplicationLetter] = useState('');

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, mutate } = useMutation<
    any,
    AxiosError<
      | {
          message:
            | { auditionPostId?: string; applicationLetter?: string }
            | string;
        }
      | any,
      any
    >,
    { auditionPostId: string; applicationLetter: string }
  >(createApplication, {
    onSuccess: (_) => {
      navigate(`/auditions/${id}`);
    },
  });
  const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutate({
      auditionPostId: id!,
      applicationLetter,
    });
  };
  return (
    <div className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
      <form>
        <div className="space-y-3 mx-4">
          <label
            htmlFor="applicationLetter"
            className="block text sm font-medium text-gray-700"
          >
            Application Letter
          </label>

          <p className="text-sm font-light">
            Introduce yourself and explain why you’re a strong candidate for
            this role.{' '}
          </p>
          <div className="mt-2">
            <textarea
              className="w-full border-gray-300  rounded-lg shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
              rows={8}
              cols={80}
              minLength={25}
              maxLength={500}
              name="applicationLetter"
              id="applicationLetter"
              required
              value={applicationLetter}
              onChange={(e) => setApplicationLetter(e.target.value)}
            />
          </div>
          {error && error.response?.data!['message']!['applicationLetter'] && (
            <p className="text-sm text-red-600">
              {error?.response.data!['message']!['applicationLetter']}
            </p>
          )}
          {error && error.response?.data!['message']!['auditionPostId'] && (
            <p className="text-sm text-red-600">
              {error?.response.data!['message']!['auditionPostId']}
            </p>
          )}
          {error &&
            error.response?.data &&
            !error.response?.data!['message']!['applicationLetter'] &&
            !error.response?.data!['message']!['auditionPostId'] && (
              <p className="text-sm text-red-600">
                {error?.response.data!['message']}
              </p>
            )}
        </div>
        <div className="m-5 flex items-center justify-center">
          <button
            type="submit"
            className="w-full py-2 px-4 
                                    border border-transparent rounded-full shadow-sm 
                                    font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    text-md
                                    focus:ring-indigo-500"
            onClick={(e) => submitHandler(e)}
          >
            {isLoading ? '...Loading' : 'Apply'}
          </button>
        </div>
      </form>
    </div>
  );
}
