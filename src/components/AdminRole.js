import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AdminRole({ Component }) {
  const { currentUser } = useSelector((state) => state.userLogin);
  if (!currentUser) return <Navigate to="/login" />;
  else if (currentUser && currentUser?.role === 'ADMIN') return <Component />;
  else return <Navigate to="/" />;
}

export default AdminRole;
