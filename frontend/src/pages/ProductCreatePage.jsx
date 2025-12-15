import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../redux/productsSlice";

export default function ProductCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createStatus, createError } = useSelector((s) => s.products);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    brand: "",
    description: "",
    stockQty: 0,
    price: 0,
    currency: "ARS",
  });

  const set = (k) => (e) => {
    const value = e.target.value;
    setForm((v) => ({ ...v, [k]: value }));
  };

  const onCreate = async () => {
    await dispatch(
      createProduct({
        sku: form.sku || null,
        name: form.name.trim(),
        brand: form.brand || null,
        description: form.description || null,
        stockQty: Number(form.stockQty) || 0,
        price: Number(form.price) || 0,
        currency: form.currency || "ARS",
      })
    ).unwrap();

    navigate("/app/products");
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
            <div style={styles.kicker}>Productos</div>
            <h2 style={styles.h2}>Nuevo producto</h2>
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
            placeholder="Nombre del producto"
          />

          <label style={styles.label}>SKU</label>
          <input
            style={styles.input}
            value={form.sku}
            onChange={set("sku")}
            placeholder="SKU opcional"
          />

          <label style={styles.label}>Marca</label>
          <input
            style={styles.input}
            value={form.brand}
            onChange={set("brand")}
            placeholder="Marca opcional"
          />

          <label style={styles.label}>Descripción</label>
          <textarea
            style={{ ...styles.input, minHeight: 80, resize: "vertical" }}
            value={form.description}
            onChange={set("description")}
            placeholder="Descripción opcional"
          />

          <label style={styles.label}>Cantidad en stock</label>
          <input
            style={styles.input}
            type="number"
            min="0"
            value={form.stockQty}
            onChange={set("stockQty")}
          />

          <label style={styles.label}>Precio</label>
          <input
            style={styles.input}
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={set("price")}
          />

          <label style={styles.label}>Moneda</label>
          <select
            style={styles.input}
            value={form.currency}
            onChange={set("currency")}
          >
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
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
