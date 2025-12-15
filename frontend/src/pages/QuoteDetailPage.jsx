import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuoteById } from "../redux/quotesSlice";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const exportPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Quote #${quote.quoteNumber}`, 14, 20);

    doc.setFontSize(11);
    doc.text(`Status: ${quote.status}`, 14, 28);
    if (quote.validUntil) {
      doc.text(
        `Valid until: ${new Date(quote.validUntil).toLocaleDateString()}`,
        14,
        34
      );
    }

    let y = 44;
    doc.setFontSize(12);
    doc.text("Company", 14, y);
    doc.text("Customer", 110, y);
    y += 6;

    doc.setFontSize(10);
    doc.text(quote.company.name || "", 14, y);
    doc.text(quote.customer?.name || "", 110, y);
    y += 5;
    doc.text(quote.company.address || "", 14, y);
    doc.text(quote.customer?.address || "", 110, y);
    y += 5;
    doc.text(quote.company.email || "", 14, y);
    doc.text(quote.customer?.email || "", 110, y);

    const itemRows = quote.items.map((i) => [
      i.item_name,
      String(i.quantity),
      String(i.unit_price),
      String(i.line_total),
    ]);

    autoTable(doc, {
      startY: y + 10,
      head: [["Item", "Qty", "Unit price", "Total"]],
      body: itemRows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 40, 60] },
    });

    const finalY = doc.lastAutoTable.finalY || y + 20;
    doc.setFontSize(12);
    doc.text(`Total: ${total} ${quote.currency}`, 14, finalY + 10);

    doc.save(`quote-${quote.quoteNumber || quote.id}.pdf`);
  };

  return (
    <div>
      <section
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Quote #{quote.quoteNumber}</h2>
          <div>Status: {quote.status}</div>
          <div>
            Valid until: {new Date(quote.validUntil).toLocaleDateString()}
          </div>
        </div>
        <button
          onClick={exportPdf}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "#e8eefc",
            cursor: "pointer",
          }}
        >
          Export PDF
        </button>
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
