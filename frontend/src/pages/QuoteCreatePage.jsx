import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../redux/customersSlice";
import { fetchProducts } from "../redux/productsSlice";
import { createQuote } from "../redux/quotesSlice";
import { useNavigate } from "react-router-dom";

export default function QuoteCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customers = useSelector((s) => s.customers.items);
  const customersStatus = useSelector((s) => s.customers.status);

  const products = useSelector((s) => s.products.items);
  const productsStatus = useSelector((s) => s.products.status);

  const [customerId, setCustomerId] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [validUntil, setValidUntil] = useState("");
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState([
    { productId: "", quantity: 1, unitPrice: "", discountPct: 0 },
  ]);

  useEffect(() => {
    if (customersStatus === "idle") dispatch(fetchCustomers());
  }, [dispatch, customersStatus]);

  useEffect(() => {
    if (productsStatus === "idle") dispatch(fetchProducts());
  }, [dispatch, productsStatus]);

  const updateItem = (index, patch) => {
    setItems((prev) =>
      prev.map((it, idx) => (idx === index ? { ...it, ...patch } : it))
    );
  };

  const handleProductChange = (index, productId) => {
    const p = products.find((prod) => prod.id === Number(productId));
    const patch = { productId };
    if (p) {
      patch.unitPrice = p.price;
    }
    updateItem(index, patch);
  };

  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      { productId: "", quantity: 1, unitPrice: "", discountPct: 0 },
    ]);
  };

  const removeItemRow = (index) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const onCreate = async () => {
    const preparedItems = items
      .map((it, idx) => ({
        productId: it.productId ? Number(it.productId) : null,
        quantity: Number(it.quantity) || 0,
        unitPrice: Number(it.unitPrice) || 0,
        currency,
        discountPct: Number(it.discountPct) || 0,
        sortOrder: idx + 1,
      }))
      .filter((it) => it.productId && it.quantity > 0);

    if (preparedItems.length === 0) {
      alert("Please add at least one item with product and quantity.");
      return;
    }

    const data = await dispatch(
      createQuote({
        customerId: customerId ? Number(customerId) : null,
        currency,
        validUntil: validUntil || null,
        notes: notes || null,
        items: preparedItems,
      })
    ).unwrap();

    navigate(`/app/quotes/${data.id}`);
  };

  const isLoadingLookups =
    customersStatus === "loading" || productsStatus === "loading";

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div>
            <div style={styles.kicker}>Quotes</div>
            <h2 style={styles.h2}>New quote</h2>
          </div>
          <button
            style={styles.primaryBtn}
            onClick={onCreate}
            disabled={isLoadingLookups}
          >
            {isLoadingLookups ? "Loading..." : "Create"}
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

      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div>
            <div style={styles.kicker}>Items</div>
            <h2 style={styles.h2}>Quote items</h2>
          </div>
          <button style={styles.secondaryBtn} onClick={addItemRow}>
            Add item
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="8"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: 14,
            }}
          >
            <thead>
              <tr>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Unit price</th>
                <th style={styles.th}>Discount %</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={idx}>
                  <td>
                    <select
                      style={styles.input}
                      value={it.productId}
                      onChange={(e) => handleProductChange(idx, e.target.value)}
                    >
                      <option value="">Select product...</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} {p.brand ? `(${p.brand})` : ""}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      style={styles.input}
                      type="number"
                      min="1"
                      value={it.quantity}
                      onChange={(e) =>
                        updateItem(idx, { quantity: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={styles.input}
                      type="number"
                      min="0"
                      step="0.01"
                      value={it.unitPrice}
                      onChange={(e) =>
                        updateItem(idx, { unitPrice: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={styles.input}
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={it.discountPct}
                      onChange={(e) =>
                        updateItem(idx, { discountPct: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button
                      style={styles.smallDangerBtn}
                      type="button"
                      onClick={() => removeItemRow(idx)}
                      disabled={items.length === 1}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  secondaryBtn: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#e8eefc",
    cursor: "pointer",
    fontSize: 12,
  },
  smallDangerBtn: {
    padding: "6px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,100,100,0.6)",
    background: "rgba(255,100,100,0.1)",
    color: "#ffaaaa",
    cursor: "pointer",
    fontSize: 12,
  },
  th: {
    textAlign: "left",
    fontSize: 12,
    opacity: 0.8,
  },
};
