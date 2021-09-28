import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../store/user/api.user';
import { capitalizeFirstLetter } from '../../util/firstLetterCapitalizer';

function AdminUsersList() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.getAllUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const submitHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <table>
        <thead className="bg-green-200 w-full">
          <tr>
            <th className="border-r px-3 py-2">fullName</th>
            <th className="border-r px-3 py-2">Username</th>
            <th className="border-r px-3 py-2">Email</th>
            <th className="border-r px-3 py-2">Phone Number</th>
            <th className="border-r px-3 py-2">Role</th>
            <th className="border-r px-3 py-2">Talent</th>
            <th className="border-r px-3 py-2">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-yellow-100">
          {allUsers?.map((user) => (
            <tr>
              <td className="border-r px-3 py-1 text-size-sm">
                {user?.fullName}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                {user?.username}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">{user?.email}</td>
              <td className="border-r px-3 py-1 text-size-sm">
                {user?.phoneNumber}
              </td>
              <td className="border-r px-3 py-1 text-size-sm">
                {capitalizeFirstLetter(user?.role)}
              </td>
              <td className="border-r px-3 py-1">
                {capitalizeFirstLetter(user?.talent)}
              </td>
              <td className="border-r px-3 py-1">
                <button
                  className="text-red-500 py-1 px-5"
                  onClick={() => submitHandler(user?._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersList;
