import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logoPresuflow from "../assets/logo-presuflow.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { fetchCompany } from "../redux/companySlice";
import { CiLogout } from "react-icons/ci";
import ConfirmModal from "../components/ui/ConfirmModal";

export default function AppLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const company = useSelector((s) => s.company.current);
  const companyStatus = useSelector((s) => s.company.status);

  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const onLogout = () => {
    setShowLogoutModal(true);
  };

  useEffect(() => {
    if (companyStatus === "idle") {
      dispatch(fetchCompany());
    }
  }, [dispatch, companyStatus]);

  const handleLogoutConfirm = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-[#0b1220] text-[#e8eefc] font-[system-ui,-apple-system,'Segoe UI',Roboto,Arial]">
      <aside
        className="border-r border-white/10 p-3 flex flex-col gap-3 bg-[#0a1020] transition-[width] duration-150"
        style={{ width: collapsed ? 64 : 240 }}
      >
        <div className="flex items-center justify-center gap-2 py-2">
          {!collapsed && (
            <button
              type="button"
              className="p-0 border-none bg-transparent cursor-pointer"
              onClick={() => navigate("/app/company")}
            >
              <img
                src={
                  company?.logo
                    ? `data:image/png;base64,${company.logo}`
                    : logoPresuflow
                }
                alt={company?.name || "Logo"}
                className="h-[50px] object-contain"
              />
            </button>
          )}
        </div>

        <nav className="flex flex-col gap-1">
          <NavLink
            to="/app/products"
            className={({ isActive }) =>
              [
                "flex items-center text-sm gap-2 w-full px-3 py-2.5 rounded-xl border cursor-pointer no-underline",
                "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                isActive
                  ? "border-[rgba(120,160,255,0.6)] bg-[rgba(120,160,255,0.12)]"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            <span className="w-6 inline-flex justify-center">📦</span>
            {!collapsed && <span>Productos</span>}
          </NavLink>

          <NavLink
            to="/app/quotes"
            className={({ isActive }) =>
              [
                "flex items-center text-sm gap-2 w-full px-3 py-2.5 rounded-xl border cursor-pointer no-underline",
                "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                isActive
                  ? "border-[rgba(120,160,255,0.6)] bg-[rgba(120,160,255,0.12)]"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            <span className="w-6 inline-flex justify-center">🧾</span>
            {!collapsed && <span>Presupuestos</span>}
          </NavLink>

          <NavLink
            to="/app/customers"
            className={({ isActive }) =>
              [
                "flex items-center text-sm gap-2 w-full px-3 py-2.5 rounded-xl border cursor-pointer no-underline",
                "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                isActive
                  ? "border-[rgba(120,160,255,0.6)] bg-[rgba(120,160,255,0.12)]"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            <span className="w-6 inline-flex justify-center">👤</span>
            {!collapsed && <span>Clientes</span>}
          </NavLink>
        </nav>

        <div className="mt-auto flex flex-col gap-2 items-end">
          {!collapsed && user?.email && (
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-85 whitespace-nowrap">
                {user.email}
              </span>
              <button
                type="button"
                className="rounded-full border border-white/30 bg-white/[0.06] text-[#e8eefc] p-1.5 inline-flex items-center justify-center cursor-pointer"
                onClick={onLogout}
              >
                <CiLogout size={18} />
              </button>
            </div>
          )}
          {collapsed && (
            <button
              type="button"
              className="rounded-full border border-white/30 bg-white/[0.06] text-[#e8eefc] p-1.5 inline-flex items-center justify-center cursor-pointer"
              onClick={onLogout}
            >
              <CiLogout size={20} />
            </button>
          )}
          <button
            type="button"
            className="mt-1 px-2.5 py-2 rounded-lg border border-white/20 bg-white/[0.03] cursor-pointer"
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 flex flex-col gap-3 min-h-0 overflow-auto">
        <section className="p-1">{children}</section>
      </main>

      <ConfirmModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="Cerrar sesión"
        message="¿Estás seguro de que deseas cerrar sesión?"
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
        confirmVariant="danger"
      />
    </div>
  );
}
