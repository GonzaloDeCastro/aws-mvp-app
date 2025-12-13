import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoPresuflow from "../assets/logo-presuflow.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

export default function AppLayout({ title, children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={styles.shell}>
      <aside style={{ ...styles.sidebar, width: collapsed ? 64 : 240 }}>
        <div style={styles.brand}>
          {!collapsed && (
            <span style={styles.brandText}>
              {" "}
              <img src={logoPresuflow} alt="Logo" style={{ height: 50 }} />
            </span>
          )}
        </div>

        <nav style={styles.nav}>
          <NavLink
            to="/app/products"
            style={({ isActive }) => ({
              ...styles.navItem,
              border: isActive
                ? "1px solid rgba(120,160,255,0.6)"
                : styles.navItem.border,
              background: isActive
                ? "rgba(120,160,255,0.12)"
                : styles.navItem.background,
            })}
          >
            <span style={styles.navIcon}>📦</span>
            {!collapsed && <span>Products</span>}
          </NavLink>

          <NavLink
            to="/app/quotes/2"
            style={({ isActive }) => ({
              ...styles.navItem,
              border: isActive
                ? "1px solid rgba(120,160,255,0.6)"
                : styles.navItem.border,
              background: isActive
                ? "rgba(120,160,255,0.12)"
                : styles.navItem.background,
            })}
          >
            <span style={styles.navIcon}>🧾</span>
            {!collapsed && <span>Quotes</span>}
          </NavLink>

          <NavLink
            to="/app/customers"
            style={({ isActive }) => ({
              ...styles.navItem,
              border: isActive
                ? "1px solid rgba(120,160,255,0.6)"
                : styles.navItem.border,
              background: isActive
                ? "rgba(120,160,255,0.12)"
                : styles.navItem.background,
            })}
          >
            <span style={styles.navIcon}>👤</span>
            {!collapsed && <span>Customers</span>}
          </NavLink>
        </nav>

        <div style={styles.sidebarFooter}>
          <button
            style={styles.collapseBtn}
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <div style={styles.kicker}>Dashboard</div>
            <h1 style={styles.title}>{title}</h1>
          </div>

          <div style={styles.headerRight}>
            <input style={styles.search} placeholder="Search..." />

            {!collapsed && user?.email && (
              <span style={styles.userEmail}>{user.email}</span>
            )}

            <button style={styles.secondaryBtn} onClick={onLogout}>
              Logout
            </button>

            <button style={styles.primaryBtn}>New</button>
          </div>
        </header>

        <section style={styles.content}>{children}</section>
      </main>
    </div>
  );
}

const styles = {
  shell: {
    display: "flex",
    height: "100vh",
    background: "#0b1220",
    color: "#e8eefc",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },

  sidebar: {
    borderRight: "1px solid rgba(255,255,255,0.08)",
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    background: "#0a1020",
  },
  brand: { display: "flex", alignItems: "center", gap: 10, padding: "8px 6px" },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 10,
    background:
      "linear-gradient(135deg, rgba(120,160,255,1), rgba(80,220,200,1))",
  },
  brandText: { fontWeight: 700, letterSpacing: 0.3 },
  nav: { display: "flex", flexDirection: "column", gap: 6 },
  navItem: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    gap: 10,
    width: "100%",
    padding: "10px 10px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.03)",
    color: "inherit",
    cursor: "pointer",
    textAlign: "left",
    textDecoration: "none",
  },
  navIcon: { width: 24, display: "inline-flex", justifyContent: "center" },
  sidebarFooter: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "flex-end",
  },
  collapseBtn: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    color: "inherit",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    minHeight: 0, // clave para evitar overflow fantasma
    overflow: "auto", // scroll solo dentro del main si hace falta
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
  },

  kicker: { fontSize: 11, opacity: 0.7 },

  title: { margin: 0, fontSize: 20 },
  headerRight: { display: "flex", alignItems: "center", gap: 10 },
  search: {
    width: 240,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.2)",
    color: "#e8eefc",
    outline: "none",
  },
  primaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(120,160,255,0.2)",
    color: "#e8eefc",
    cursor: "pointer",
    fontWeight: 600,
  },
  content: { padding: 4 },
  userEmail: { fontSize: 12, opacity: 0.85, whiteSpace: "nowrap" },
  secondaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#e8eefc",
    cursor: "pointer",
    fontWeight: 600,
  },
};
