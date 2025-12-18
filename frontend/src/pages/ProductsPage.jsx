import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  fetchProducts,
  fetchCategories,
  createCategory,
} from "../redux/productsSlice";
import Modal from "../components/ui/Modal";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Select from "../components/ui/Select";
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
import { InfoAlert, ErrorAlert } from "../components/ui/Alert";

function NewProductModal({
  open,
  onClose,
  onSubmit,
  loading,
  onOpenCategoryModal,
}) {
  const dispatch = useDispatch();
  const { categories, items: products } = useSelector((s) => s.products);

  const initialForm = {
    sku: "",
    name: "",
    brand: "",
    description: "",
    stockQty: 0,
    price: 0,
    currency: "ARS",
    categoryId: "",
    components: [],
  };
  const [form, setForm] = useState(initialForm);
  const [newComponent, setNewComponent] = useState({ id: "", qty: 1 });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    if (!open) return;
    setForm(initialForm);
    setNewComponent({ id: "", qty: 1 });
    setShowCategoryModal(false);
    setNewCategoryName("");
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, dispatch]);

  const set = (k) => (e) => {
    const value = e.target.value;
    setForm((v) => ({ ...v, [k]: value }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setForm((v) => ({ ...v, categoryId: value === "none" ? "" : value }));
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await dispatch(createCategory({ name: newCategoryName.trim() })).unwrap();
      await dispatch(fetchCategories());
      setNewCategoryName("");
      setShowCategoryModal(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const addComponent = () => {
    if (!newComponent.id) return;
    const product = products.find((p) => p.id === Number(newComponent.id));
    if (!product) return;
    if (form.components.some((c) => c.id === Number(newComponent.id))) return;

    setForm((v) => ({
      ...v,
      components: [
        ...v.components,
        { id: Number(newComponent.id), qty: Number(newComponent.qty) || 1 },
      ],
    }));
    setNewComponent({ id: "", qty: 1 });
  };

  const removeComponent = (componentId) => {
    setForm((v) => ({
      ...v,
      components: v.components.filter((c) => c.id !== componentId),
    }));
  };

  const updateComponentQty = (componentId, qty) => {
    setForm((v) => ({
      ...v,
      components: v.components.map((c) =>
        c.id === componentId ? { ...c, qty: Number(qty) || 1 } : c
      ),
    }));
  };

  const hasComponents = form.components.length > 0;
  const availableProducts = products.filter(
    (p) => !form.components.some((c) => c.id === p.id)
  );

  // Calcular precio automáticamente cuando hay componentes
  const calculatedPrice = useMemo(() => {
    if (!hasComponents) return form.price;
    return form.components.reduce((sum, comp) => {
      const product = products.find((p) => p.id === comp.id);
      return sum + (product?.price || 0) * comp.qty;
    }, 0);
  }, [form.components, form.price, hasComponents, products]);

  // Actualizar precio cuando se agregan/quitan componentes o cambian las cantidades
  const componentsKey = JSON.stringify(
    form.components.map((c) => ({ id: c.id, qty: c.qty }))
  );

  useEffect(() => {
    if (hasComponents && products.length > 0) {
      const newPrice = form.components.reduce((sum, comp) => {
        const product = products.find((p) => p.id === comp.id);
        return sum + (product?.price || 0) * comp.qty;
      }, 0);

      // Solo actualizar si hay diferencia significativa
      if (Math.abs(form.price - newPrice) > 0.01) {
        setForm((v) => ({
          ...v,
          price: newPrice,
        }));
      }
    }
  }, [componentsKey, hasComponents, products.length]); // Cuando cambian componentes

  return (
    <Modal open={open} onClose={onClose} wide={true}>
      <div className="flex items-center justify-between p-1 mb-1">
        <div className="font-bold">Nuevo producto</div>
        <button
          type="button"
          className="border border-white/20 bg-white/[0.06] text-[#e8eefc] rounded-lg px-2.5 py-1.5 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 p-2">
        <div>
          <Label>Nombre *</Label>
          <Input value={form.name} onChange={set("name")} />
        </div>

        <div>
          <Label>SKU</Label>
          <Input value={form.sku} onChange={set("sku")} />
        </div>

        <div>
          <Label>Marca</Label>
          <Input value={form.brand} onChange={set("brand")} />
        </div>

        <div>
          <Label>Categoría (opcional)</Label>
          <div className="flex gap-2">
            <Select
              value={form.categoryId || "none"}
              onChange={handleCategoryChange}
              className="flex-1"
            >
              <option value="none">Ninguna</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
            <SecondaryButton onClick={onOpenCategoryModal}>
              + Nueva
            </SecondaryButton>
          </div>
        </div>

        <div className="col-span-2">
          <Label>Descripción</Label>
          <textarea
            className="rounded-xl border border-white/12 bg-[rgba(0,0,0,0.22)] px-3 py-2.5 text-[#e8eefc] outline-none min-h-[50px] resize-y placeholder:text-white/50 w-full"
            value={form.description}
            onChange={set("description")}
          />
        </div>

        <div>
          <Label>Cantidad en stock</Label>
          <Input
            type="number"
            min="0"
            value={form.stockQty}
            onChange={set("stockQty")}
          />
        </div>

        <div>
          <Label>
            Precio {hasComponents && "(se calcula automáticamente)"}
          </Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={hasComponents ? calculatedPrice.toFixed(2) : form.price}
            onChange={set("price")}
            disabled={hasComponents}
            placeholder={hasComponents ? "Se calcula desde componentes" : ""}
            readOnly={hasComponents}
          />
        </div>

        <div>
          <Label>Moneda</Label>
          <Select value={form.currency} onChange={set("currency")}>
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Select>
        </div>

        <div className="col-span-2 border-t border-white/12 pt-2 mt-2">
          <Label>Componentes (productos hijos) - Opcional</Label>
          <div className="text-xs opacity-70 mb-2">
            Si agregas componentes, el precio se calculará automáticamente
          </div>

          <div className="flex gap-2 mb-2">
            <Select
              value={newComponent.id}
              onChange={(e) =>
                setNewComponent({ ...newComponent, id: e.target.value })
              }
              className="flex-1"
            >
              <option value="">Seleccionar producto...</option>
              {availableProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - ${p.price} {p.currency}
                </option>
              ))}
            </Select>
            <Input
              type="number"
              min="0.01"
              step="0.01"
              value={newComponent.qty}
              onChange={(e) =>
                setNewComponent({ ...newComponent, qty: e.target.value })
              }
              placeholder="Cant."
              className="w-20"
            />
            <SecondaryButton onClick={addComponent} disabled={!newComponent.id}>
              +
            </SecondaryButton>
          </div>

          {form.components.length > 0 && (
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {form.components.map((comp) => {
                const product = products.find((p) => p.id === comp.id);
                if (!product) return null;
                return (
                  <div
                    key={comp.id}
                    className="flex items-center gap-2 p-1.5 bg-white/5 rounded text-sm"
                  >
                    <div className="flex-1 truncate">{product.name}</div>
                    <Input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={comp.qty}
                      onChange={(e) =>
                        updateComponentQty(comp.id, e.target.value)
                      }
                      className="w-16 text-sm"
                    />
                    <div className="text-xs opacity-70 w-20 text-right">
                      ${(Number(comp.qty) * product.price).toFixed(2)}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeComponent(comp.id)}
                      className="text-red-400 hover:text-red-300 px-1"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2.5 p-2">
        <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
        <PrimaryButton
          disabled={loading || !form.name.trim()}
          onClick={() => {
            onSubmit({
              ...form,
              price: hasComponents ? calculatedPrice : Number(form.price) || 0,
              categoryIds: form.categoryId ? [Number(form.categoryId)] : [],
            });
          }}
        >
          {loading ? "Creando..." : "Crear"}
        </PrimaryButton>
      </div>
    </Modal>
  );
}

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error, createStatus, createError } = useSelector(
    (s) => s.products
  );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await dispatch(createCategory({ name: newCategoryName.trim() })).unwrap();
      await dispatch(fetchCategories());
      setNewCategoryName("");
      setShowCategoryModal(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((p) => {
      const sku = p.sku || "";
      const name = p.name || "";
      const brand = p.brand || "";
      return (
        sku.toLowerCase().includes(term) ||
        name.toLowerCase().includes(term) ||
        brand.toLowerCase().includes(term)
      );
    });
  }, [items, search]);

  const onCreate = async (payload) => {
    await dispatch(
      createProduct({
        sku: payload.sku || null,
        name: payload.name.trim(),
        brand: payload.brand || null,
        description: payload.description || null,
        stockQty: Number(payload.stockQty) || 0,
        price: Number(payload.price) || 0,
        currency: payload.currency || "ARS",
        categoryIds: payload.categoryIds || [],
        components: payload.components || [],
      })
    ).unwrap();
    setOpen(false);
    dispatch(fetchProducts());
  };

  return (
    <div className="grid gap-3">
      <Toolbar>
        <ToolbarTitle kicker="Catálogo" title="Productos" />
        <ToolbarActions>
          <SearchInput
            placeholder="Buscar por nombre, SKU o marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <PrimaryButton onClick={() => setOpen(true)}>
            Nuevo producto
          </PrimaryButton>
        </ToolbarActions>
      </Toolbar>

      {status === "loading" && <InfoAlert>Cargando productos...</InfoAlert>}
      {error && <ErrorAlert>{error}</ErrorAlert>}

      <Table>
        <TableHeader>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>SKU</TableHeaderCell>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Marca</TableHeaderCell>
          <TableHeaderCell>Stock</TableHeaderCell>
          <TableHeaderCell>Precio</TableHeaderCell>
          <TableHeaderCell>Moneda</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {filteredItems.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.sku || "-"}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.brand || "-"}</TableCell>
              <TableCell>{p.stock_qty}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.currency}</TableCell>
            </TableRow>
          ))}
          {!filteredItems.length && status === "succeeded" && (
            <TableRow>
              <TableCell colSpan={7}>No hay productos aún.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {createError && <ErrorAlert>{createError}</ErrorAlert>}

      <NewProductModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onCreate}
        loading={createStatus === "loading"}
        onOpenCategoryModal={() => setShowCategoryModal(true)}
      />

      {/* Modal para crear categoría */}
      <Modal
        open={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        wide={false}
      >
        <div className="flex items-center justify-between p-1 mb-1">
          <div className="font-bold">Nueva categoría</div>
          <button
            type="button"
            className="border border-white/20 bg-white/[0.06] text-[#e8eefc] rounded-lg px-2.5 py-1.5 cursor-pointer"
            onClick={() => setShowCategoryModal(false)}
          >
            ✕
          </button>
        </div>

        <div className="grid gap-2 p-2">
          <Label>Nombre *</Label>
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nombre de la categoría"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateCategory();
              }
            }}
          />
        </div>

        <div className="flex justify-end gap-2.5 p-2">
          <SecondaryButton onClick={() => setShowCategoryModal(false)}>
            Cancelar
          </SecondaryButton>
          <PrimaryButton
            onClick={handleCreateCategory}
            disabled={!newCategoryName.trim()}
          >
            Crear
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}
