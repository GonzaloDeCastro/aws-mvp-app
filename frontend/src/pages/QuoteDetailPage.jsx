import { useEffect, useState } from "react";
import { apiGet } from "../api";

export default function QuoteDetailPage({ quoteId }) {
  const [quote, setQuote] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setStatus({ loading: true, error: "" });
        const json = await apiGet(`/quotes/${quoteId}`);
        if (!alive) return;
        setQuote(json.data);
        setStatus({ loading: false, error: "" });
      } catch (e) {
        if (!alive) return;
        setStatus({
          loading: false,
          error: e.message || "Error loading quote",
        });
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [quoteId]);

  if (status.loading) return <div>Loading quote…</div>;
  if (status.error)
    return <div style={{ color: "crimson" }}>{status.error}</div>;
  if (!quote) return null;

  const total = quote.items.reduce((acc, i) => acc + Number(i.line_total), 0);

  return (
    <div>
      <section style={{ marginBottom: 24 }}>
        <h2>Quote #{quote.quoteNumber}</h2>
        <div>Status: {quote.status}</div>
        <div>
          Valid until: {new Date(quote.validUntil).toLocaleDateString()}
        </div>
      </section>

      <section style={{ display: "flex", gap: 40, marginBottom: 24 }}>
        <div>
          <h4>Company</h4>
          <div>{quote.company.name}</div>
          <div>{quote.company.address}</div>
          <div>{quote.company.email}</div>
        </div>

        <div>
          <h4>Customer</h4>
          <div>{quote.customer?.name}</div>
          <div>{quote.customer?.address}</div>
          <div>{quote.customer?.email}</div>
        </div>
      </section>

      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%", marginBottom: 16 }}
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {quote.items.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", opacity: 0.6 }}>
                No items
              </td>
            </tr>
          )}

          {quote.items.map((i) => (
            <tr key={i.id}>
              <td>{i.item_name}</td>
              <td>{i.quantity}</td>
              <td>{i.unit_price}</td>
              <td>{i.line_total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "right", fontWeight: 600 }}>
        Total: {total} {quote.currency}
      </div>
    </div>
  );
}
