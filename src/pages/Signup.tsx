import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { register } from '../store/user/api.user';
import { applicant, pro_director, rolechoice } from '../constants/talents';
import { ISignUpParams, signUpUser } from '../services/authService';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const genderList = ['Male', 'Female'];

type signupErrorResponse = {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  birthdate?: string;
  address?: string;
  phoneNumber?: string;
  role?: string;
  talent?: string;
  gender?: string;
};

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [talent, setTalent] = useState('');
  console.log(gender);

  const {
    isLoading,
    error,
    mutate,
  }: UseMutationResult<
    any,
    AxiosError<{ message: signupErrorResponse | string }, any>,
    ISignUpParams
  > = useMutation<
    any,
    AxiosError<{ message: signupErrorResponse | string }, any>,
    ISignUpParams
  >(signUpUser, {
    onSuccess: (_) => {
      navigate('/login');
    },
  });

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = {
      fullName,
      username,
      email,
      password,
      birthdate,
      address: {
        country,
        region,
      },
      phoneNumber: phoneNumber?.toString(),
      role,
      talent,
      gender,
    };
    mutate(user);
  };

  return (
    <div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg bg-white py-8 px-6 shadow sm:px-10">
          <form action="" className="mb-0 space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  className="w-full rounded-lg  border-gray-300 shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
                  type="text"
                  name="fullName"
                  id="fullName"
                  autoComplete="fullName"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              {error?.response?.data &&
                (error?.response?.data?.['message'] as signupErrorResponse)
                  .fullName && (
                  <p className="text-red-400">
                    {error?.response?.data &&
                      (
                        error?.response?.data?.[
                          'message'
                        ] as signupErrorResponse
                      ).fullName}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="text sm block font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg  border-gray-300 shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              {error?.response?.data &&
                (error?.response?.data?.['message'] as signupErrorResponse)
                  .username && (
                  <p className="text-red-400">
                    {error?.response?.data &&
                      (
                        error?.response?.data?.[
                          'message'
                        ] as signupErrorResponse
                      ).username}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="text sm block font-medium text-gray-700"
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
              {error?.response?.data &&
                (error?.response?.data?.['message'] as signupErrorResponse)
                  .email && (
                  <p className="text-red-400">
                    {error?.response?.data &&
                      (
                        error?.response?.data?.[
                          'message'
                        ] as signupErrorResponse
                      ).email}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="text sm block font-medium text-gray-700"
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
              {error?.response?.data &&
                (error?.response?.data?.['message'] as signupErrorResponse)
                  .password && (
                  <p className="text-red-400">
                    {error?.response?.data &&
                      (
                        error?.response?.data?.[
                          'message'
                        ] as signupErrorResponse
                      ).password}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="birthdate"
                className="text sm block font-medium text-gray-700"
              >
                Birth Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  autoComplete="birthdate"
                  required
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="w-full rounded-lg  border-gray-300 shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              {error?.response?.data &&
                (error?.response?.data?.['message'] as signupErrorResponse)
                  .birthdate && (
                  <p className="text-red-400">
                    {error?.response?.data &&
                      (
                        error?.response?.data?.[
                          'message'
                        ] as signupErrorResponse
                      ).birthdate}
                  </p>
                )}
            </div>

            <div className="-mx-3 mb-2 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="grid-city"
                >
                  Country
                </label>
                <CountryDropdown
                  valueType="short"
                  whitelist={['ET']}
                  classes='focus:border-gray-500" block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:bg-white focus:outline-none'
                  value={country}
                  disabled={false}
                  onChange={(val) => setCountry(val)}
                />
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="grid-state"
                >
                  Region
                </label>
                <div className="relative">
                  <RegionDropdown
                    disableWhenEmpty={false}
                    countryValueType="short"
                    classes='focus:border-gray-500" block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:bg-white focus:outline-none'
                    country={country}
                    value={region}
                    onChange={(val) => setRegion(val)}
                  />
                </div>
              </div>
              {error?.response?.data &&
                (error?.response?.data?.['message'] as signupErrorResponse)
                  .address && (
                  <p className="text-red-400">
                    {error?.response?.data &&
                      (
                        error?.response?.data?.[
                          'message'
                        ] as signupErrorResponse
                      ).address}
                  </p>
                )}
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="text sm block font-medium text-gray-700"
              >
                Phone Number
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                country={country}
                countries={['ET']}
                name="phoneNumber"
                className="w-full rounded-lg border-gray-300 shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500"
                id="phone"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
              />
              {error?.response?.data &&
                (error?.response?.data?.['message'] as signupErrorResponse)
                  .phoneNumber && (
                  <p className="text-red-400">
                    {error?.response?.data &&
                      (
                        error?.response?.data?.[
                          'message'
                        ] as signupErrorResponse
                      ).phoneNumber}
                  </p>
                )}
            </div>

            <div className="-mx-3 mb-2 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="grid-state"
                >
                  Role
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-state"
                  >
                    <option value="">Select Role</option>
                    {rolechoice?.map((role) => (
                      <option key={role} value={role.toUpperCase()}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                {error?.response?.data &&
                  (error?.response?.data?.['message'] as signupErrorResponse)
                    .role && (
                    <p className="text-red-400">
                      {
                        (
                          error?.response?.data?.[
                            'message'
                          ] as signupErrorResponse
                        ).role
                      }
                    </p>
                  )}
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="grid-state"
                >
                  Talent
                </label>
                <div className="relative">
                  {role === rolechoice[0].toUpperCase() ? (
                    <select
                      onChange={(e) => setTalent(e.target.value)}
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-state"
                    >
                      {applicant?.map((talent) => (
                        <option key={talent} value={talent.toUpperCase()}>
                          {talent}
                        </option>
                      ))}
                    </select>
                  ) : role === rolechoice[1].toUpperCase() ? (
                    <select
                      onChange={(e) => setTalent(e.target.value)}
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-state"
                    >
                      {pro_director?.map((talent) => (
                        <option key={talent} value={talent.toUpperCase()}>
                          {talent}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-state"
                      disabled
                    >
                      <option value="">-</option>
                    </select>
                  )}
                </div>
                {error?.response?.data &&
                  (error?.response?.data?.['message'] as signupErrorResponse)
                    .talent && (
                    <p className="text-red-400">
                      {
                        (
                          error?.response?.data?.[
                            'message'
                          ] as signupErrorResponse
                        ).talent
                      }
                    </p>
                  )}
              </div>
            </div>

            <div>
              <label
                htmlFor="Gender"
                className="text sm block font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500"
                // defaultValue={genderList[0].toUpperCase()}
                id="phone"
              >
                <option value="">Select Gender</option>
                {genderList?.map((gender) => (
                  <option key={gender} value={gender.toUpperCase()}>
                    {gender}
                  </option>
                ))}
              </select>
              {error?.response?.data &&
                (error?.response?.data?.['message'] as signupErrorResponse)
                  .gender && (
                  <p className="text-red-400">
                    {error?.response?.data &&
                      (
                        error?.response?.data?.[
                          'message'
                        ] as signupErrorResponse
                      ).gender}
                  </p>
                )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border 
                                    border-transparent bg-indigo-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-indigo-700 
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                    focus:ring-offset-2"
                onClick={submitHandler}
              >
                {isLoading ? '...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
