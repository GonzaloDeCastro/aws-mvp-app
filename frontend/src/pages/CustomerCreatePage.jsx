import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../redux/customersSlice";

export default function CustomerCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createStatus, createError } = useSelector((s) => s.customers);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    taxId: "",
    address: "",
  });

  const set = (k) => (e) => {
    const value = e.target.value;
    setForm((v) => ({ ...v, [k]: value }));
  };

  const onCreate = async () => {
    await dispatch(
      createCustomer({
        name: form.name.trim(),
        email: form.email || null,
        phone: form.phone || null,
        taxId: form.taxId || null,
        address: form.address || null,
      })
    ).unwrap();

    navigate("/app/customers");
  };

  const disabled =
    !form.name.trim() ||
    createStatus === "loading" ||
    createStatus === "succeeded";

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div>
            <div style={styles.kicker}>Clientes</div>
            <h2 style={styles.h2}>Nuevo cliente</h2>
          </div>
          <button
            style={styles.primaryBtn}
            onClick={onCreate}
            disabled={disabled}
          >
            {createStatus === "loading" ? "Creando..." : "Crear"}
          </button>
        </div>

        <div style={styles.grid}>
          <label style={styles.label}>Nombre *</label>
          <input
            style={styles.input}
            value={form.name}
            onChange={set("name")}
            placeholder="Nombre del cliente"
          />

          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            value={form.email}
            onChange={set("email")}
            placeholder="Email opcional"
          />

          <label style={styles.label}>Teléfono</label>
          <input
            style={styles.input}
            value={form.phone}
            onChange={set("phone")}
            placeholder="Teléfono opcional"
          />

          <label style={styles.label}>CUIT/CUIL</label>
          <input
            style={styles.input}
            value={form.taxId}
            onChange={set("taxId")}
            placeholder="CUIT/CUIL opcional"
          />

          <label style={styles.label}>Dirección</label>
          <input
            style={styles.input}
            value={form.address}
            onChange={set("address")}
            placeholder="Dirección opcional"
          />
        </div>

        {createError && <div style={styles.errorBox}>{createError}</div>}
      </div>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    padding: 16,
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  kicker: { fontSize: 11, opacity: 0.7 },
  h2: { margin: 0, fontSize: 18 },
  grid: { display: "grid", gap: 8 },
  label: { fontSize: 12, opacity: 0.75 },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.22)",
    color: "#e8eefc",
    outline: "none",
  },
  primaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(120,160,255,0.22)",
    color: "#e8eefc",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
  },
  errorBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    border: "1px solid rgba(255,80,80,0.4)",
    background: "rgba(255,80,80,0.12)",
    color: "#ffd4d4",
    fontSize: 13,
  },
};
