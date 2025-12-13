import { Outlet, useLocation } from "react-router-dom";
import AppLayout from "./AppLayout";

function getTitle(pathname) {
  if (pathname.startsWith("/app/products")) return "Products";
  if (pathname.startsWith("/app/quotes")) return "Quote";
  return "Dashboard";
}

export default function AppShell() {
  const { pathname } = useLocation();
  const title = getTitle(pathname);

  return (
    <AppLayout title={title}>
      <Outlet />
    </AppLayout>
  );
}
