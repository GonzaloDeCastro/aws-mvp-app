import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../redux/productsSlice";
import Card from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Select from "../components/ui/Select";
import { ErrorAlert } from "../components/ui/Alert";

export default function ProductCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createStatus, createError } = useSelector((s) => s.products);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    brand: "",
    description: "",
    stockQty: 0,
    price: 0,
    currency: "ARS",
  });

  const set = (k) => (e) => {
    const value = e.target.value;
    setForm((v) => ({ ...v, [k]: value }));
  };

  const onCreate = async () => {
    await dispatch(
      createProduct({
        sku: form.sku || null,
        name: form.name.trim(),
        brand: form.brand || null,
        description: form.description || null,
        stockQty: Number(form.stockQty) || 0,
        price: Number(form.price) || 0,
        currency: form.currency || "ARS",
      })
    ).unwrap();

    navigate("/app/products");
  };

  const disabled =
    !form.name.trim() ||
    createStatus === "loading" ||
    createStatus === "succeeded";

  return (
    <div className="grid gap-3">
      <Card>
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-[11px] opacity-70">Productos</div>
            <h2 className="m-0 text-lg">Nuevo producto</h2>
          </div>
          <PrimaryButton onClick={onCreate} disabled={disabled}>
            {createStatus === "loading" ? "Creando..." : "Crear"}
          </PrimaryButton>
        </div>

        <div className="grid gap-2">
          <Label>Nombre *</Label>
          <Input
            value={form.name}
            onChange={set("name")}
            placeholder="Nombre del producto"
          />

          <Label>SKU</Label>
          <Input
            value={form.sku}
            onChange={set("sku")}
            placeholder="SKU opcional"
          />

          <Label>Marca</Label>
          <Input
            value={form.brand}
            onChange={set("brand")}
            placeholder="Marca opcional"
          />

          <Label>Descripción</Label>
          <textarea
            className="rounded-xl border border-white/12 bg-[rgba(0,0,0,0.22)] px-3 py-2.5 text-[#e8eefc] outline-none min-h-[80px] resize-y placeholder:text-white/50"
            value={form.description}
            onChange={set("description")}
            placeholder="Descripción opcional"
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

        {createError && (
          <ErrorAlert className="mt-2.5">{createError}</ErrorAlert>
        )}
      </Card>
    </div>
  );
}
