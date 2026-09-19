import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Permission, User } from 'src/models';

interface ProtectedPermissionRouteProps {
  user: User | undefined;
  redirectPath?: string;
  permissions: Permission[];
  level: number;
  feature: string;
  children: ReactNode;
}
function ProtectedPermissionRoute({
  user,
  permissions,
  level,
  feature,
  redirectPath = '/error?error=403&message=no permission',
  children,
}: ProtectedPermissionRouteProps) {
  if (
    !(
      user &&
      permissions?.find(
        (x) => x.FeatureId === feature && x.PermissionLevel >= level,
      )
    )
  ) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedPermissionRoute;
