import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuotes } from "../redux/quotesSlice";
import { PrimaryButton } from "../components/ui/Button";
import Toolbar, {
  ToolbarTitle,
  ToolbarActions,
} from "../components/ui/Toolbar";
import Table, {
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "../components/ui/Table";
import SearchInput from "../components/ui/SearchInput";
import { InfoAlert, ErrorAlert } from "../components/ui/Alert";
import Pagination from "../components/ui/Pagination";

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
    <div className="grid gap-3">
      <Toolbar>
        <ToolbarTitle kicker="Presupuestos" title="Listado" />
        <ToolbarActions>
          <SearchInput
            placeholder="Buscar por #, estado o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <PrimaryButton onClick={() => navigate("/app/quotes/new")}>
            Nuevo presupuesto
          </PrimaryButton>
        </ToolbarActions>
      </Toolbar>

      {listStatus === "loading" && (
        <InfoAlert>Cargando presupuestos...</InfoAlert>
      )}
      {listStatus === "failed" && <ErrorAlert>{listError}</ErrorAlert>}

      <Pagination data={filteredList}>
        {(paginatedList) => (
          <Table>
            <TableHeader>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Cliente</TableHeaderCell>
              <TableHeaderCell>Válido hasta</TableHeaderCell>
              <TableHeaderCell>Creado</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {paginatedList.map((q) => (
                <TableRow
                  key={q.id}
                  onClick={() => navigate(`/app/quotes/${q.id}`)}
                >
                  <TableCell>{q.quoteNumber}</TableCell>
                  <TableCell>{q.status}</TableCell>
                  <TableCell>{q.customer?.name || "-"}</TableCell>
                  <TableCell>
                    {q.validUntil
                      ? new Date(q.validUntil).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {q.createdAt ? new Date(q.createdAt).toLocaleString() : "-"}
                  </TableCell>
                  <TableCell>
                    {q.totalWithTax
                      ? `${Number(q.totalWithTax).toFixed(2)} ${q.currency}`
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
              {!filteredList.length && listStatus === "succeeded" && (
                <TableRow>
                  <TableCell colSpan={6}>No hay presupuestos aún.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Pagination>
    </div>
  );
}
