import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSupplier,
  fetchSuppliers,
  deleteSupplier,
} from "../redux/suppliersSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../components/ui/Modal";
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
} from "../components/ui/Button";
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
import ConfirmModal from "../components/ui/ConfirmModal";

function NewSupplierModal({ open, onClose, onSubmit, loading }) {
  const initialForm = {
    fantasyName: "",
    legalName: "",
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
        <div className="font-bold">Nuevo proveedor</div>
        <button
          type="button"
          className="border border-white/20 bg-white/[0.06] text-[#e8eefc] rounded-lg px-2.5 py-1.5 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 p-2">
        <Label>Nombre de Fantasía *</Label>
        <Input value={form.fantasyName} onChange={set("fantasyName")} />

        <Label>Razón Social</Label>
        <Input value={form.legalName} onChange={set("legalName")} />

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
          disabled={loading || !form.fantasyName.trim()}
          onClick={() => onSubmit(form)}
        >
          {loading ? "Creando..." : "Crear"}
        </PrimaryButton>
      </div>
    </Modal>
  );
}

export default function SuppliersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error, createStatus, createError } = useSelector(
    (s) => s.suppliers
  );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    supplierId: null,
    supplierName: "",
  });

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((s) => {
      const fantasyName = s.fantasy_name || "";
      const legalName = s.legal_name || "";
      const email = s.email || "";
      const phone = s.phone || "";
      const taxId = s.tax_id || "";
      const address = s.address || "";
      return (
        fantasyName.toLowerCase().includes(term) ||
        legalName.toLowerCase().includes(term) ||
        email.toLowerCase().includes(term) ||
        phone.toLowerCase().includes(term) ||
        taxId.toLowerCase().includes(term) ||
        address.toLowerCase().includes(term)
      );
    });
  }, [items, search]);

  const onCreate = async (payload) => {
    await dispatch(createSupplier(payload)).unwrap();
    setOpen(false);
    dispatch(fetchSuppliers());
  };

  const handleDelete = async () => {
    if (deleteModal.supplierId) {
      await dispatch(deleteSupplier(deleteModal.supplierId)).unwrap();
      setDeleteModal({ open: false, supplierId: null, supplierName: "" });
    }
  };

  return (
    <div className="grid gap-3">
      <Toolbar>
        <ToolbarTitle kicker="Directorio" title="Proveedores" />
        <ToolbarActions>
          <SearchInput
            placeholder="Buscar por nombre de fantasía, razón social, email, teléfono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <PrimaryButton onClick={() => setOpen(true)}>
            Nuevo proveedor
          </PrimaryButton>
        </ToolbarActions>
      </Toolbar>

      {status === "loading" && <InfoAlert>Cargando proveedores...</InfoAlert>}
      {error && <ErrorAlert>{error}</ErrorAlert>}

      <Pagination data={rows}>
        {(paginatedRows) => (
          <Table>
            <TableHeader>
              <TableHeaderCell>Nombre de Fantasía</TableHeaderCell>
              <TableHeaderCell>Razón Social</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Teléfono</TableHeaderCell>
              <TableHeaderCell>CUIT/CUIL</TableHeaderCell>
              <TableHeaderCell>Dirección</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {paginatedRows.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.fantasy_name}</TableCell>
                  <TableCell>{s.legal_name || "-"}</TableCell>
                  <TableCell>{s.email || "-"}</TableCell>
                  <TableCell>{s.phone || "-"}</TableCell>
                  <TableCell>{s.tax_id || "-"}</TableCell>
                  <TableCell>{s.address || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <SecondaryButton
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/suppliers/${s.id}/edit`);
                        }}
                      >
                        Editar
                      </SecondaryButton>
                      <DangerButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteModal({
                            open: true,
                            supplierId: s.id,
                            supplierName: s.fantasy_name,
                          });
                        }}
                      >
                        Eliminar
                      </DangerButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!rows.length && status === "succeeded" && (
                <TableRow>
                  <TableCell colSpan={7}>Todavía no hay proveedores.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Pagination>

      {createError && <ErrorAlert>{createError}</ErrorAlert>}

      <NewSupplierModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onCreate}
        loading={createStatus === "loading"}
      />

      <ConfirmModal
        open={deleteModal.open}
        onClose={() =>
          setDeleteModal({ open: false, supplierId: null, supplierName: "" })
        }
        onConfirm={handleDelete}
        title="Eliminar proveedor"
        message={`¿Estás seguro de que deseas eliminar el proveedor "${deleteModal.supplierName}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmVariant="danger"
      />
    </div>
  );
}

