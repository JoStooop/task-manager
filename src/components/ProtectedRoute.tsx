import { FC, JSX } from 'react';
import { useAppSelector } from '../hooks';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/reducers';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  console.log('Token in ProtectedRoute:', token);

  if (!token) return <Navigate to="/login" />;

  return children;
};
