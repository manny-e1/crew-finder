import { useAtom } from 'jotai';
import { MouseEvent, useState } from 'react';
import { RegionDropdown } from 'react-country-region-selector';
import { useDispatch } from 'react-redux';
import { editButtonVisibilityAtom } from '../atoms/changeElementVIsibilityAtoms';
import { hideEdit } from '../store/ui/hideDiv';
import { updateUserProfile } from '../store/user/api.user';

function EditProfile() {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [region, setRegion] = useState('');
  const dispatch = useDispatch();

  const [_, setEditButtonVisibility] = useAtom(editButtonVisibilityAtom);

  const hideEditForm = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.preventDefault();
    setEditButtonVisibility({ display: 'hidden' });
  };

  const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = {
      fullName,
      bio,
      region,
    };
    // dispatch(updateUserProfile(user));
    hideEditForm(e);
  };

  return (
    <div className="absolute inset-x-6 bg-white md:inset-x-10 lg:inset-x-1/3">
      <div className="flex justify-between border-b p-5 ">
        <h2>Edit Profile</h2>
        <div onClick={hideEditForm} className="cursor-pointer text-xl">
          X
        </div>
      </div>
      <div className="">
        <form>
          <div>
            <label
              htmlFor="fullName"
              className="text sm block font-medium text-gray-700"
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
          </div>
          <div>
            <label
              htmlFor="bio"
              className="text sm block font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                className="w-full rounded-lg  border-gray-300 shadow-sm
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
                classes='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'
                country="ET"
                value={region}
                onChange={(val) => setRegion(val)}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-end border-b py-3 px-5">
        <button
          className="rounded-full bg-indigo-400 py-1  px-5"
          onClick={(e) => submitHandler(e)}
        >
          Save Image
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
