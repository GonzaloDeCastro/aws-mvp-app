import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuotes } from "../redux/quotesSlice";

export default function QuotesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, listStatus, listError } = useSelector((s) => s.quotes);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (listStatus === "idle") {
      dispatch(fetchQuotes());
    }
  }, [dispatch, listStatus]);

  const filteredList = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return list;
    return list.filter((q) => {
      const num = (q.quoteNumber ?? "").toString();
      const status = q.status || "";
      const customer = q.customer?.name || "";
      return (
        num.toLowerCase().includes(term) ||
        status.toLowerCase().includes(term) ||
        customer.toLowerCase().includes(term)
      );
    });
  }, [list, search]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={styles.toolbar}>
        <div>
          <div style={styles.kicker}>Presupuestos</div>
          <h2 style={styles.h2}>Listado</h2>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            style={styles.searchInput}
            placeholder="Buscar por #, estado o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/app/quotes/new")}
          >
            Nuevo presupuesto
          </button>
        </div>
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
            {filteredList.map((q) => (
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
            {!filteredList.length && listStatus === "succeeded" && (
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
  searchInput: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.22)",
    color: "#e8eefc",
    outline: "none",
    fontSize: 13,
    minWidth: 220,
  },
};
