import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Authenticated({ Component }) {
  const { currentUser } = useSelector((state) => state.userLogin);
  if (currentUser && currentUser.role !== 'ADMIN') return <Component />;
  else if (currentUser && currentUser.role === 'ADMIN')
    return <Navigate to="/admin" />;
  else return <Navigate to="/login" />;
}

export default Authenticated;
