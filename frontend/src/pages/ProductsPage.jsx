import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, fetchProducts } from "../redux/productsSlice";
import Modal from "../components/ui/Modal";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Select from "../components/ui/Select";
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

function NewProductModal({ open, onClose, onSubmit, loading }) {
  const initialForm = {
    sku: "",
    name: "",
    brand: "",
    description: "",
    stockQty: 0,
    price: 0,
    currency: "ARS",
  };
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;
    setForm(initialForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = (k) => (e) => {
    const value = e.target.value;
    setForm((v) => ({ ...v, [k]: value }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between p-1 mb-1">
        <div className="font-bold">Nuevo producto</div>
        <button
          type="button"
          className="border border-white/20 bg-white/[0.06] text-[#e8eefc] rounded-lg px-2.5 py-1.5 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 p-2">
        <Label>Nombre *</Label>
        <Input value={form.name} onChange={set("name")} />

        <Label>SKU</Label>
        <Input value={form.sku} onChange={set("sku")} />

        <Label>Marca</Label>
        <Input value={form.brand} onChange={set("brand")} />

        <Label>Descripción</Label>
        <textarea
          className="rounded-xl border border-white/12 bg-[rgba(0,0,0,0.22)] px-3 py-2.5 text-[#e8eefc] outline-none min-h-[50px] resize-y placeholder:text-white/50"
          value={form.description}
          onChange={set("description")}
        />

        <Label>Cantidad en stock</Label>
        <Input
          type="number"
          min="0"
          value={form.stockQty}
          onChange={set("stockQty")}
        />

        <Label>Precio</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={set("price")}
        />

        <Label>Moneda</Label>
        <Select value={form.currency} onChange={set("currency")}>
          <option value="ARS">ARS</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </Select>
      </div>

      <div className="flex justify-end gap-2.5 p-2">
        <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
        <PrimaryButton
          disabled={loading || !form.name.trim()}
          onClick={() => onSubmit(form)}
        >
          {loading ? "Creando..." : "Crear"}
        </PrimaryButton>
      </div>
    </Modal>
  );
}

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error, createStatus, createError } = useSelector(
    (s) => s.products
  );

  const [open, setOpen] = useState(false);
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

  const onCreate = async (payload) => {
    await dispatch(
      createProduct({
        sku: payload.sku || null,
        name: payload.name.trim(),
        brand: payload.brand || null,
        description: payload.description || null,
        stockQty: Number(payload.stockQty) || 0,
        price: Number(payload.price) || 0,
        currency: payload.currency || "ARS",
      })
    ).unwrap();
    setOpen(false);
    dispatch(fetchProducts());
  };

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
          <PrimaryButton onClick={() => setOpen(true)}>
            Nuevo producto
          </PrimaryButton>
        </ToolbarActions>
      </Toolbar>

      {status === "loading" && <InfoAlert>Cargando productos...</InfoAlert>}
      {error && <ErrorAlert>{error}</ErrorAlert>}

      <Table>
        <TableHeader>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>SKU</TableHeaderCell>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Marca</TableHeaderCell>
          <TableHeaderCell>Stock</TableHeaderCell>
          <TableHeaderCell>Precio</TableHeaderCell>
          <TableHeaderCell>Moneda</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {filteredItems.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.sku || "-"}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.brand || "-"}</TableCell>
              <TableCell>{p.stock_qty}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.currency}</TableCell>
            </TableRow>
          ))}
          {!filteredItems.length && status === "succeeded" && (
            <TableRow>
              <TableCell colSpan={7}>No hay productos aún.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {createError && <ErrorAlert>{createError}</ErrorAlert>}

      <NewProductModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onCreate}
        loading={createStatus === "loading"}
      />
    </div>
  );
}
