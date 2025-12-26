import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSupplierById,
  updateSupplier,
  resetCreateStatus,
} from "../redux/suppliersSlice";
import Card from "../components/ui/Card";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { ErrorAlert } from "../components/ui/Alert";

export default function SupplierEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const supplierId = Number(id);

  // Resetear el estado cuando se monta el componente
  useEffect(() => {
    dispatch(resetCreateStatus());
  }, [dispatch]);

  const supplier = useSelector((s) =>
    s.suppliers.items.find((s) => s.id === supplierId)
  );
  const { createStatus, createError } = useSelector((s) => s.suppliers);
  const updateStatus = createStatus; // Reutilizar createStatus para update

  const [form, setForm] = useState({
    fantasyName: "",
    legalName: "",
    email: "",
    phone: "",
    taxId: "",
    address: "",
  });

  useEffect(() => {
    if (supplier) {
      setForm({
        fantasyName: supplier.fantasy_name || "",
        legalName: supplier.legal_name || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        taxId: supplier.tax_id || "",
        address: supplier.address || "",
      });
    } else {
      dispatch(fetchSupplierById(supplierId));
    }
  }, [supplier, supplierId, dispatch]);

  const set = (k) => (e) => {
    const value = e.target.value;
    setForm((v) => ({ ...v, [k]: value }));
  };

  const onUpdate = async () => {
    await dispatch(
      updateSupplier({
        id: supplierId,
        fantasyName: form.fantasyName.trim(),
        legalName: form.legalName.trim() || null,
        email: form.email || null,
        phone: form.phone || null,
        taxId: form.taxId || null,
        address: form.address || null,
      })
    ).unwrap();

    navigate("/app/suppliers");
  };

  const disabled =
    !form.fantasyName.trim() ||
    updateStatus === "loading" ||
    updateStatus === "succeeded";

  if (!supplier && updateStatus !== "loading") {
    return <div className="text-[#e8eefc]">Cargando proveedor...</div>;
  }

  return (
    <div className="grid gap-3">
      <Card>
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-[11px] opacity-70">Proveedores</div>
            <h2 className="m-0 text-lg">Editar proveedor</h2>
          </div>
          <div className="flex gap-2">
            <SecondaryButton onClick={() => navigate("/app/suppliers")}>
              Cancelar
            </SecondaryButton>
            <PrimaryButton onClick={onUpdate} disabled={disabled}>
              {updateStatus === "loading" ? "Guardando..." : "Guardar"}
            </PrimaryButton>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Nombre de Fantasía *</Label>
          <Input
            value={form.fantasyName}
            onChange={set("fantasyName")}
            placeholder="Nombre de fantasía del proveedor"
          />

          <Label>Razón Social</Label>
          <Input
            value={form.legalName}
            onChange={set("legalName")}
            placeholder="Razón social opcional"
          />

          <Label>Email</Label>
          <Input
            value={form.email}
            onChange={set("email")}
            placeholder="Email opcional"
          />

          <Label>Teléfono</Label>
          <Input
            value={form.phone}
            onChange={set("phone")}
            placeholder="Teléfono opcional"
          />

          <Label>CUIT/CUIL</Label>
          <Input
            value={form.taxId}
            onChange={set("taxId")}
            placeholder="CUIT/CUIL opcional"
          />

          <Label>Dirección</Label>
          <Input
            value={form.address}
            onChange={set("address")}
            placeholder="Dirección opcional"
          />
        </div>

        {createError && (
          <ErrorAlert className="mt-2.5">{createError}</ErrorAlert>
        )}
      </Card>
    </div>
  );
}

