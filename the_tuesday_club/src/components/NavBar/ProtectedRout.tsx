import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


type ProtectedRouteProps = {
  children: ReactNode;
  requireSuperuser?: boolean;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, requireSuperuser = false }) => {
  const { user } = useAuth();

  if (!user || !user.isAuthenticated) {
    // Hvis brugeren ikke er logget ind, omdiriger
    return <Navigate to="/" />;
  }

  if (requireSuperuser && !user.isSuperuser) {
    // Hvis superuser er påkrævet, men brugeren ikke er superuser, omdiriger
    return <Navigate to="/" />;
  }

  // Hvis adgang er tilladt, vis chilsdresn
  return <>{children}</>;
};

export default ProtectedRoute;
