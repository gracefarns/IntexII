import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  requiredRole: string;
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roles: string[] = user.roles || [];

  const hasAccess = roles.includes(requiredRole);

  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
