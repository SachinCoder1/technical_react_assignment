import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { Children } from '../types';

const PrivateRoute = ({ children }: Children) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
