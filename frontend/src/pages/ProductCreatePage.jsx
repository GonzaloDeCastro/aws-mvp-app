import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  fetchCategories,
  fetchProducts,
  createCategory,
} from "../redux/productsSlice";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import Toolbar, {
  ToolbarTitle,
  ToolbarActions,
} from "../components/ui/Toolbar";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Select from "../components/ui/Select";
import { ErrorAlert, InfoAlert } from "../components/ui/Alert";

export default function ProductCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    createStatus,
    createError,
    categories,
    items: products,
  } = useSelector((s) => s.products);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    brand: "",
    description: "",
    stockQty: 0,
    price: 0,
    currency: "ARS",
    categoryId: "",
    components: [],
  });

  const [newComponent, setNewComponent] = useState({ id: "", qty: 1 });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const set = (k) => (e) => {
    const value = e.target.value;
    setForm((v) => ({ ...v, [k]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[k]) {
      setErrors((e) => ({ ...e, [k]: undefined }));
    }
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

    // Verificar que no se agregue a sí mismo
    if (form.components.some((c) => c.id === Number(newComponent.id))) {
      return;
    }

    setForm((v) => ({
      ...v,
      components: [
        ...v.components,
        {
          id: Number(newComponent.id),
          qty: Number(newComponent.qty) || 1,
        },
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

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!form.sku.trim()) {
      newErrors.sku = "El SKU es obligatorio";
    }

    if (!hasComponents && (!form.price || Number(form.price) <= 0)) {
      newErrors.price = "El precio es obligatorio y debe ser mayor a 0";
    }

    if (Number(form.stockQty) < 0) {
      newErrors.stockQty = "La cantidad en stock no puede ser negativa";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onCreate = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(
        createProduct({
          sku: form.sku.trim() || null,
          name: form.name.trim(),
          brand: form.brand.trim() || null,
          description: form.description.trim() || null,
          stockQty: Number(form.stockQty) || 0,
          price: hasComponents ? calculatedPrice : Number(form.price) || 0,
          currency: form.currency || "ARS",
          categoryIds: form.categoryId ? [Number(form.categoryId)] : [],
          components: form.components,
        })
      ).unwrap();

      navigate("/app/products");
    } catch (error) {
      // El error se maneja en createError del estado
    }
  };

  const disabled =
    !form.name.trim() ||
    !form.sku.trim() ||
    createStatus === "loading" ||
    createStatus === "succeeded";

  return (
    <div className="grid gap-3">
      <Toolbar>
        <ToolbarTitle kicker="Productos" title="Nuevo producto" />
        <ToolbarActions>
          <SecondaryButton onClick={() => navigate("/app/products")}>
            Cancelar
          </SecondaryButton>
          <PrimaryButton onClick={onCreate} disabled={disabled}>
            {createStatus === "loading" ? "Creando..." : "Crear"}
          </PrimaryButton>
        </ToolbarActions>
      </Toolbar>

      {createError && <ErrorAlert>{createError}</ErrorAlert>}

      <Card>
        <div className="grid grid-cols-2 gap-2">
          <div className="w-full">
            <Label>Nombre *</Label>
            <Input
              value={form.name}
              onChange={set("name")}
              placeholder="Nombre del producto"
              className={errors.name ? "border-red-500/50" : ""}
            />
            {errors.name && (
              <div className="text-xs text-red-400 mt-1">{errors.name}</div>
            )}
          </div>

          <div className="w-full">
            <Label>SKU *</Label>
            <Input
              value={form.sku}
              onChange={set("sku")}
              placeholder="SKU del producto"
              className={`w-full ${errors.sku ? "border-red-500/50" : ""}`}
            />
            {errors.sku && (
              <div className="text-xs text-red-400 mt-1">{errors.sku}</div>
            )}
          </div>

          <div className="w-full">
            <Label>Marca</Label>
            <Input
              value={form.brand}
              onChange={set("brand")}
              placeholder="Marca opcional"
            />
          </div>

          <div className="w-full">
            <Label>Categoría (opcional)</Label>
            <div className="flex gap-1.5">
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
              <SecondaryButton onClick={() => setShowCategoryModal(true)}>
                + Nueva
              </SecondaryButton>
            </div>
          </div>

          <div className="col-span-2">
            <Label>Descripción</Label>
            <textarea
              className="rounded-xl border border-white/12 bg-[rgba(0,0,0,0.22)] px-3 py-2.5 text-[#e8eefc] outline-none min-h-[60px] resize-y placeholder:text-white/50 w-full"
              value={form.description}
              onChange={set("description")}
              placeholder="Descripción opcional"
            />
          </div>

          <div className="w-full">
            <Label>Cantidad en stock</Label>
            <Input
              type="number"
              min="0"
              value={form.stockQty}
              onChange={set("stockQty")}
              className={`w-full ${errors.stockQty ? "border-red-500/50" : ""}`}
            />
            {errors.stockQty && (
              <div className="text-xs text-red-400 mt-1">{errors.stockQty}</div>
            )}
          </div>

          <div className="w-full">
            <Label>
              Precio {hasComponents && "(se calcula automáticamente)"} *
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
              className={errors.price ? "border-red-500/50" : ""}
            />
            {errors.price && (
              <div className="text-xs text-red-400 mt-1">{errors.price}</div>
            )}
          </div>

          <div className="w-full">
            <Label>Moneda</Label>
            <Select value={form.currency} onChange={set("currency")}>
              <option value="ARS">ARS</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </Select>
          </div>

          <div className="col-span-2 border-t border-white/12 pt-2 mt-1">
            <Label>Componentes (productos hijos) - Opcional</Label>
            <div className="text-xs opacity-70 mb-1.5">
              Si agregas componentes, el precio se calculará automáticamente
            </div>

            <div className="flex gap-1.5 mb-1.5 items-center">
              <div className="flex-1 min-w-0">
                <Select
                  value={newComponent.id}
                  onChange={(e) =>
                    setNewComponent({ ...newComponent, id: e.target.value })
                  }
                >
                  <option value="">Seleccionar producto...</option>
                  {availableProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} {p.description ? `- ${p.description}` : ""} - $
                      {p.price} {p.currency}
                    </option>
                  ))}
                </Select>
              </div>
              <Input
                type="number"
                min="0.01"
                step="0.01"
                value={newComponent.qty}
                onChange={(e) =>
                  setNewComponent({
                    ...newComponent,
                    qty: e.target.value,
                  })
                }
                placeholder="Cant."
                className="!w-14 flex-shrink-0"
              />
              <SecondaryButton
                onClick={addComponent}
                disabled={!newComponent.id}
                className="flex-shrink-0"
              >
                Agregar
              </SecondaryButton>
            </div>

            {form.components.length > 0 && (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {form.components.map((comp) => {
                  const product = products.find((p) => p.id === comp.id);
                  if (!product) return null;
                  return (
                    <div
                      key={comp.id}
                      className="flex items-center gap-1.5 p-1.5 bg-white/5 rounded text-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {product.name}
                        </div>
                        <div className="text-xs opacity-70 truncate">
                          {product.description ||
                            `${product.brand || ""} - $${product.price} ${
                              product.currency
                            } c/u`.trim()}
                        </div>
                      </div>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={comp.qty}
                        onChange={(e) =>
                          updateComponentQty(comp.id, e.target.value)
                        }
                        className="w-14 text-xs"
                      />
                      <div className="text-xs opacity-70 w-14 text-right">
                        ${(Number(comp.qty) * product.price).toFixed(2)}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeComponent(comp.id)}
                        className="text-red-400 hover:text-red-300 px-1 flex-shrink-0 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
                <div className="text-xs font-medium pt-1.5 border-t border-white/12">
                  Total estimado: $
                  {form.components
                    .reduce((sum, comp) => {
                      const product = products.find((p) => p.id === comp.id);
                      return sum + (product?.price || 0) * comp.qty;
                    }, 0)
                    .toFixed(2)}{" "}
                  {form.currency}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Modal para crear categoría */}
      <Modal
        open={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        wide={true}
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
