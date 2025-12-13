import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth() {
  const token = useSelector((s) => s.auth.token);
  const isAuthenticated = Boolean(token);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
