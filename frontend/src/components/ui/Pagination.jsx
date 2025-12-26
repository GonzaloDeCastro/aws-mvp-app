import { useState, useEffect } from "react";
import Select from "./Select";

// Función para calcular el número de filas según la resolución
const calculateItemsPerPage = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;

  // Para resoluciones pequeñas (1366x768 o menores)
  if (height <= 768 || width <= 1366) {
    return 7;
  }

  // Para resoluciones grandes (1920x1080 o mayores)
  if (height >= 1080 && width >= 1920) {
    return 25;
  }

  // Para resoluciones intermedias, calcular proporcionalmente
  // Interpolación lineal entre 7 (768px) y 25 (1080px)
  const minHeight = 768;
  const maxHeight = 1080;
  const minItems = 7;
  const maxItems = 25;

  if (height < minHeight) return minItems;
  if (height > maxHeight) return maxItems;

  const ratio = (height - minHeight) / (maxHeight - minHeight);
  const calculated = Math.round(minItems + (maxItems - minItems) * ratio);

  // Redondear a valores comunes
  if (calculated <= 10) return 7;
  if (calculated <= 13) return 10;
  if (calculated <= 20) return 13;
  if (calculated <= 30) return 25;
  return 25;
};

export default function Pagination({
  data,
  itemsPerPageOptions = [7, 10, 13, 25, 50],
  children,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    // Calcular el valor inicial basado en la resolución
    const calculated = calculateItemsPerPage();
    // Asegurarse de que el valor calculado esté en las opciones, sino usar el más cercano
    const closest = itemsPerPageOptions.reduce((prev, curr) =>
      Math.abs(curr - calculated) < Math.abs(prev - calculated) ? curr : prev
    );
    return closest;
  });

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Reset to page 1 when data changes or when current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [data.length, totalPages, currentPage]);

  // Ajustar itemsPerPage cuando cambia el tamaño de la ventana
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const calculated = calculateItemsPerPage();
        const closest = itemsPerPageOptions.reduce((prev, curr) =>
          Math.abs(curr - calculated) < Math.abs(prev - calculated)
            ? curr
            : prev
        );
        // Solo actualizar si el valor cambió significativamente
        setItemsPerPage((current) => {
          if (Math.abs(closest - current) >= 5) {
            setCurrentPage(1); // Reset a la primera página
            return closest;
          }
          return current;
        });
      }, 250); // Debounce de 250ms
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [itemsPerPageOptions]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="grid gap-3">
      {children(paginatedData)}

      {data.length > 0 && (
        <div className="flex items-center justify-between gap-4 p-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-70">Filas por página:</span>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="w-20 text-xs"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-2 text-xs opacity-70">
            <span>
              {startIndex + 1}-{Math.min(endIndex, data.length)} de{" "}
              {data.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded border border-white/20 bg-white/[0.03] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06] text-sm"
            >
              Anterior
            </button>
            <span className="px-2 text-xs opacity-70">
              Página {currentPage} de {totalPages || 1}
            </span>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-2 py-1 rounded border border-white/20 bg-white/[0.03] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06] text-sm"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
