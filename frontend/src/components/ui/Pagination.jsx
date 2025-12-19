import { useState, useEffect } from "react";
import Select from "./Select";

export default function Pagination({
  data,
  itemsPerPageOptions = [8, 10, 15, 25, 50],
  children,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

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
