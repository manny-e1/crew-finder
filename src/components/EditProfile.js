import { useState } from 'react';
import { RegionDropdown } from 'react-country-region-selector';
import { useDispatch } from 'react-redux';
import { hideEdit } from '../store/ui/hideDiv';
import { updateUserProfile } from '../store/user/api.user';

function EditProfile() {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [region, setRegion] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    const user = {
      fullName,
      bio,
      region,
    };
    dispatch(updateUserProfile(user));
    dispatch(hideEdit());
  };

  return (
    <div className="absolute inset-x-6 md:inset-x-10 lg:inset-x-1/3 bg-white">
      <div className="flex justify-between border-b p-5 ">
        <h2>Edit Profile</h2>
        <div
          onClick={() => dispatch(hideEdit())}
          className="cursor-pointer text-xl"
        >
          X
        </div>
      </div>
      <div className="">
        <form>
          <div>
            <label
              htmlFor="fullName"
              className="block text sm font-medium text-gray-700"
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
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block text sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                className="w-full border-gray-300  rounded-lg shadow-sm
                                        focus:border-indigo-500 focus:ring-indigo-500"
                type="text"
                name="bio"
                id="bio"
                autoComplete="bio"
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
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
                country="ET"
                value={region}
                onChange={(val) => setRegion(val)}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-end py-3 border-b px-5">
        <button
          className="py-1 px-5 rounded-full  bg-indigo-400"
          onClick={(e) => submitHandler(e)}
        >
          Save Image
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
