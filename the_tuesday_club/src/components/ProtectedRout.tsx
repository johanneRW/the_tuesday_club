import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireSuperuser?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireSuperuser = false }) => {
  const { user } = useAuth();

  if (!user || !user.isAuthenticated) {
    // Hvis brugeren ikke er logget ind, omdiriger til login
    return <Navigate to="/login" />;
  }

  if (requireSuperuser && !user.isSuperuser) {
    // Hvis superuser er påkrævet, men brugeren ikke er superuser, omdiriger
    return <Navigate to="/" />;
  }

  // Hvis adgang er tilladt, vis børnene
  return <>{children}</>;
};

export default ProtectedRoute;
