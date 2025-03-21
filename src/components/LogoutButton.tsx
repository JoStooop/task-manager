import { useAppDispatch } from '../hooks';
import { logout } from '../feature/auth/authActions.ts';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return <button onClick={handleLogout}>Logout</button>;
};
