import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../store/user/api.user';

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
      <table id="users" class="display">
        <thead>
          <tr>
            <th>fullName</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Talent</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user) => (
            <tr>
              <td>{user?.fullName}</td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.phoneNumber}</td>
              <td>{user?.role}</td>
              <td>{user?.talent}</td>
              <td>
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
