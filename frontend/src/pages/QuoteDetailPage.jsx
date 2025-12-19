import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuoteById } from "../redux/quotesSlice";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Card from "../components/ui/Card";
import { SecondaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Table, {
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "../components/ui/Table";

export default function QuoteDetailPage() {
  const { id } = useParams();
  const quoteId = Number(id);
  const dispatch = useDispatch();

  const quote = useSelector((s) => s.quotes.byId[quoteId]);
  const status = useSelector((s) => s.quotes.statusById[quoteId] || "idle");
  const error = useSelector((s) => s.quotes.errorById[quoteId] || "");

  useEffect(() => {
    if (status === "idle") dispatch(fetchQuoteById(quoteId));
  }, [dispatch, quoteId, status]);

  // Calcular totales (debe estar antes de los early returns para cumplir con las reglas de hooks)
  // Usar el dólar guardado al crear el presupuesto, o fallback a 1470
  const dollarRate = quote?.dollarRateUsed || 1470;

  const totals = useMemo(() => {
    if (!quote || !quote.items) {
      return {
        totalSinIva: 0,
        ivaTotals: [],
        totalConIva: 0,
      };
    }

    let totalSinIva = 0;
    const ivaGroups = {};

    quote.items.forEach((i) => {
      let lineTotal = Number(i.line_total) || 0;
      const itemCurrency = i.currency || quote.currency;
      const taxRate =
        i.tax_rate !== null && i.tax_rate !== undefined
          ? Number(i.tax_rate)
          : 0;

      // Convertir a ARS si el item está en USD
      if (itemCurrency === "USD") {
        lineTotal = Number((lineTotal * dollarRate).toFixed(2));
      }

      totalSinIva += lineTotal;

      if (taxRate > 0) {
        // Calcular tax_amount basado en el lineTotal ya convertido
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
  }, [quote, dollarRate]);

  if (status === "loading")
    return <div className="text-[#e8eefc]">Cargando presupuesto…</div>;
  if (status === "failed") return <div className="text-[crimson]">{error}</div>;
  if (!quote) return null;

  // Función helper para formatear números: punto para miles, coma para decimales
  const formatNumber = (num) => {
    const value = Number(num);
    if (isNaN(value)) return "0";

    // Separar parte entera y decimal
    const parts = value.toFixed(2).split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Agregar puntos como separadores de miles
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Si los decimales son "00", no mostrarlos
    if (decimalPart === "00") {
      return formattedInteger;
    }

    // Si no, mostrar con coma
    return `${formattedInteger},${decimalPart}`;
  };

  const loadImageAsDataUrl = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        try {
          const dataUrl = canvas.toDataURL("image/png");
          resolve(dataUrl);
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = reject;
      img.src = url;
    });

  const exportPdf = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    let currentY = 15;

    if (quote.company.logo) {
      try {
        const logoWidth = 55;
        const logoX = pageWidth - margin - logoWidth;

        const imgData = await loadImageAsDataUrl(
          `data:image/png;base64,${quote.company.logo}`
        );
        doc.addImage(imgData, "PNG", logoX, currentY, logoWidth, 0);
        currentY = 25;
      } catch {
        // ignorar errores de logo
      }
    }

    doc.text(`Presupuesto #${quote.quoteNumber}`, margin, currentY);

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    currentY += 4;

    if (quote.validUntil) {
      currentY += 3;
      doc.text(
        `Válido hasta: ${new Date(quote.validUntil).toLocaleDateString()}`,
        margin,
        currentY
      );
    }

    let y = currentY + 12;

    // Sección Compañía (2 campos por fila)
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text("Compañía Emisora", margin, y);
    y += 5;

    doc.setFontSize(9);
    const colWidth = (pageWidth - margin * 2) / 2;
    const leftColX = margin;
    const rightColX = margin + colWidth + 10;
    const labelSpacing = 2; // Espacio pequeño entre label y valor
    let currentRowY = y;

    // Función auxiliar para escribir label + valor
    const writeLabelValue = (label, value, x, y) => {
      doc.setFont(undefined, "bold");
      doc.text(label, x, y);
      const labelWidth = doc.getTextWidth(label);
      doc.setFont(undefined, "normal");
      doc.text(value || "-", x + labelWidth + labelSpacing, y);
    };

    // Fila 1: Compañía | CUIT
    writeLabelValue("Compañía: ", quote.company.name, leftColX, currentRowY);
    writeLabelValue("CUIT: ", quote.company.taxId, rightColX, currentRowY);
    currentRowY += 5;

    // Fila 2: Dirección | Teléfono
    if (quote.company.address || quote.company.phone) {
      if (quote.company.address) {
        writeLabelValue(
          "Dirección: ",
          quote.company.address,
          leftColX,
          currentRowY
        );
      }
      if (quote.company.phone) {
        writeLabelValue(
          "Teléfono: ",
          quote.company.phone,
          rightColX,
          currentRowY
        );
      }
      currentRowY += 5;
    }

    // Fila 3: Correo
    if (quote.company.email) {
      writeLabelValue("Correo: ", quote.company.email, leftColX, currentRowY);
      currentRowY += 5;
    }

    y = currentRowY;

    // Línea divisoria antes del cliente
    y += 1;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Sección Cliente (2 campos por fila)
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");

    y += 0;

    doc.setFontSize(9);
    currentRowY = y;

    // Fila 1: Cliente | CUIT
    writeLabelValue("Cliente: ", quote.customer?.name, leftColX, currentRowY);
    writeLabelValue("CUIT: ", quote.customer?.taxId, rightColX, currentRowY);
    currentRowY += 5;

    // Fila 2: Correo | Teléfono
    if (quote.customer?.email || quote.customer?.phone) {
      if (quote.customer?.email) {
        writeLabelValue(
          "Correo: ",
          quote.customer.email,
          leftColX,
          currentRowY
        );
      }
      if (quote.customer?.phone) {
        writeLabelValue(
          "Teléfono: ",
          quote.customer.phone,
          rightColX,
          currentRowY
        );
      }
      currentRowY += 5;
    }

    // Fila 3: Dirección (si existe)
    if (quote.customer?.address) {
      writeLabelValue(
        "Dirección: ",
        quote.customer.address,
        leftColX,
        currentRowY
      );
      currentRowY += 5;
    }

    y = currentRowY;

    const itemRows = quote.items.map((i) => {
      const discountPct = i.discount_pct || 0;
      const taxRate = i.tax_rate || 0;
      const grossLineTotal = i.gross_line_total || i.line_total;
      // Usar la moneda original del item, no la del presupuesto
      const itemCurrency = i.currency || quote.currency;

      return [
        (i.item_name || "").substring(0, 25), // Limitar longitud del nombre
        String(i.quantity || 0),
        `${formatNumber(i.unit_price || 0)} ${itemCurrency}`,
        discountPct > 0 ? `${discountPct}%` : "0%",
        `${formatNumber(i.line_total || 0)} ${itemCurrency}`,
        taxRate > 0 ? `${taxRate}%` : "-",
        `${formatNumber(grossLineTotal)} ${itemCurrency}`,
      ];
    });

    autoTable(doc, {
      startY: y + 8,
      margin: { left: margin, right: margin },
      head: [
        [
          "Ítem",
          "Cant.",
          "Precio unit.",
          "Desc. %",
          "Sub Total sin IVA",
          "IVA",
          "Sub Total con IVA",
        ],
      ],
      body: itemRows,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
        cellWidth: "wrap",
      },
      headStyles: {
        fillColor: [60, 60, 80],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: {
        0: { cellWidth: 45, halign: "left" },
        1: { cellWidth: 16, halign: "left" },
        2: { cellWidth: 22, halign: "left" },
        3: { cellWidth: 18, halign: "left" },
        4: { cellWidth: 33, halign: "left" },
        5: { cellWidth: 18, halign: "left" },
        6: { cellWidth: 33, halign: "left" },
      },
      theme: "striped",
    });

    const finalY = doc.lastAutoTable.finalY || y + 20;
    let summaryY = finalY + 10;

    const summaryX = pageWidth - margin;
    // Usar el dólar guardado al crear el presupuesto
    const DOLLAR_RATE = quote?.dollarRateUsed || 1470;

    // Dolar Referencia (izquierda)
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text("Dolar Referencia:", margin, summaryY);
    doc.setFont(undefined, "bold");
    doc.text(`${DOLLAR_RATE} USD`, 0 + 40, summaryY);

    // Total sin IVA (derecha)
    doc.setFont(undefined, "normal");
    doc.text(
      `Total sin IVA: ${formatNumber(totals.totalSinIva)} ARS`,
      summaryX,
      summaryY,
      { align: "right" }
    );

    // Primera línea divisoria (después de Total sin IVA)
    summaryY += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(summaryX - 60, summaryY, summaryX, summaryY);
    summaryY += 5;

    totals.ivaTotals.forEach((iva) => {
      doc.text(
        `IVA ${iva.rate}%: ${formatNumber(iva.amount)} ARS`,
        summaryX,
        summaryY,
        { align: "right" }
      );
      summaryY += 6;
    });

    // Segunda línea divisoria (después de IVAs, antes del Total)
    summaryY += 2;
    doc.setDrawColor(200, 200, 200);
    doc.line(summaryX - 60, summaryY, summaryX, summaryY);
    summaryY += 5;

    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text(
      `Total: ${formatNumber(totals.totalConIva)} ARS`,
      summaryX,
      summaryY,
      { align: "right" }
    );
    doc.setFont(undefined, "normal");

    doc.save(`quote-${quote.quoteNumber || quote.id}.pdf`);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="m-0 mb-1">Presupuesto #{quote.quoteNumber}</h2>
            <div className="text-sm opacity-80">Estado: {quote.status}</div>
            <div className="text-sm opacity-80">
              Válido hasta: {new Date(quote.validUntil).toLocaleDateString()}
            </div>
          </div>
          <SecondaryButton onClick={exportPdf}>Exportar PDF</SecondaryButton>
        </div>

        <div className="flex gap-10 mb-6">
          <div>
            <h4 className="m-0 mb-2 text-sm font-semibold opacity-90">
              Compañía
            </h4>
            <div className="text-sm">{quote.company.name}</div>
            <div className="text-sm">{quote.company.address}</div>
            <div className="text-sm">{quote.company.email}</div>
          </div>

          <div>
            <h4 className="m-0 mb-2 text-sm font-semibold opacity-90">
              Cliente
            </h4>
            <div className="text-sm">{quote.customer?.name}</div>
            <div className="text-sm">{quote.customer?.address}</div>
            <div className="text-sm">{quote.customer?.email}</div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table
            className="w-full border-collapse text-sm"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th
                  className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8"
                  style={{ width: "30%" }}
                >
                  Ítem
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8"
                  style={{ width: "10%" }}
                >
                  Cantidad
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8"
                  style={{ width: "12%" }}
                >
                  Precio unitario
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8"
                  style={{ width: "10%" }}
                >
                  Descuento %
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8"
                  style={{ width: "14%" }}
                >
                  Sub Total sin IVA
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8"
                  style={{ width: "8%" }}
                >
                  IVA
                </th>
                <th
                  className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8"
                  style={{ width: "16%" }}
                >
                  Sub Total con IVA
                </th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((i) => {
                const discountPct = i.discount_pct || 0;
                const taxRate = i.tax_rate || 0;
                const grossLineTotal = i.gross_line_total || i.line_total;

                return (
                  <tr key={i.id}>
                    <td className="px-3 py-2.5">{i.item_name}</td>
                    <td className="px-3 py-2.5">{i.quantity}</td>
                    <td className="px-3 py-2.5">
                      {Number(i.unit_price || 0).toFixed(2)}{" "}
                      {i.currency || quote.currency}
                    </td>
                    <td className="px-3 py-2.5">
                      {discountPct > 0 ? `${discountPct}%` : "0%"}
                    </td>
                    <td className="px-3 py-2.5">
                      {Number(i.line_total).toFixed(2)}{" "}
                      {i.currency || quote.currency}
                    </td>
                    <td className="px-3 py-2.5">
                      {taxRate > 0 ? `${taxRate}%` : "-"}
                    </td>
                    <td className="px-3 py-2.5">
                      {Number(grossLineTotal).toFixed(2)}{" "}
                      {i.currency || quote.currency}
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
                <span className="font-medium">{dollarRate} USD</span>
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
