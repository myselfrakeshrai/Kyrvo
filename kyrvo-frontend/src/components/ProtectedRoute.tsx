import { Navigate, Outlet } from 'react-router-dom';
import { User } from 'src/models';

interface ProtectedRouteProps {
  user: User | undefined;
  redirectPath?: string;
}
function ProtectedRoute({
  user,
  redirectPath = '/login',
}: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
