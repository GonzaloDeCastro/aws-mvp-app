import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../redux/productsSlice";
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

export default function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((s) => s.products);

  const [search, setSearch] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState("all"); // "all", "composite", "individual"
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    productId: null,
    productName: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
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
        return (
          sku.toLowerCase().includes(term) ||
          name.toLowerCase().includes(term) ||
          brand.toLowerCase().includes(term)
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
            placeholder="Buscar por nombre, SKU o marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
                  <TableCell colSpan={8}>No hay productos aún.</TableCell>
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
    </div>
  );
}
