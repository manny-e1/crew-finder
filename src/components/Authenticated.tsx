import { FC, useEffect } from 'react';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../atoms/localStorageAtoms';
import { Role } from '../util/enums';

function Authenticated({ Component }: { Component: FC }) {
  const [currentUser] = useAtom(currentUserAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login');
    else if (currentUser && currentUser.role === Role.admin) navigate('/admin');
  }, [currentUser]);

  if (currentUser && currentUser.role !== Role.admin) return <Component />;
}

export default Authenticated;
