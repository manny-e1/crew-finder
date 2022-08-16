import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../atoms/localStorageAtoms';

function Authenticated({ Component }: { Component: FC }) {
  const [currentUser] = useAtom(currentUserAtom);

  if (currentUser && currentUser.role !== 'ADMIN') return <Component />;
  else if (currentUser && currentUser.role === 'ADMIN')
    return <Navigate to="/admin" />;
  else return <Navigate to="/login" />;
}

export default Authenticated;
