// src/components/ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // or wherever you store auth state

interface ProtectedRouteProps {
  requiredRole?: string;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading authentication...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && !user?.roles?.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  

  return <>{children}</>;
};

export default ProtectedRoute;
