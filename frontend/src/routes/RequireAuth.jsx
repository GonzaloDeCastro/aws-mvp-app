import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  // TODO: replace with real auth from Redux later
  const isAuthenticated = true;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
