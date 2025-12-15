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

  if (listStatus === "loading") return <div>Loading quotes…</div>;
  if (listStatus === "failed")
    return <div style={{ color: "crimson" }}>{listError}</div>;

  return (
    <div>
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
            <th>#</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Valid until</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {list.map((q) => (
            <tr
              key={q.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/app/quotes/${q.id}`)}
            >
              <td>{q.quoteNumber}</td>
              <td>{q.status}</td>
              <td>{q.customer?.name || "-"}</td>
              <td>
                {q.validUntil
                  ? new Date(q.validUntil).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                {q.createdAt ? new Date(q.createdAt).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
