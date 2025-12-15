import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../redux/customersSlice";
import { createQuote } from "../redux/quotesSlice";
import { useNavigate } from "react-router-dom";

export default function QuoteCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customers = useSelector((s) => s.customers.items);
  const customersStatus = useSelector((s) => s.customers.status);

  const [customerId, setCustomerId] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [validUntil, setValidUntil] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (customersStatus === "idle") dispatch(fetchCustomers());
  }, [dispatch, customersStatus]);

  const onCreate = async () => {
    const data = await dispatch(
      createQuote({
        customerId: customerId ? Number(customerId) : null,
        currency,
        validUntil: validUntil || null,
        notes: notes || null,
      })
    ).unwrap();

    navigate(`/app/quotes/${data.id}`);
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div>
            <div style={styles.kicker}>Quotes</div>
            <h2 style={styles.h2}>New quote</h2>
          </div>
          <button style={styles.primaryBtn} onClick={onCreate}>
            Create
          </button>
        </div>

        <div style={styles.grid}>
          <label style={styles.label}>Customer</label>
          <select
            style={styles.input}
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">(No customer)</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <label style={styles.label}>Currency</label>
          <select
            style={styles.input}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
            <option value="EUR">EUR</option>
          </select>

          <label style={styles.label}>Valid until</label>
          <input
            style={styles.input}
            type="date"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
          />

          <label style={styles.label}>Notes</label>
          <textarea
            style={{ ...styles.input, minHeight: 90, resize: "vertical" }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes..."
          />
        </div>
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
};
