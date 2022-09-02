import { FC, ReactElement, useEffect } from 'react';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../atoms/localStorageAtoms';
import { Role } from '../enums/enums';
import Header from './Header';

function Authenticated({ Component }: { Component: FC }) {
  const [currentUser] = useAtom(currentUserAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login');
    else if (currentUser && currentUser.role === Role.admin) navigate('/admin');
  }, [currentUser]);

  if (currentUser && currentUser.role !== Role.admin)
    return (
      <>
        <Header />
        <Component />;
      </>
    );
  return <></>;
}

export default Authenticated;
