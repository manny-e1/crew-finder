import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { register } from '../store/user/api.user';
import { applicant, pro_director, rolechoice } from '../constants/talents';

function Signup({ location, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [talent, setTalent] = useState('');

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
    phoneNumber,
    role,
    talent,
    gender,
  };
  // console.log(user);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  let { loading, error, message } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(user));
  };

  const genn = ['Male', 'Female'];
  return (
    <div>
      <Header />
      {message && <h1>{message}</h1>}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
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
                  className="w-full border-gray-300  rounded-lg shadow-sm
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
              {error?.fullName && (
                <p className="text-red-400">{error?.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text sm font-medium text-gray-700"
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
                  className="w-full border-gray-300  rounded-lg shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              {error?.username && (
                <p className="text-red-400">{error?.username}</p>
              )}
            </div>

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
              {error?.email && <p className="text-red-400">{error?.email}</p>}
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
              {error?.password && (
                <p className="text-red-400">{error?.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="birthdate"
                className="block text sm font-medium text-gray-700"
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
                  className="w-full border-gray-300  rounded-lg shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              {error?.birthdate && (
                <p className="text-red-400">{error?.birthdate}</p>
              )}
            </div>

            <div class="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-city"
                >
                  Country
                </label>
                <CountryDropdown
                  valueType="short"
                  whitelist={['ET']}
                  className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'
                  value={country}
                  disabled={false}
                  onChange={(val) => setCountry(val)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Region
                </label>
                <div className="relative">
                  <RegionDropdown
                    required
                    disableWhenEmpty={false}
                    countryValueType="short"
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'
                    country={country}
                    value={region}
                    onChange={(val) => setRegion(val)}
                  />
                </div>
              </div>
              {error?.address && (
                <p className="text-red-400">{error?.address}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry={country}
                country={country}
                countries={['ET']}
                name="phoneNumber"
                className="w-full border-gray-300 rounded-lg shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500"
                id="phone"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              {error?.phoneNumber && (
                <p className="text-red-400">{error?.phoneNumber}</p>
              )}
            </div>

            <div class="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Role
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option selected>Select Role</option>
                    {rolechoice?.map((role) => (
                      <option value={role.toUpperCase()}>{role}</option>
                    ))}
                  </select>
                </div>
                {error?.role && <p className="text-red-400">{error?.role}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Talent
                </label>
                <div className="relative">
                  {role === rolechoice[0].toUpperCase() ? (
                    <select
                      onChange={(e) => setTalent(e.target.value)}
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      {applicant?.map((talent) => (
                        <option value={talent.toUpperCase()}>{talent}</option>
                      ))}
                    </select>
                  ) : role === rolechoice[1].toUpperCase() ? (
                    <select
                      onChange={(e) => setTalent(e.target.value)}
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      {pro_director?.map((talent) => (
                        <option value={talent.toUpperCase()}>{talent}</option>
                      ))}
                    </select>
                  ) : (
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      disabled
                    >
                      <option>-</option>
                    </select>
                  )}
                </div>
                {error?.talent && (
                  <p className="text-red-400">{error?.talent}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="Gender"
                className="block text sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                onChange={(e) => setGender(e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500"
                id="phone"
              >
                <option>Select Gender</option>
                {genn?.map((gender) => (
                  <option value={gender.toUpperCase()}>{gender}</option>
                ))}
              </select>
              {error?.gender && <p className="text-red-400">{error?.gender}</p>}
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
                {loading ? '...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
