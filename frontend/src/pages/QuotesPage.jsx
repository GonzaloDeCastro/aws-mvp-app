import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuotes } from "../redux/quotesSlice";

export default function QuotesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, listStatus, listError } = useSelector((s) => s.quotes);

  useEffect(() => {
    if (listStatus === "idle") {
      dispatch(fetchQuotes());
    }
  }, [dispatch, listStatus]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={styles.toolbar}>
        <div>
          <div style={styles.kicker}>Presupuestos</div>
          <h2 style={styles.h2}>Listado</h2>
        </div>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/app/quotes/new")}
        >
          Nuevo presupuesto
        </button>
      </div>

      {listStatus === "loading" && (
        <div style={styles.infoBox}>Cargando presupuestos...</div>
      )}
      {listStatus === "failed" && (
        <div style={styles.errorBox}>{listError}</div>
      )}

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Cliente</th>
              <th style={styles.th}>Válido hasta</th>
              <th style={styles.th}>Creado</th>
            </tr>
          </thead>
          <tbody>
            {list.map((q) => (
              <tr
                key={q.id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/app/quotes/${q.id}`)}
              >
                <td style={styles.td}>{q.quoteNumber}</td>
                <td style={styles.td}>{q.status}</td>
                <td style={styles.td}>{q.customer?.name || "-"}</td>
                <td style={styles.td}>
                  {q.validUntil
                    ? new Date(q.validUntil).toLocaleDateString()
                    : "-"}
                </td>
                <td style={styles.td}>
                  {q.createdAt ? new Date(q.createdAt).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
            {!list.length && listStatus === "succeeded" && (
              <tr>
                <td style={styles.td} colSpan={5}>
                  No hay presupuestos aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
};
