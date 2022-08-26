import { useEffect, useMemo, useState } from 'react';
import UsersList from '../components/UsersList';
import { format } from 'timeago.js';
import { useLocation } from 'react-router-dom';
import { getUsers, IUser } from '../services/userService';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { searchDropDownVisibilityAtom } from '../atoms/changeElementVIsibilityAtoms';

function UserSearchPage() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search') ?? '';

  const [_, setSearchDropDownVisibllity] = useAtom(
    searchDropDownVisibilityAtom
  );

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(80);
  const [region, setRegion] = useState('');
  const [sex, setSex] = useState('');

  const {
    isLoading,
    data: users,
    error,
  } = useQuery<IUser[], AxiosError<{ message: string }>>(
    ['users', search],
    () => getUsers(search)
  );

  const filteredUsers = useMemo(
    () =>
      users?.filter(
        (user: IUser) =>
          parseInt(format(user?.birthdate!).split(' ')[0]) > min &&
          parseInt(format(user?.birthdate!).split(' ')[0]) < max &&
          user?.address?.region?.toLowerCase().includes(region.toLowerCase()) &&
          user?.gender?.toLowerCase().includes(sex.toLowerCase())
      ),
    [users, min, max, region, sex]
  );

  useEffect(() => {
    setSearchDropDownVisibllity('hidden');
  }, [search]);

  if (isLoading) return <p className="flex justify-center">Loading...</p>;
  if (error)
    return (
      <p className="flex justify-center">{error.response?.data['message']}</p>
    );

  return (
    <div>
      <div className="mt-5 flex justify-center space-x-5">
        <div className="flex space-x-2">
          <p>age:</p>
          <input
            className="h-7 w-20"
            type="number"
            placeholder="min"
            value={min}
            onChange={(e) => setMin(+e.target.value)}
          />
          <input
            className="h-7 w-20"
            type="number"
            placeholder="max"
            value={max}
            onChange={(e) =>
              setMax(e.target.value === '' ? 80 : +e.target.value)
            }
          />
        </div>
        <div className="flex space-x-2">
          <p>region:</p>
          <input
            className="h-7 w-24"
            type="text"
            placeholder="region"
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <p>sex:</p>
          <input
            className="h-7 w-20"
            type="text"
            placeholder="male"
            onChange={(e) => setSex(e.target.value)}
          />
        </div>
      </div>
      {filteredUsers?.map((user: IUser) => (
        <UsersList key={user?._id} user={user} />
      ))}
    </div>
  );
}

export default UserSearchPage;
