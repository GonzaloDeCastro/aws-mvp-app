import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCustomerById,
  updateCustomer,
  resetCreateStatus,
} from "../redux/customersSlice";
import Card from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { ErrorAlert } from "../components/ui/Alert";

export default function CustomerEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const customerId = Number(id);

  // Resetear el estado cuando se monta el componente
  useEffect(() => {
    dispatch(resetCreateStatus());
  }, [dispatch]);

  const customer = useSelector((s) =>
    s.customers.items.find((c) => c.id === customerId)
  );
  const { createStatus, createError } = useSelector((s) => s.customers);
  const updateStatus = createStatus; // Reutilizar createStatus para update

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    taxId: "",
    address: "",
  });

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        taxId: customer.tax_id || "",
        address: customer.address || "",
      });
    } else {
      dispatch(fetchCustomerById(customerId));
    }
  }, [customer, customerId, dispatch]);

  const set = (k) => (e) => {
    const value = e.target.value;
    setForm((v) => ({ ...v, [k]: value }));
  };

  const onUpdate = async () => {
    await dispatch(
      updateCustomer({
        id: customerId,
        name: form.name.trim(),
        email: form.email || null,
        phone: form.phone || null,
        taxId: form.taxId || null,
        address: form.address || null,
      })
    ).unwrap();

    navigate("/app/customers");
  };

  const disabled =
    !form.name.trim() ||
    updateStatus === "loading" ||
    updateStatus === "succeeded";

  if (!customer && updateStatus !== "loading") {
    return <div className="text-[#e8eefc]">Cargando cliente...</div>;
  }

  return (
    <div className="grid gap-3">
      <Card>
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-[11px] opacity-70">Clientes</div>
            <h2 className="m-0 text-lg">Editar cliente</h2>
          </div>
          <PrimaryButton onClick={onUpdate} disabled={disabled}>
            {updateStatus === "loading" ? "Guardando..." : "Guardar"}
          </PrimaryButton>
        </div>

        <div className="grid gap-2">
          <Label>Nombre *</Label>
          <Input
            value={form.name}
            onChange={set("name")}
            placeholder="Nombre del cliente"
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
