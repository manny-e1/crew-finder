import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import UsersList from '../components/UsersList';
import { getUsers } from '../store/user/api.user';
import { format } from 'timeago.js';

function UserSearchPage({ location }) {
  const search = new URLSearchParams(location.search).get('search') ?? '';

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(80);
  const [region, setRegion] = useState('');
  const [sex, setSex] = useState('');

  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.getUsers);

  const uu = users.filter(
    (user) =>
      parseInt(format(user?.birthdate).split(' ')[0]) > min &&
      parseInt(format(user?.birthdate).split(' ')[0]) < max &&
      user?.address?.region?.toLowerCase().includes(region.toLowerCase()) &&
      user?.gender?.toLowerCase().includes(sex.toLowerCase())
  );
  useEffect(() => {
    // console.log(uu);
    dispatch(getUsers(`?search=${search}`));
  }, []);

  // console.log(users);

  return (
    <div>
      <Header />
      <div className="flex justify-center space-x-5">
        <div className="flex space-x-2">
          <p>age:</p>
          <input
            className="w-20 h-7"
            type="number"
            placeholder="min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            className="w-20 h-7"
            type="number"
            placeholder="max"
            value={max}
            onChange={(e) =>
              setMax(e.target.value === '' ? 80 : e.target.value)
            }
          />
        </div>
        <div className="flex space-x-2">
          <p>region:</p>
          <input
            className="w-24 h-7"
            type="text"
            placeholder="region"
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <p>sex:</p>
          <input
            className="w-20 h-7"
            type="text"
            placeholder="male"
            onChange={(e) => setSex(e.target.value)}
          />
        </div>
      </div>
      {uu?.map((user) => (
        <UsersList key={user?._id} user={user} />
      ))}
    </div>
  );
}

export default UserSearchPage;
