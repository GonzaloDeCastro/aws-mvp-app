import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  deleteProduct,
  createProductsBatch,
  fetchCategories,
} from "../redux/productsSlice";
import { fetchSuppliers, createSupplier } from "../redux/suppliersSlice";
import * as XLSX from "xlsx";
import {
  PrimaryButton,
  DangerButton,
  SecondaryButton,
} from "../components/ui/Button";
import Toolbar, {
  ToolbarTitle,
  ToolbarActions,
} from "../components/ui/Toolbar";
import Table, {
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "../components/ui/Table";
import SearchInput from "../components/ui/SearchInput";
import Select from "../components/ui/Select";
import { InfoAlert, ErrorAlert } from "../components/ui/Alert";
import Pagination from "../components/ui/Pagination";
import ConfirmModal from "../components/ui/ConfirmModal";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error, createStatus, createError, categories } =
    useSelector((s) => s.products);
  const suppliers = useSelector((s) => s.suppliers.items);

  const [search, setSearch] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState("all"); // "all", "composite", "individual"
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    productId: null,
    productName: "",
  });
  const [importModal, setImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const [importProgress, setImportProgress] = useState({
    total: 0,
    processed: 0,
    errors: [],
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filtrar por tipo de producto (compuesto vs individual)
    if (productTypeFilter === "composite") {
      filtered = filtered.filter((p) => p.is_composite === 1);
    } else if (productTypeFilter === "individual") {
      filtered = filtered.filter((p) => p.is_composite === 0);
    }

    // Filtrar por búsqueda de texto
    const term = search.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter((p) => {
        const sku = p.sku || "";
        const name = p.name || "";
        const brand = p.brand || "";
        const supplier = p.supplier || "";
        return (
          sku.toLowerCase().includes(term) ||
          name.toLowerCase().includes(term) ||
          brand.toLowerCase().includes(term) ||
          supplier.toLowerCase().includes(term)
        );
      });
    }

    return filtered;
  }, [items, search, productTypeFilter]);

  const handleDelete = async () => {
    if (deleteModal.productId) {
      await dispatch(deleteProduct(deleteModal.productId)).unwrap();
      setDeleteModal({ open: false, productId: null, productName: "" });
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImportFile(file);
    setImportPreview(null);
    setImportProgress({ total: 0, processed: 0, errors: [] });

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        if (jsonData.length === 0) {
          alert("El archivo Excel está vacío");
          return;
        }

        // Primera fila son los headers
        const headers = jsonData[0].map((h) => String(h || "").trim());
        const rows = jsonData
          .slice(1)
          .filter((row) =>
            row.some(
              (cell) =>
                cell !== undefined &&
                cell !== null &&
                String(cell).trim() !== ""
            )
          );

        setImportPreview({
          headers,
          rows: rows.slice(0, 5), // Mostrar solo las primeras 5 filas como preview
          totalRows: rows.length,
        });
      } catch (error) {
        console.error("Error reading Excel:", error);
        alert(
          "Error al leer el archivo Excel. Asegúrate de que sea un archivo válido."
        );
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const normalizeColumnName = (name) => {
    return String(name || "")
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remover acentos
  };

  const findColumnIndex = (headers, possibleNames) => {
    for (const name of possibleNames) {
      const index = headers.findIndex((h) => {
        const normalized = normalizeColumnName(h);
        return (
          normalized === normalizeColumnName(name) ||
          normalized.includes(normalizeColumnName(name))
        );
      });
      if (index !== -1) return index;
    }
    return -1;
  };

  const handleImport = async () => {
    if (!importFile) return;

    try {
      setImportProgress({ total: 0, processed: 0, errors: [] });

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

          const headers = jsonData[0].map((h) => String(h || "").trim());
          const rows = jsonData
            .slice(1)
            .filter((row) =>
              row.some(
                (cell) =>
                  cell !== undefined &&
                  cell !== null &&
                  String(cell).trim() !== ""
              )
            );

          // Encontrar índices de columnas
          const categoriaIdx = findColumnIndex(headers, [
            "Categoría",
            "categoria",
            "categoría",
            "category",
          ]);
          const skuIdx = findColumnIndex(headers, ["SKU", "sku"]);
          const productoIdx = findColumnIndex(headers, [
            "Producto",
            "producto",
            "nombre",
            "name",
          ]);
          const unidadIdx = findColumnIndex(headers, [
            "Unidad",
            "unidad",
            "currency",
            "moneda",
          ]);
          const proveedorIdx = findColumnIndex(headers, [
            "Proveedor",
            "proveedor",
            "supplier",
          ]);
          const stockIdx = findColumnIndex(headers, [
            "Stock",
            "stock",
            "cantidad",
          ]);
          const precioIdx = findColumnIndex(headers, [
            "Precio",
            "precio",
            "price",
          ]);
          const linkIdx = findColumnIndex(headers, [
            "Link",
            "link",
            "url",
            "enlace",
          ]);
          console.log(
            productoIdx,
            skuIdx,
            categoriaIdx,
            unidadIdx,
            proveedorIdx,
            stockIdx,
            precioIdx,
            linkIdx
          );
          if (productoIdx === -1) {
            alert("No se encontró la columna 'Producto' en el archivo Excel");
            return;
          }

          // Mapear categorías y proveedores
          const categoryMap = new Map();
          categories.forEach((cat) => {
            categoryMap.set(normalizeColumnName(cat.name), cat.id);
          });

          const supplierMap = new Map();
          suppliers.forEach((sup) => {
            supplierMap.set(normalizeColumnName(sup.fantasy_name), sup.id);
          });

          // Procesar filas
          const productsToCreate = [];
          const errors = [];

          // Identificar proveedores únicos que necesitan ser creados
          const suppliersToCreate = new Set();
          rows.forEach((row) => {
            const proveedorName =
              proveedorIdx !== -1
                ? String(row[proveedorIdx] || "").trim()
                : null;

            if (proveedorName) {
              const normalizedSupName = normalizeColumnName(proveedorName);
              const existingSupplier = supplierMap.get(normalizedSupName);
              if (!existingSupplier) {
                suppliersToCreate.add(proveedorName); // Guardar el nombre original
              }
            }
          });

          // Crear proveedores que no existen
          for (const supplierName of suppliersToCreate) {
            try {
              await dispatch(
                createSupplier({
                  fantasyName: supplierName,
                  legalName: null,
                  email: null,
                  phone: null,
                  taxId: null,
                  address: null,
                })
              ).unwrap();
            } catch (error) {
              console.error(`Error creando proveedor ${supplierName}:`, error);
              errors.push(
                `Error al crear proveedor "${supplierName}": ${
                  error.message || "Error desconocido"
                }`
              );
            }
          }

          // Recargar suppliers para obtener los nuevos proveedores creados
          if (suppliersToCreate.size > 0) {
            const updatedSuppliers = await dispatch(fetchSuppliers()).unwrap();
            updatedSuppliers.forEach((sup) => {
              supplierMap.set(normalizeColumnName(sup.fantasy_name), sup.id);
            });
          }

          rows.forEach((row, index) => {
            try {
              const name = String(row[productoIdx] || "").trim();
              if (!name) {
                errors.push(`Fila ${index + 2}: Falta el nombre del producto`);
                return;
              }

              // Generar SKU aleatorio si está vacío
              let sku = skuIdx !== -1 ? String(row[skuIdx] || "").trim() : null;
              if (!sku || sku === "") {
                // Generar SKU aleatorio: prefijo + número aleatorio de 6 dígitos
                const randomNum = Math.floor(100000 + Math.random() * 900000);
                sku = `SKU-${randomNum}`;
              }
              const categoriaName =
                categoriaIdx !== -1
                  ? String(row[categoriaIdx] || "").trim()
                  : null;
              const proveedorName =
                proveedorIdx !== -1
                  ? String(row[proveedorIdx] || "").trim()
                  : null;
              const stock = stockIdx !== -1 ? Number(row[stockIdx]) || 0 : 0;
              const precio = precioIdx !== -1 ? Number(row[precioIdx]) || 0 : 0;
              const unidad =
                unidadIdx !== -1
                  ? String(row[unidadIdx] || "")
                      .trim()
                      .toUpperCase()
                  : "ARS";
              const link =
                linkIdx !== -1 ? String(row[linkIdx] || "").trim() : null;

              // Buscar categoría
              let categoryIds = [];
              if (categoriaName) {
                const normalizedCatName = normalizeColumnName(categoriaName);
                const categoryId = categoryMap.get(normalizedCatName);
                if (categoryId) {
                  categoryIds = [categoryId];
                }
              }

              // Buscar proveedor
              let supplierId = null;
              if (proveedorName) {
                const normalizedSupName = normalizeColumnName(proveedorName);
                supplierId = supplierMap.get(normalizedSupName) || null;
              }

              // Validar moneda
              const currency = ["ARS", "USD", "EUR"].includes(unidad)
                ? unidad
                : "ARS";

              productsToCreate.push({
                sku: sku || null,
                name,
                brand: null, // No hay columna marca
                supplierId,
                description: null,
                link: link || null,
                stockQty: stock,
                price: precio,
                currency,
                taxId: null,
                categoryIds,
              });
            } catch (error) {
              errors.push(`Fila ${index + 2}: ${error.message}`);
            }
          });

          if (productsToCreate.length === 0) {
            alert("No se encontraron productos válidos para importar");
            return;
          }

          setImportProgress({
            total: productsToCreate.length,
            processed: 0,
            errors,
          });

          // Crear o actualizar productos en batch
          const result = await dispatch(
            createProductsBatch({ products: productsToCreate })
          ).unwrap();

          // Recargar productos
          await dispatch(fetchProducts());

          setImportModal(false);
          setImportFile(null);
          setImportPreview(null);
          setImportProgress({ total: 0, processed: 0, errors: [] });

          const createdMsg =
            result.created > 0 ? `${result.created} creados` : "";
          const updatedMsg =
            result.updated > 0 ? `${result.updated} actualizados` : "";
          const messages = [createdMsg, updatedMsg].filter(Boolean);
          const summary =
            messages.length > 0
              ? messages.join(", ")
              : "0 productos procesados";

          alert(
            `Importación completada: ${summary}${
              errors.length > 0
                ? `\n\nErrores encontrados: ${errors.length}`
                : ""
            }`
          );
        } catch (error) {
          console.error("Error importing products:", error);
          alert(
            `Error al importar productos: ${
              error.message || "Error desconocido"
            }`
          );
        }
      };
      reader.readAsArrayBuffer(importFile);
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Error al leer el archivo");
    }
  };
  return (
    <div className="grid gap-3">
      <Toolbar>
        <ToolbarTitle kicker="Catálogo" title="Productos" />
        <ToolbarActions>
          <Select
            value={productTypeFilter}
            onChange={(e) => setProductTypeFilter(e.target.value)}
            className="min-w-[180px]"
          >
            <option value="all">Todos los productos</option>
            <option value="composite">Productos compuestos</option>
            <option value="individual">Productos individuales</option>
          </Select>
          <SearchInput
            placeholder="Buscar por nombre, SKU, marca o proveedor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SecondaryButton onClick={() => setImportModal(true)}>
            Importar Excel
          </SecondaryButton>
          <PrimaryButton onClick={() => navigate("/app/products/new")}>
            Nuevo producto
          </PrimaryButton>
        </ToolbarActions>
      </Toolbar>

      {status === "loading" && <InfoAlert>Cargando productos...</InfoAlert>}
      {error && <ErrorAlert>{error}</ErrorAlert>}

      <Pagination data={filteredItems}>
        {(paginatedItems) => (
          <Table>
            <TableHeader>
              <TableHeaderCell>SKU</TableHeaderCell>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Marca</TableHeaderCell>
              <TableHeaderCell>Proveedor</TableHeaderCell>
              <TableHeaderCell>Stock</TableHeaderCell>
              <TableHeaderCell>Precio</TableHeaderCell>
              <TableHeaderCell>Moneda</TableHeaderCell>
              <TableHeaderCell>IVA</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.sku || "-"}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.brand || "-"}</TableCell>
                  <TableCell>{p.supplier || "-"}</TableCell>
                  <TableCell>{p.stock_qty}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(p.price)}
                  </TableCell>
                  <TableCell>{p.currency}</TableCell>
                  <TableCell>
                    {p.tax_rate !== null && p.tax_rate !== undefined
                      ? `${p.tax_rate}%`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <SecondaryButton
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/products/${p.id}/edit`);
                        }}
                      >
                        Editar
                      </SecondaryButton>
                      <DangerButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteModal({
                            open: true,
                            productId: p.id,
                            productName: p.name,
                          });
                        }}
                      >
                        Eliminar
                      </DangerButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!filteredItems.length && status === "succeeded" && (
                <TableRow>
                  <TableCell colSpan={9}>No hay productos aún.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Pagination>

      <ConfirmModal
        open={deleteModal.open}
        onClose={() =>
          setDeleteModal({ open: false, productId: null, productName: "" })
        }
        onConfirm={handleDelete}
        title="Eliminar producto"
        message={`¿Estás seguro de que deseas eliminar el producto "${deleteModal.productName}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmVariant="danger"
      />

      <Modal
        open={importModal}
        onClose={() => setImportModal(false)}
        wide={true}
      >
        <div className="flex items-center justify-between p-1 mb-1">
          <div className="font-bold">Importar productos desde Excel</div>
          <button
            type="button"
            className="border border-white/20 bg-white/[0.06] text-[#e8eefc] rounded-lg px-2.5 py-1.5 cursor-pointer"
            onClick={() => {
              setImportModal(false);
              setImportFile(null);
              setImportPreview(null);
              setImportProgress({ total: 0, processed: 0, errors: [] });
            }}
          >
            ✕
          </button>
        </div>

        <div className="grid gap-3 p-2">
          <div>
            <Label>Seleccionar archivo Excel</Label>
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
            />
            <div className="text-xs opacity-70 mt-1">
              Columnas esperadas: Categoria, SKU, Producto, Unidad, Proveedor,
              Stock, Precio, Link
            </div>
          </div>

          {importPreview && (
            <div>
              <Label>
                Vista previa ({importPreview.totalRows} productos encontrados)
              </Label>
              <div className="mt-2 max-h-60 overflow-auto border border-white/12 rounded-lg">
                <table className="w-full text-xs">
                  <thead className="bg-white/5 sticky top-0">
                    <tr>
                      {importPreview.headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="px-2 py-1 text-left border-b border-white/10"
                        >
                          {header || `Columna ${idx + 1}`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {importPreview.rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="border-b border-white/5">
                        {importPreview.headers.map((_, colIdx) => (
                          <td key={colIdx} className="px-2 py-1">
                            {row[colIdx] !== undefined && row[colIdx] !== null
                              ? String(row[colIdx])
                              : "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {createError && <ErrorAlert>{createError}</ErrorAlert>}

          {importProgress.errors.length > 0 && (
            <div className="text-xs text-yellow-400">
              <div className="font-semibold mb-1">Advertencias:</div>
              <ul className="list-disc list-inside space-y-0.5 max-h-32 overflow-auto">
                {importProgress.errors.slice(0, 10).map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
                {importProgress.errors.length > 10 && (
                  <li>... y {importProgress.errors.length - 10} más</li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2.5 p-2">
          <SecondaryButton
            onClick={() => {
              setImportModal(false);
              setImportFile(null);
              setImportPreview(null);
              setImportProgress({ total: 0, processed: 0, errors: [] });
            }}
          >
            Cancelar
          </SecondaryButton>
          <PrimaryButton
            onClick={handleImport}
            disabled={!importFile || createStatus === "loading"}
          >
            {createStatus === "loading" ? "Importando..." : "Importar"}
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}
