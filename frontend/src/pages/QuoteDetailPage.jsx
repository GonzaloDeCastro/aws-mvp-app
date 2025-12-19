import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuoteById } from "../redux/quotesSlice";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Card from "../components/ui/Card";
import { SecondaryButton } from "../components/ui/Button";
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
      const lineTotal = Number(i.line_total) || 0;
      const taxRate =
        i.tax_rate !== null && i.tax_rate !== undefined
          ? Number(i.tax_rate)
          : 0;

      totalSinIva += lineTotal;

      if (taxRate > 0) {
        const taxAmount =
          Number(i.tax_amount) ||
          Number((lineTotal * (taxRate / 100)).toFixed(2));
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
  }, [quote]);

  if (status === "loading")
    return <div className="text-[#e8eefc]">Cargando presupuesto…</div>;
  if (status === "failed") return <div className="text-[crimson]">{error}</div>;
  if (!quote) return null;

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
    const margin = 10;
    const contentWidth = pageWidth - margin * 2;

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    let currentY = 15;

    if (quote.company.logo) {
      try {
        const logoWidth = 35;
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
    currentY += 7;
    doc.text(`Estado: ${quote.status}`, margin, currentY);
    if (quote.validUntil) {
      currentY += 6;
      doc.text(
        `Válido hasta: ${new Date(quote.validUntil).toLocaleDateString()}`,
        margin,
        currentY
      );
    }

    let y = currentY + 12;
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text("Compañía", margin, y);
    doc.text("Cliente", margin + contentWidth / 2, y);
    y += 7;

    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text(quote.company.name || "-", margin, y);
    doc.text(quote.customer?.name || "-", margin + contentWidth / 2, y);
    y += 5;
    doc.text(quote.company.address || "-", margin, y);
    doc.text(quote.customer?.address || "-", margin + contentWidth / 2, y);
    y += 5;
    doc.text(quote.company.email || "-", margin, y);
    doc.text(quote.customer?.email || "-", margin + contentWidth / 2, y);

    const itemRows = quote.items.map((i) => {
      const discountPct = i.discount_pct || 0;
      const taxRate = i.tax_rate || 0;
      const grossLineTotal = i.gross_line_total || i.line_total;

      return [
        (i.item_name || "").substring(0, 25), // Limitar longitud del nombre
        String(i.quantity || 0),
        Number(i.unit_price || 0).toFixed(2),
        discountPct > 0 ? `${discountPct}%` : "0%",
        Number(i.line_total || 0).toFixed(2),
        taxRate > 0 ? `${taxRate}%` : "-",
        Number(grossLineTotal).toFixed(2),
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
        1: { cellWidth: 16, halign: "center" },
        2: { cellWidth: 22, halign: "right" },
        3: { cellWidth: 18, halign: "center" },
        4: { cellWidth: 28, halign: "right" },
        5: { cellWidth: 18, halign: "center" },
        6: { cellWidth: 28, halign: "right" },
      },
      theme: "striped",
    });

    const finalY = doc.lastAutoTable.finalY || y + 20;
    let summaryY = finalY + 8;

    const summaryX = pageWidth - margin;

    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text(
      `Total sin IVA: ${totals.totalSinIva.toFixed(2)} ${quote.currency}`,
      summaryX,
      summaryY,
      { align: "right" }
    );

    totals.ivaTotals.forEach((iva) => {
      summaryY += 6;
      doc.text(
        `IVA ${iva.rate}%: ${iva.amount.toFixed(2)} ${quote.currency}`,
        summaryX,
        summaryY,
        { align: "right" }
      );
    });

    summaryY += 8;
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text(
      `Total: ${totals.totalConIva.toFixed(2)} ${quote.currency}`,
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

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs opacity-80 py-3 px-3 border-b border-white/8">
                  Ítem
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
              {quote.items.map((i) => {
                const discountPct = i.discount_pct || 0;
                const taxRate = i.tax_rate || 0;
                const grossLineTotal = i.gross_line_total || i.line_total;

                return (
                  <tr key={i.id}>
                    <td className="px-3 py-2.5">{i.item_name}</td>
                    <td className="px-3 py-2.5">{i.quantity}</td>
                    <td className="px-3 py-2.5">{i.unit_price}</td>
                    <td className="px-3 py-2.5">
                      {discountPct > 0 ? `${discountPct}%` : "0%"}
                    </td>
                    <td className="px-3 py-2.5">
                      {Number(i.line_total).toFixed(2)} {quote.currency}
                    </td>
                    <td className="px-3 py-2.5">
                      {taxRate > 0 ? `${taxRate}%` : "-"}
                    </td>
                    <td className="px-3 py-2.5">
                      {Number(grossLineTotal).toFixed(2)} {quote.currency}
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
                    {totals.totalSinIva.toFixed(2)} {quote.currency}
                  </span>
                </div>

                {totals.ivaTotals.map((iva) => (
                  <div key={iva.rate} className="flex justify-between text-sm">
                    <span className="opacity-80">IVA {iva.rate}%:</span>
                    <span className="font-medium">
                      {iva.amount.toFixed(2)} {quote.currency}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between text-base font-semibold pt-2 border-t border-white/12">
                  <span>Total:</span>
                  <span>
                    {totals.totalConIva.toFixed(2)} {quote.currency}
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
