import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuoteById } from "../redux/quotesSlice";
import { useParams } from "react-router-dom";

export default function QuoteDetailPage() {
  const { id } = useParams();
  const quoteId = Number(id);
  const dispatch = useDispatch();

  const quote = useSelector((s) => s.quotes.byId[quoteId]);
  const status = useSelector((s) => s.quotes.statusById[quoteId] || "idle");
  const error = useSelector((s) => s.quotes.errorById[quoteId] || "");

  useEffect(() => {
    if (status === "idle") dispatch(fetchQuoteById(quoteId));
  }, [dispatch, quoteId, status]);

  if (status === "loading") return <div>Loading quote…</div>;
  if (status === "failed")
    return <div style={{ color: "crimson" }}>{error}</div>;
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
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginBottom: 16,
          fontSize: 14,
        }}
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
