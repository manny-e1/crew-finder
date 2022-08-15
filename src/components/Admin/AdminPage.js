import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { logout } from '../../store/user/api.user';
import AdminApplicationsList from './AdminApplicationsList';
import AdminPostsList from './AdminPostsList';
import { SideBar } from './AdminSideBar';
import AdminUsersList from './AdminUsersList';

function AdminPage() {
  const search = useLocation().search;
  const dispatch = useDispatch();
  const tab = new URLSearchParams(search);
  return (
    <div>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <SideBar initialTab={tab.get('tab')}>
        <div label="Users">
          <AdminUsersList />
        </div>
        <div label="Posts">
          <AdminPostsList />
        </div>
        <div label="Applications">
          <AdminApplicationsList />
        </div>
      </SideBar>
    </div>
  );
}

export default AdminPage;
