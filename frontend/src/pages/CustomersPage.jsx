import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer, fetchCustomers } from "../redux/customersSlice";
import Modal from "../components/ui/Modal";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
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

function NewCustomerModal({ open, onClose, onSubmit, loading }) {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    taxId: "",
    address: "",
  };
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;
    setForm(initialForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }));

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between p-1 mb-1">
        <div className="font-bold">Nuevo cliente</div>
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

        <Label>Email</Label>
        <Input value={form.email} onChange={set("email")} />

        <Label>Teléfono</Label>
        <Input value={form.phone} onChange={set("phone")} />

        <Label>CUIT/CUIL</Label>
        <Input value={form.taxId} onChange={set("taxId")} />

        <Label>Dirección</Label>
        <Input value={form.address} onChange={set("address")} />
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

export default function CustomersPage() {
  const dispatch = useDispatch();
  const { items, status, error, createStatus, createError } = useSelector(
    (s) => s.customers
  );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((c) => {
      const name = c.name || "";
      const email = c.email || "";
      const phone = c.phone || "";
      const taxId = c.tax_id || "";
      const address = c.address || "";
      return (
        name.toLowerCase().includes(term) ||
        email.toLowerCase().includes(term) ||
        phone.toLowerCase().includes(term) ||
        taxId.toLowerCase().includes(term) ||
        address.toLowerCase().includes(term)
      );
    });
  }, [items, search]);

  const onCreate = async (payload) => {
    await dispatch(createCustomer(payload)).unwrap();
    setOpen(false);
    dispatch(fetchCustomers());
  };

  return (
    <div className="grid gap-3">
      <Toolbar>
        <ToolbarTitle kicker="Directorio" title="Clientes" />
        <ToolbarActions>
          <SearchInput
            placeholder="Buscar por nombre, email, teléfono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <PrimaryButton onClick={() => setOpen(true)}>
            Nuevo cliente
          </PrimaryButton>
        </ToolbarActions>
      </Toolbar>

      {status === "loading" && <InfoAlert>Cargando clientes...</InfoAlert>}
      {error && <ErrorAlert>{error}</ErrorAlert>}

      <Pagination data={rows}>
        {(paginatedRows) => (
          <Table>
            <TableHeader>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Teléfono</TableHeaderCell>
              <TableHeaderCell>CUIT/CUIL</TableHeaderCell>
              <TableHeaderCell>Dirección</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {paginatedRows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email || "-"}</TableCell>
                  <TableCell>{c.phone || "-"}</TableCell>
                  <TableCell>{c.tax_id || "-"}</TableCell>
                  <TableCell>{c.address || "-"}</TableCell>
                </TableRow>
              ))}
              {!rows.length && status === "succeeded" && (
                <TableRow>
                  <TableCell colSpan={5}>Todavía no hay clientes.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Pagination>

      {createError && <ErrorAlert>{createError}</ErrorAlert>}

      <NewCustomerModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onCreate}
        loading={createStatus === "loading"}
      />
    </div>
  );
}
