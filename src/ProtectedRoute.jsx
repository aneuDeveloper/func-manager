import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "./AppContext";

export function ProtectedRoute() {
  const { isAuthenticated } = useAppContext();

  if (isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
