import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../redux/productsSlice";
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

export default function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((s) => s.products);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((p) => {
      const sku = p.sku || "";
      const name = p.name || "";
      const brand = p.brand || "";
      return (
        sku.toLowerCase().includes(term) ||
        name.toLowerCase().includes(term) ||
        brand.toLowerCase().includes(term)
      );
    });
  }, [items, search]);

  return (
    <div className="grid gap-3">
      <Toolbar>
        <ToolbarTitle kicker="Catálogo" title="Productos" />
        <ToolbarActions>
          <SearchInput
            placeholder="Buscar por nombre, SKU o marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <PrimaryButton onClick={() => navigate("/app/products/new")}>
            Nuevo producto
          </PrimaryButton>
        </ToolbarActions>
      </Toolbar>

      {status === "loading" && <InfoAlert>Cargando productos...</InfoAlert>}
      {error && <ErrorAlert>{error}</ErrorAlert>}

      <Table>
        <TableHeader>
          <TableHeaderCell>SKU</TableHeaderCell>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Marca</TableHeaderCell>
          <TableHeaderCell>Stock</TableHeaderCell>
          <TableHeaderCell>Precio</TableHeaderCell>
          <TableHeaderCell>Moneda</TableHeaderCell>
          <TableHeaderCell>IVA</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {filteredItems.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.sku || "-"}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.brand || "-"}</TableCell>
              <TableCell>{p.stock_qty}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.currency}</TableCell>
              <TableCell>
                {p.tax_rate !== null && p.tax_rate !== undefined
                  ? `${p.tax_rate}%`
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
          {!filteredItems.length && status === "succeeded" && (
            <TableRow>
              <TableCell colSpan={7}>No hay productos aún.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
