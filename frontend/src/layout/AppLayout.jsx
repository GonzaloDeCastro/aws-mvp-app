import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logoPresuflow from "../assets/logo-presuflow.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { fetchCompany } from "../redux/companySlice";
import { CiLogout } from "react-icons/ci";
import ConfirmModal from "../components/ui/ConfirmModal";
import { API_BASE_URL } from "../config";

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

          <NavLink
            to="/app/suppliers"
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
            <span className="w-6 inline-flex justify-center">🏭</span>
            {!collapsed && <span>Proveedores</span>}
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
        {user && !user.emailVerified && <EmailVerificationBanner user={user} />}
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

// Componente para mostrar banner de verificación de email
function EmailVerificationBanner({ user }) {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [dismissed, setDismissed] = useState(false);

  const handleResend = async () => {
    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (!res.ok) {
        throw new Error("Error al reenviar el email");
      }

      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (dismissed) return null;

  return (
    <div className="p-3 rounded-[14px] border border-[rgba(255,193,7,0.4)] bg-[rgba(255,193,7,0.1)] text-[#ffd700]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="font-semibold text-sm mb-1">
            ⚠️ Verifica tu correo electrónico
          </div>
          <div className="text-xs opacity-90">
            Por favor verifica tu correo electrónico para acceder a todas las
            funcionalidades. Revisa tu bandeja de entrada.
          </div>
          {status === "success" && (
            <div className="text-xs mt-2 text-green-300">
              ✓ Email de verificación enviado. Revisa tu bandeja de entrada.
            </div>
          )}
          {status === "error" && (
            <div className="text-xs mt-2 text-red-300">
              ✗ Error al enviar el email. Intenta nuevamente.
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleResend}
            disabled={status === "loading"}
            className="px-3 py-1.5 text-xs rounded-lg border border-[rgba(255,193,7,0.5)] bg-[rgba(255,193,7,0.15)] hover:bg-[rgba(255,193,7,0.25)] disabled:opacity-50 cursor-pointer"
          >
            {status === "loading" ? "Enviando..." : "Reenviar email"}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="px-2 py-1 text-xs opacity-70 hover:opacity-100 cursor-pointer"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
