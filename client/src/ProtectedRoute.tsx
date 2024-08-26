import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './components/hooks/reduxHooks';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredId: number; // ID пользователя, которому разрешен доступ
}

export default function ProtectedRoute({ children, requiredId }: ProtectedRouteProps): JSX.Element {
  const user = useAppSelector((state) => state.auth.user);

  if (user.status !== 'logged' || user.id !== requiredId) {
    return <Navigate to="/" />;
  }

  return children;
}

export { ProtectedRoute };