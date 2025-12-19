import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCustomers } from "../redux/customersSlice";
import { fetchProducts } from "../redux/productsSlice";
import { fetchCompany } from "../redux/companySlice";
import { fetchQuoteById, updateQuote, fetchQuotes } from "../redux/quotesSlice";
import Card from "../components/ui/Card";
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton,
} from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Select from "../components/ui/Select";

export default function QuoteEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const quoteId = Number(id);

  const customers = useSelector((s) => s.customers.items);
  const customersStatus = useSelector((s) => s.customers.status);

  const products = useSelector((s) => s.products.items);
  const productsStatus = useSelector((s) => s.products.status);

  const company = useSelector((s) => s.company.current);
  const companyStatus = useSelector((s) => s.company.status);

  const quote = useSelector((s) => s.quotes.byId[quoteId]);
  const quoteStatus = useSelector(
    (s) => s.quotes.statusById[quoteId] || "idle"
  );

  const [customerId, setCustomerId] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [notes, setNotes] = useState("");
  // Usar dollar_rate_used del presupuesto si existe (fijo), sino el actual de la compañía
  const dollarRate = quote?.dollarRateUsed || company?.dollar_rate || 1470;

  // Bandera para evitar que el useEffect sobrescriba los cambios del usuario
  const dataLoadedRef = useRef(false);

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

  useEffect(() => {
    if (companyStatus === "idle") dispatch(fetchCompany());
  }, [dispatch, companyStatus]);

  useEffect(() => {
    if (quoteStatus === "idle") {
      dispatch(fetchQuoteById(quoteId));
    }
  }, [dispatch, quoteId, quoteStatus]);

  // Cargar datos del quote cuando esté disponible (solo una vez)
  useEffect(() => {
    if (quote && !dataLoadedRef.current && products.length > 0) {
      setCustomerId(quote.customer?.id ? String(quote.customer.id) : "");
      setValidUntil(
        quote.validUntil
          ? new Date(quote.validUntil).toISOString().split("T")[0]
          : ""
      );
      setNotes(quote.notes || "");

      // Convertir items del quote al formato del formulario
      if (quote.items && quote.items.length > 0) {
        const formattedItems = quote.items.map((item) => {
          const product = products.find((p) => p.id === item.product_id);
          const unitPrice = item.unit_price || "";
          // Formatear el precio a 2 decimales si existe
          const formattedPrice =
            unitPrice === "" || unitPrice === undefined
              ? ""
              : Number(unitPrice).toFixed(2);
          return {
            productId: item.product_id ? String(item.product_id) : "",
            quantity: item.quantity || 1,
            unitPrice: formattedPrice,
            discountPct: item.discount_pct || 0,
            taxRate: item.tax_rate || null,
            itemCurrency: item.currency || "ARS",
          };
        });
        setItems(formattedItems);
      }
      dataLoadedRef.current = true;
    }
  }, [quote, products]);

  const updateItem = (index, patch) => {
    setItems((prev) =>
      prev.map((it, idx) => (idx === index ? { ...it, ...patch } : it))
    );
  };

  const handleProductChange = (index, productId) => {
    const p = products.find((prod) => prod.id === Number(productId));
    const patch = { productId };
    if (p) {
      // Formatear el precio a 2 decimales
      const price = Number(p.price) || 0;
      patch.unitPrice = price.toFixed(2);
      patch.taxRate = p.tax_rate || null;
      patch.itemCurrency = p.currency; // Guardar la moneda del producto
    } else {
      patch.taxRate = null;
      patch.itemCurrency = "ARS"; // Usar ARS por defecto
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
        itemCurrency: "ARS",
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
      const itemCurrency = it.itemCurrency || "ARS";

      const gross = quantity * unitPrice;
      const discount = gross * (discountPct / 100);
      let lineTotal = Number((gross - discount).toFixed(2));

      // Convertir a ARS si el item está en USD
      if (itemCurrency === "USD") {
        lineTotal = Number((lineTotal * dollarRate).toFixed(2));
      }

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
  }, [items, dollarRate, quote]);

  const onUpdate = async () => {
    const preparedItems = items
      .map((it, idx) => ({
        productId: it.productId ? Number(it.productId) : null,
        quantity: Number(it.quantity) || 0,
        unitPrice: Number(it.unitPrice) || 0,
        currency: it.itemCurrency || "ARS",
        discountPct: Number(it.discountPct) || 0,
        sortOrder: idx + 1,
      }))
      .filter((it) => it.productId && it.quantity > 0);

    if (preparedItems.length === 0) {
      alert("Agrega al menos un ítem con producto y cantidad.");
      return;
    }

    await dispatch(
      updateQuote({
        quoteId,
        customerId: customerId ? Number(customerId) : null,
        currency: "ARS", // Siempre ARS ya que convertimos todo
        validUntil: validUntil || null,
        items: preparedItems,
      })
    ).unwrap();

    // Recargar la lista de presupuestos para reflejar los cambios
    await dispatch(fetchQuotes());

    navigate(`/app/quotes/${quoteId}`);
  };

  const isLoadingLookups =
    customersStatus === "loading" ||
    productsStatus === "loading" ||
    quoteStatus === "loading";

  // Validar si hay items válidos para habilitar el botón
  const hasValidItems = useMemo(() => {
    return items.some(
      (it) =>
        it.productId && Number(it.quantity) > 0 && Number(it.unitPrice) >= 0
    );
  }, [items]);

  if (quoteStatus === "loading" || !quote) {
    return <div className="text-[#e8eefc]">Cargando presupuesto...</div>;
  }

  return (
    <div className="grid gap-3">
      <Card>
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-[11px] opacity-70">Presupuestos</div>
            <h2 className="m-0 text-lg">
              Editar presupuesto #{quote.quoteNumber}
            </h2>
          </div>
          <PrimaryButton
            onClick={onUpdate}
            disabled={isLoadingLookups || !hasValidItems}
          >
            {isLoadingLookups ? "Cargando..." : "Guardar"}
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

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th
                  className="text-left text-xs opacity-80 py-3 px-2 border-b border-white/8"
                  style={{ width: "30%" }}
                >
                  Producto
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-2 border-b border-white/8"
                  style={{ width: "8%" }}
                >
                  Cantidad
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-2 border-b border-white/8"
                  style={{ width: "15%" }}
                >
                  Precio unitario
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-2 border-b border-white/8"
                  style={{ width: "10%" }}
                >
                  Descuento %
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-2 border-b border-white/8"
                  style={{ width: "12%" }}
                >
                  Sub Total sin IVA
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-2 border-b border-white/8"
                  style={{ width: "6%" }}
                >
                  IVA
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-2 border-b border-white/8"
                  style={{ width: "12%" }}
                >
                  Sub Total con IVA
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-2 border-b border-white/8"
                  style={{ width: "7%" }}
                >
                  Acciones
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
                  <tr key={idx} className="border-b border-white/5">
                    <td className="px-2 py-2">
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
                    <td className="px-2 py-2">
                      <Input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={(e) =>
                          updateItem(idx, { quantity: e.target.value })
                        }
                        className="w-full"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={
                            it.unitPrice === "" || it.unitPrice === undefined
                              ? ""
                              : Number(it.unitPrice).toFixed(2)
                          }
                          onChange={(e) => {
                            let value = e.target.value;
                            // Limitar a 2 decimales
                            if (value !== "") {
                              value = value.replace(/[^\d.]/g, "");
                              const parts = value.split(".");
                              if (parts.length > 2) {
                                value =
                                  parts[0] + "." + parts.slice(1).join("");
                              }
                              if (parts.length === 2 && parts[1].length > 2) {
                                value =
                                  parts[0] + "." + parts[1].substring(0, 2);
                              }
                            }
                            updateItem(idx, { unitPrice: value });
                          }}
                          onBlur={(e) => {
                            if (e.target.value) {
                              const num = Number(e.target.value);
                              if (!isNaN(num)) {
                                updateItem(idx, { unitPrice: num.toFixed(2) });
                              }
                            }
                          }}
                          className="flex-1 min-w-0"
                        />
                        <span className="text-xs opacity-70 whitespace-nowrap flex-shrink-0">
                          {it.itemCurrency || "ARS"}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={it.discountPct}
                        onChange={(e) =>
                          updateItem(idx, { discountPct: e.target.value })
                        }
                        className="w-full"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <div className="text-sm whitespace-nowrap">
                        {lineTotal.toFixed(2)} {it.itemCurrency || "ARS"}
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="text-sm whitespace-nowrap">
                        {taxRate > 0 ? `${taxRate}%` : "-"}
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="text-sm whitespace-nowrap">
                        {grossLineTotal.toFixed(2)} {it.itemCurrency || "ARS"}
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <DangerButton
                        type="button"
                        onClick={() => removeItemRow(idx)}
                        disabled={items.length === 1}
                        className="w-full"
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
            <div className="flex justify-between items-end">
              <div className="text-sm">
                <Label className="text-xs opacity-80 mb-1">
                  Dolar Referencia:
                </Label>
                <div className="px-3 py-2.5 rounded-xl border border-white/12 bg-[rgba(0,0,0,0.22)] text-[#e8eefc] text-sm w-24">
                  {dollarRate}
                </div>
                {quote?.dollarRateUsed && (
                  <div className="text-xs opacity-60 mt-1">
                    (Fijo al momento de creación)
                  </div>
                )}
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">Total sin IVA:</span>
                  <span className="font-medium">
                    {totals.totalSinIva.toFixed(2)} ARS
                  </span>
                </div>

                {totals.ivaTotals.map((iva) => (
                  <div key={iva.rate} className="flex justify-between text-sm">
                    <span className="opacity-80">IVA {iva.rate}%:</span>
                    <span className="font-medium">
                      {iva.amount.toFixed(2)} ARS
                    </span>
                  </div>
                ))}

                <div className="flex justify-between text-base font-semibold pt-2 border-t border-white/12">
                  <span>Total:</span>
                  <span>{totals.totalConIva.toFixed(2)} ARS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
