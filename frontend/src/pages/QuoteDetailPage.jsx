import { useEffect } from "react";
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

  if (status === "loading")
    return <div className="text-[#e8eefc]">Cargando presupuesto…</div>;
  if (status === "failed") return <div className="text-[crimson]">{error}</div>;
  if (!quote) return null;

  const total = quote.items.reduce((acc, i) => acc + Number(i.line_total), 0);

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

    doc.setFontSize(16);
    let currentY = 20;

    if (quote.company.logo) {
      try {
        const pageWidth = doc.internal.pageSize.getWidth();
        const logoWidth = 40;
        const margin = 14;
        const logoX = pageWidth - margin - logoWidth;

        const imgData = await loadImageAsDataUrl(
          `data:image/png;base64,${quote.company.logo}`
        );
        // height = 0 mantiene la relación de aspecto
        doc.addImage(imgData, "PNG", logoX, 10, logoWidth, 0);
        currentY = 30;
      } catch {
        // ignorar errores de logo
      }
    }

    doc.text(`Presupuesto #${quote.quoteNumber}`, 14, currentY);

    doc.setFontSize(11);
    doc.text(`Estado: ${quote.status}`, 14, currentY + 8);
    if (quote.validUntil) {
      doc.text(
        `Válido hasta: ${new Date(quote.validUntil).toLocaleDateString()}`,
        14,
        currentY + 14
      );
    }

    let y = currentY + 24;
    doc.setFontSize(12);
    doc.text("Compañía", 14, y);
    doc.text("Cliente", 110, y);
    y += 6;

    doc.setFontSize(10);
    doc.text(quote.company.name || "", 14, y);
    doc.text(quote.customer?.name || "", 110, y);
    y += 5;
    doc.text(quote.company.address || "", 14, y);
    doc.text(quote.customer?.address || "", 110, y);
    y += 5;
    doc.text(quote.company.email || "", 14, y);
    doc.text(quote.customer?.email || "", 110, y);

    const itemRows = quote.items.map((i) => [
      i.item_name,
      String(i.quantity),
      String(i.unit_price),
      String(i.line_total),
    ]);

    autoTable(doc, {
      startY: y + 10,
      head: [["Ítem", "Cant.", "Precio unitario", "Total"]],
      body: itemRows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 40, 60] },
    });

    const finalY = doc.lastAutoTable.finalY || y + 20;
    doc.setFontSize(12);
    doc.text(`Total: ${total} ${quote.currency}`, 14, finalY + 10);

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

        <Table>
          <TableHeader>
            <TableHeaderCell>Ítem</TableHeaderCell>
            <TableHeaderCell>Cant.</TableHeaderCell>
            <TableHeaderCell>Precio unitario</TableHeaderCell>
            <TableHeaderCell>Total</TableHeaderCell>
          </TableHeader>
          <TableBody>
            {quote.items.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.item_name}</TableCell>
                <TableCell>{i.quantity}</TableCell>
                <TableCell>{i.unit_price}</TableCell>
                <TableCell>{i.line_total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="text-right font-semibold mt-4">
          Total: {total} {quote.currency}
        </div>
      </Card>
    </div>
  );
}
