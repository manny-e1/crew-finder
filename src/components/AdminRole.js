import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function AdminRole({ Component }) {
  const { currentUser } = useSelector((state) => state.userLogin);
  if (!currentUser) return <Redirect to="/login" />;
  else if (currentUser && currentUser?.role === 'ADMIN') return <Component />;
  else return <Redirect to="/" />;
}

export default AdminRole;
