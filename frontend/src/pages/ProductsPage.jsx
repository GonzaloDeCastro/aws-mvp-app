import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, fetchProducts } from "../redux/productsSlice";

function NewProductModal({ open, onClose, onSubmit, loading }) {
  const [form, setForm] = useState({
    sku: "",
    name: "",
    brand: "",
    description: "",
    stockQty: 0,
    price: 0,
    currency: "USD",
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      sku: "",
      name: "",
      brand: "",
      description: "",
      stockQty: 0,
      price: 0,
      currency: "USD",
    });
  }, [open]);

  if (!open) return null;

  const set = (k) => (e) => {
    const value = e.target.value;
    setForm((v) => ({ ...v, [k]: value }));
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div style={{ fontWeight: 700 }}>New product</div>
          <button style={styles.iconBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={styles.formGrid}>
          <label style={styles.label}>Name *</label>
          <input
            style={styles.input}
            value={form.name}
            onChange={set("name")}
          />

          <label style={styles.label}>SKU</label>
          <input style={styles.input} value={form.sku} onChange={set("sku")} />

          <label style={styles.label}>Brand</label>
          <input
            style={styles.input}
            value={form.brand}
            onChange={set("brand")}
          />

          <label style={styles.label}>Description</label>
          <textarea
            style={{ ...styles.input, minHeight: 70, resize: "vertical" }}
            value={form.description}
            onChange={set("description")}
          />

          <label style={styles.label}>Stock quantity</label>
          <input
            style={styles.input}
            type="number"
            min="0"
            value={form.stockQty}
            onChange={set("stockQty")}
          />

          <label style={styles.label}>Price</label>
          <input
            style={styles.input}
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={set("price")}
          />

          <label style={styles.label}>Currency</label>
          <select
            style={styles.input}
            value={form.currency}
            onChange={set("currency")}
          >
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div style={styles.modalFooter}>
          <button style={styles.secondaryBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            style={styles.primaryBtn}
            disabled={loading || !form.name.trim()}
            onClick={() => onSubmit(form)}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error, createStatus, createError } = useSelector(
    (s) => s.products
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onCreate = async (payload) => {
    await dispatch(
      createProduct({
        sku: payload.sku || null,
        name: payload.name.trim(),
        brand: payload.brand || null,
        description: payload.description || null,
        stockQty: Number(payload.stockQty) || 0,
        price: Number(payload.price) || 0,
        currency: payload.currency || "USD",
      })
    ).unwrap();
    setOpen(false);
    dispatch(fetchProducts());
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={styles.toolbar}>
        <div>
          <div style={styles.kicker}>Catálogo</div>
          <h2 style={styles.h2}>Productos</h2>
        </div>

        <button style={styles.primaryBtn} onClick={() => setOpen(true)}>
          Nuevo producto
        </button>
      </div>

      {status === "loading" && (
        <div style={styles.infoBox}>Cargando productos...</div>
      )}
      {error && <div style={styles.errorBox}>{error}</div>}

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>SKU</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Marca</th>
              <th style={styles.th}>Stock</th>
              <th style={styles.th}>Precio</th>
              <th style={styles.th}>Moneda</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td style={styles.td}>{p.id}</td>
                <td style={styles.td}>{p.sku || "-"}</td>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>{p.brand || "-"}</td>
                <td style={styles.td}>{p.stock_qty}</td>
                <td style={styles.td}>{p.price}</td>
                <td style={styles.td}>{p.currency}</td>
              </tr>
            ))}
            {!items.length && status === "succeeded" && (
              <tr>
                <td style={styles.td} colSpan={7}>
                  No hay productos aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {createError && <div style={styles.errorBox}>{createError}</div>}

      <NewProductModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onCreate}
        loading={createStatus === "loading"}
      />
    </div>
  );
}

const styles = {
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 18,
    border: "1px solid rgba(15,23,42,0.06)",
    background: "#f9fafb",
    color: "#111827",
  },
  kicker: { fontSize: 11, opacity: 0.7 },
  h2: { margin: 0, fontSize: 18 },

  card: {
    borderRadius: 18,
    border: "1px solid rgba(15,23,42,0.06)",
    background: "#ffffff",
    overflow: "hidden",
    color: "#111827",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    fontSize: 12,
    opacity: 0.9,
    padding: "12px 12px",
    borderBottom: "1px solid rgba(15,23,42,0.08)",
  },
  td: {
    padding: "12px 12px",
    borderBottom: "1px solid rgba(15,23,42,0.06)",
    fontSize: 13,
  },
  infoBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(15,23,42,0.06)",
    background: "#f9fafb",
    color: "#111827",
  },
  errorBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(220,38,38,0.3)",
    background: "#fef2f2",
    color: "#b91c1c",
  },
  primaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(59,130,246,0.4)",
    background: "rgba(59,130,246,0.12)",
    color: "#1f2937",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
  },
  secondaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(148,163,184,0.7)",
    background: "#ffffff",
    color: "#111827",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
  },
  iconBtn: {
    border: "1px solid rgba(148,163,184,0.7)",
    background: "#ffffff",
    color: "#111827",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.55)",
    display: "grid",
    placeItems: "center",
    padding: 16,
    zIndex: 50,
  },
  modal: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 18,
    border: "1px solid rgba(15,23,42,0.12)",
    background: "#ffffff",
    padding: 16,
    color: "#111827",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    marginBottom: 4,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 8,
    padding: 8,
  },
  label: { fontSize: 12, opacity: 0.8 },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(148,163,184,0.7)",
    background: "#ffffff",
    color: "#111827",
    outline: "none",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    padding: 8,
  },
};
