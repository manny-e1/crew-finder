import { useAtom } from 'jotai';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUserAtom } from '../atoms/localStorageAtoms';
import { Role } from '../enums/enums';

function AdminRole({ Component }: { Component: FC }) {
  const navigate = useNavigate();
  const [currentUser] = useAtom(currentUserAtom);
  useEffect(() => {
    if (!currentUser) navigate('/login');
    else if (currentUser.role !== Role.admin) navigate('/');
  }, []);
  if (currentUser?.role === Role.admin) return <Component />;
}

export default AdminRole;
