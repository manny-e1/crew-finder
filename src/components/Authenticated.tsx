import { FC, useEffect } from 'react';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../atoms/localStorageAtoms';

function Authenticated({ Component }: { Component: FC }) {
  const [currentUser] = useAtom(currentUserAtom);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);

  useEffect(() => {
    if (!currentUser) navigate('/login');
    else if (currentUser && currentUser.role === 'ADMIN') navigate('/admin');
    else if (currentUser && location.pathname === '/login') navigate('/');
  }, [currentUser]);

  if (currentUser && currentUser.role !== 'ADMIN') return <Component />;
}

export default Authenticated;
