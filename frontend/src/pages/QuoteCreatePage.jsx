import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../redux/customersSlice";
import { fetchProducts } from "../redux/productsSlice";
import { createQuote } from "../redux/quotesSlice";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
} from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Select from "../components/ui/Select";

export default function QuoteCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customers = useSelector((s) => s.customers.items);
  const customersStatus = useSelector((s) => s.customers.status);

  const products = useSelector((s) => s.products.items);
  const productsStatus = useSelector((s) => s.products.status);

  const [customerId, setCustomerId] = useState("");
  const [currency, setCurrency] = useState("ARS");
  const [validUntil, setValidUntil] = useState("");
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
      unitPrice: "",
      discountPct: 0,
      taxRate: null,
    },
  ]);

  useEffect(() => {
    if (customersStatus === "idle") dispatch(fetchCustomers());
  }, [dispatch, customersStatus]);

  useEffect(() => {
    if (productsStatus === "idle") dispatch(fetchProducts());
  }, [dispatch, productsStatus]);

  const updateItem = (index, patch) => {
    setItems((prev) =>
      prev.map((it, idx) => (idx === index ? { ...it, ...patch } : it))
    );
  };

  const handleProductChange = (index, productId) => {
    const p = products.find((prod) => prod.id === Number(productId));
    const patch = { productId };
    if (p) {
      patch.unitPrice = p.price;
      patch.taxRate = p.tax_rate || null;
    } else {
      patch.taxRate = null;
    }
    updateItem(index, patch);
  };

  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      {
        productId: "",
        quantity: 1,
        unitPrice: "",
        discountPct: 0,
        taxRate: null,
      },
    ]);
  };

  const removeItemRow = (index) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Calcular totales
  const totals = useMemo(() => {
    let totalSinIva = 0;
    const ivaGroups = {};

    items.forEach((it) => {
      const quantity = Number(it.quantity) || 0;
      const unitPrice = Number(it.unitPrice) || 0;
      const discountPct = Number(it.discountPct) || 0;
      const taxRate =
        it.taxRate !== null && it.taxRate !== undefined
          ? Number(it.taxRate)
          : 0;

      const gross = quantity * unitPrice;
      const discount = gross * (discountPct / 100);
      const lineTotal = Number((gross - discount).toFixed(2));

      totalSinIva += lineTotal;

      if (taxRate > 0) {
        const taxAmount = Number((lineTotal * (taxRate / 100)).toFixed(2));
        if (!ivaGroups[taxRate]) {
          ivaGroups[taxRate] = 0;
        }
        ivaGroups[taxRate] += taxAmount;
      }
    });

    // Redondear totales de IVA
    const ivaTotals = Object.keys(ivaGroups).map((rate) => ({
      rate: Number(rate),
      amount: Number(ivaGroups[rate].toFixed(2)),
    }));

    // Ordenar por tasa de IVA (mayor a menor)
    ivaTotals.sort((a, b) => b.rate - a.rate);

    // Calcular total con IVA
    const totalIva = ivaTotals.reduce((sum, item) => sum + item.amount, 0);
    const totalConIva = Number((totalSinIva + totalIva).toFixed(2));

    return {
      totalSinIva: Number(totalSinIva.toFixed(2)),
      ivaTotals,
      totalConIva,
    };
  }, [items]);

  const onCreate = async () => {
    const preparedItems = items
      .map((it, idx) => ({
        productId: it.productId ? Number(it.productId) : null,
        quantity: Number(it.quantity) || 0,
        unitPrice: Number(it.unitPrice) || 0,
        currency,
        discountPct: Number(it.discountPct) || 0,
        sortOrder: idx + 1,
      }))
      .filter((it) => it.productId && it.quantity > 0);

    if (preparedItems.length === 0) {
      alert("Agrega al menos un ítem con producto y cantidad.");
      return;
    }

    const data = await dispatch(
      createQuote({
        customerId: customerId ? Number(customerId) : null,
        currency,
        validUntil: validUntil || null,
        notes: notes || null,
        items: preparedItems,
      })
    ).unwrap();

    navigate(`/app/quotes/${data.id}`);
  };

  const isLoadingLookups =
    customersStatus === "loading" || productsStatus === "loading";

  return (
    <div className="grid gap-3">
      <Card>
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-[11px] opacity-70">Presupuestos</div>
            <h2 className="m-0 text-lg">Nuevo presupuesto</h2>
          </div>
          <PrimaryButton onClick={onCreate} disabled={isLoadingLookups}>
            {isLoadingLookups ? "Cargando..." : "Crear"}
          </PrimaryButton>
        </div>

        <div className="grid gap-2">
          <Label>Cliente</Label>
          <Select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">(Sin cliente)</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Label>Moneda</Label>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Select>

          <Label>Válido hasta</Label>
          <Input
            type="date"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
          />

          <Label>Notas</Label>
          <textarea
            className="rounded-xl border border-white/12 bg-[rgba(0,0,0,0.22)] px-3 py-2.5 text-[#e8eefc] outline-none min-h-[90px] resize-y placeholder:text-white/50"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notas opcionales..."
          />
        </div>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-[11px] opacity-70">Ítems</div>
            <h2 className="m-0 text-lg">Ítems del presupuesto</h2>
          </div>
          <SecondaryButton onClick={addItemRow}>Agregar ítem</SecondaryButton>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8">
                  Producto
                </th>
                <th className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8">
                  Cantidad
                </th>
                <th className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8">
                  Precio unitario
                </th>
                <th className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8">
                  Descuento %
                </th>
                <th className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8">
                  Sub Total sin IVA
                </th>
                <th className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8">
                  IVA
                </th>
                <th className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8">
                  Sub Total con IVA
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => {
                const quantity = Number(it.quantity) || 0;
                const unitPrice = Number(it.unitPrice) || 0;
                const discountPct = Number(it.discountPct) || 0;
                const taxRate =
                  it.taxRate !== null && it.taxRate !== undefined
                    ? Number(it.taxRate)
                    : 0;

                const gross = quantity * unitPrice;
                const discount = gross * (discountPct / 100);
                const lineTotal = Number((gross - discount).toFixed(2));
                const grossLineTotal = Number(
                  (lineTotal * (1 + taxRate / 100)).toFixed(2)
                );

                return (
                  <tr key={idx}>
                    <td>
                      <Select
                        className="w-full"
                        value={it.productId}
                        onChange={(e) =>
                          handleProductChange(idx, e.target.value)
                        }
                      >
                        <option value="">Selecciona un producto...</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} {p.brand ? `(${p.brand})` : ""}
                          </option>
                        ))}
                      </Select>
                    </td>
                    <td>
                      <Input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={(e) =>
                          updateItem(idx, { quantity: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={it.unitPrice}
                        onChange={(e) =>
                          updateItem(idx, { unitPrice: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={it.discountPct}
                        onChange={(e) =>
                          updateItem(idx, { discountPct: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <div className="px-3 py-2.5 text-sm">
                        {lineTotal.toFixed(2)} {currency}
                      </div>
                    </td>
                    <td>
                      <div className="px-3 py-2.5 text-sm">
                        {taxRate > 0 ? `${taxRate}%` : "-"}
                      </div>
                    </td>
                    <td>
                      <div className="px-3 py-2.5 text-sm">
                        {grossLineTotal.toFixed(2)} {currency}
                      </div>
                    </td>
                    <td>
                      <DangerButton
                        type="button"
                        onClick={() => removeItemRow(idx)}
                        disabled={items.length === 1}
                      >
                        Eliminar
                      </DangerButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Resumen de totales */}
          <div className="mt-4 pt-4 border-t border-white/12">
            <div className="flex justify-end">
              <div className="w-full max-w-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">Total sin IVA:</span>
                  <span className="font-medium">
                    {totals.totalSinIva.toFixed(2)} {currency}
                  </span>
                </div>

                {totals.ivaTotals.map((iva) => (
                  <div key={iva.rate} className="flex justify-between text-sm">
                    <span className="opacity-80">IVA {iva.rate}%:</span>
                    <span className="font-medium">
                      {iva.amount.toFixed(2)} {currency}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between text-base font-semibold pt-2 border-t border-white/12">
                  <span>Total:</span>
                  <span>
                    {totals.totalConIva.toFixed(2)} {currency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
