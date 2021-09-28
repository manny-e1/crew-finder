import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Authenticated({ Component }) {
  const { currentUser } = useSelector((state) => state.userLogin);
  if (currentUser && currentUser.role !== 'ADMIN') return <Component />;
  else if (currentUser && currentUser.role === 'ADMIN')
    return <Redirect to="/admin" />;
  else return <Redirect to="/login" />;
}

export default Authenticated;
