import { useLocation } from 'react-router';
import AdminApplicationsList from './AdminApplicationsList';
import AdminPostsList from './AdminPostsList';
import { SideBar } from './AdminSideBar';
import AdminUsersList from './AdminUsersList';

function AdminPage() {
  const search = useLocation().search;
  const tab = new URLSearchParams(search);
  return (
    <div>
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
