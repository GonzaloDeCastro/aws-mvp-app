import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer, fetchCustomers } from "../redux/customersSlice";

function NewCustomerModal({ open, onClose, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    taxId: "",
    address: "",
  });

  useEffect(() => {
    if (!open) return;
    setForm({ name: "", email: "", phone: "", taxId: "", address: "" });
  }, [open]);

  if (!open) return null;

  const set = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }));

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div style={{ fontWeight: 700 }}>New customer</div>
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

          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            value={form.email}
            onChange={set("email")}
          />

          <label style={styles.label}>Phone</label>
          <input
            style={styles.input}
            value={form.phone}
            onChange={set("phone")}
          />

          <label style={styles.label}>Tax ID</label>
          <input
            style={styles.input}
            value={form.taxId}
            onChange={set("taxId")}
          />

          <label style={styles.label}>Address</label>
          <input
            style={styles.input}
            value={form.address}
            onChange={set("address")}
          />
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

export default function CustomersPage() {
  const dispatch = useDispatch();
  const { items, status, error, createStatus, createError } = useSelector(
    (s) => s.customers
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const rows = useMemo(() => items, [items]);

  const onCreate = async (payload) => {
    await dispatch(createCustomer(payload)).unwrap();
    setOpen(false);
    dispatch(fetchCustomers());
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={styles.toolbar}>
        <div>
          <div style={styles.kicker}>Directory</div>
          <h2 style={styles.h2}>Customers</h2>
        </div>

        <button style={styles.primaryBtn} onClick={() => setOpen(true)}>
          New customer
        </button>
      </div>

      {status === "loading" && <div style={styles.infoBox}>Loading...</div>}
      {error && <div style={styles.errorBox}>{error}</div>}

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Tax ID</th>
              <th style={styles.th}>Address</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td style={styles.td}>{c.id}</td>
                <td style={styles.td}>{c.name}</td>
                <td style={styles.td}>{c.email || "-"}</td>
                <td style={styles.td}>{c.phone || "-"}</td>
                <td style={styles.td}>{c.tax_id || "-"}</td>
                <td style={styles.td}>{c.address || "-"}</td>
              </tr>
            ))}
            {!rows.length && status === "succeeded" && (
              <tr>
                <td style={styles.td} colSpan={6}>
                  No customers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {createError && <div style={styles.errorBox}>{createError}</div>}

      <NewCustomerModal
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
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
  },
  kicker: { fontSize: 11, opacity: 0.7 },
  h2: { margin: 0, fontSize: 18 },

  card: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    fontSize: 12,
    opacity: 0.8,
    padding: "12px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  td: {
    padding: "12px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    fontSize: 13,
  },

  infoBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.18)",
  },
  errorBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,80,80,0.25)",
    background: "rgba(255,80,80,0.08)",
    color: "#ffd4d4",
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
  secondaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#e8eefc",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
  },
  iconBtn: {
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)",
    color: "#e8eefc",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "grid",
    placeItems: "center",
    padding: 16,
    zIndex: 50,
  },
  modal: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "#0b1220",
    padding: 14,
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 8,
    padding: 8,
  },
  label: { fontSize: 12, opacity: 0.75 },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.22)",
    color: "#e8eefc",
    outline: "none",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    padding: 8,
  },
};
