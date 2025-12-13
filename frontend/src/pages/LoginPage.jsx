import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import presupuestoLogo from "../assets/presupuesto.png";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("gonza@demo.com");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) navigate("/app/products", { replace: true });
  }, [token, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <header style={styles.header}>
          <img
            src={presupuestoLogo}
            alt="Logo"
            style={{ width: 32, height: 32 }}
          />
          <div>
            <div style={styles.appName}>Presupuestos</div>
            <div style={styles.subTitle}>Sign in to continue</div>
          </div>
        </header>

        <form onSubmit={onSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            type="password"
          />

          <button
            style={styles.button}
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Signing in..." : "Sign in"}
          </button>

          {error && <div style={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#0b1220",
    color: "#e8eefc",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.03)",
    padding: 18,
  },
  header: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    background: "rgba(0,0,0,0.18)",
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: 14,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 14,
    background:
      "linear-gradient(135deg, rgba(120,160,255,1), rgba(80,220,200,1))",
  },
  appName: { fontWeight: 800, letterSpacing: 0.2 },
  subTitle: { fontSize: 12, opacity: 0.75 },
  form: { display: "grid", gap: 10, padding: 6 },
  label: { fontSize: 12, opacity: 0.75 },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.22)",
    color: "#e8eefc",
    outline: "none",
  },
  button: {
    marginTop: 6,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(120,160,255,0.22)",
    color: "#e8eefc",
    cursor: "pointer",
    fontWeight: 700,
  },
  error: { marginTop: 6, color: "crimson", fontSize: 13 },
};
