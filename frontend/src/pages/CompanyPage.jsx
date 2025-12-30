import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiPost } from "../api";
import {
  fetchCompany,
  updateDollarRate,
  updateCompany,
} from "../redux/companySlice";
import Card from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Toolbar, { ToolbarTitle } from "../components/ui/Toolbar";
import { InfoAlert, ErrorAlert } from "../components/ui/Alert";

export default function CompanyPage() {
  const dispatch = useDispatch();
  const { current: company, status, error } = useSelector((s) => s.company);

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [dollarRate, setDollarRate] = useState("");
  const [savingDollarRate, setSavingDollarRate] = useState(false);
  const [dollarRateError, setDollarRateError] = useState("");

  // Estados para edición de datos de compañía
  const [form, setForm] = useState({
    name: "",
    legalName: "",
    taxId: "",
    email: "",
    phone: "",
    address: "",
  });
  const [savingCompany, setSavingCompany] = useState(false);
  const [companyError, setCompanyError] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCompany());
    }
  }, [dispatch, status]);

  // Sincronizar dollarRate y formulario cuando se carga la compañía
  useEffect(() => {
    if (company?.dollar_rate !== undefined) {
      setDollarRate(String(company.dollar_rate));
    }
    if (company) {
      setForm({
        name: company.name || "",
        legalName: company.legal_name || "",
        taxId: company.tax_id || "",
        email: company.email || "",
        phone: company.phone || "",
        address: company.address || "",
      });
    }
  }, [company]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setUploadError("");
      setPreview(null);
      setBase64(null);
      return;
    }

    // Validar tamaño del archivo (máximo 2MB)
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB en bytes
    if (file.size > MAX_SIZE) {
      setUploadError(
        `El archivo es demasiado grande. Tamaño máximo: 2MB. Tu archivo: ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)}MB`
      );
      setPreview(null);
      setBase64(null);
      e.target.value = ""; // Limpiar el input
      return;
    }

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      setUploadError("Por favor selecciona un archivo de imagen válido");
      setPreview(null);
      setBase64(null);
      e.target.value = "";
      return;
    }

    setUploadError("");

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setPreview(result);
        const commaIdx = result.indexOf(",");
        const pureBase64 = commaIdx >= 0 ? result.slice(commaIdx + 1) : result;
        setBase64(pureBase64);
      }
    };
    reader.onerror = () => {
      setUploadError(
        "Error al leer el archivo. Por favor intenta con otro archivo."
      );
      setPreview(null);
      setBase64(null);
    };
    reader.readAsDataURL(file);
  };

  const onSave = async () => {
    if (!base64) return;
    try {
      setUploading(true);
      setUploadError("");
      await apiPost("/company/logo", { logo: base64 });
      setUploading(false);
      setBase64(null);
      setPreview(null);
      dispatch(fetchCompany());
    } catch (e) {
      console.error(e);
      setUploading(false);
      const errorMessage =
        e.message?.includes("too large") ||
        e.message?.includes("tamaño") ||
        e.message?.includes("size")
          ? "El archivo es demasiado grande. Por favor selecciona una imagen más pequeña (máximo 2MB)."
          : e.message ||
            "Error al guardar el logo. Por favor intenta nuevamente.";
      setUploadError(errorMessage);
    }
  };

  const onSaveDollarRate = async () => {
    const rate = Number(dollarRate);
    if (!Number.isFinite(rate) || rate <= 0) {
      setDollarRateError("El dólar referencia debe ser un número mayor a 0");
      return;
    }

    try {
      setSavingDollarRate(true);
      setDollarRateError("");
      await dispatch(updateDollarRate(rate)).unwrap();
      setSavingDollarRate(false);
    } catch (e) {
      setSavingDollarRate(false);
      setDollarRateError(e.message || "Error al guardar el dólar referencia");
    }
  };

  const onSaveCompany = async () => {
    if (!form.name.trim()) {
      setCompanyError("El nombre de la compañía es obligatorio");
      return;
    }

    try {
      setSavingCompany(true);
      setCompanyError("");
      await dispatch(
        updateCompany({
          name: form.name.trim(),
          legalName: form.legalName.trim() || null,
          taxId: form.taxId.trim() || null,
          email: form.email.trim() || null,
          phone: form.phone.trim() || null,
          address: form.address.trim() || null,
        })
      ).unwrap();
      setSavingCompany(false);
    } catch (e) {
      setSavingCompany(false);
      setCompanyError(e.message || "Error al guardar los datos de la compañía");
    }
  };

  const effectiveLogo = preview
    ? preview
    : company?.logo
    ? `data:image/png;base64,${company.logo}`
    : null;

  return (
    <div className="grid gap-3">
      <Toolbar>
        <ToolbarTitle kicker="Configuración" title="Compañía" />
      </Toolbar>

      {status === "loading" && (
        <InfoAlert>Cargando datos de la compañía...</InfoAlert>
      )}
      {error && <ErrorAlert>{error}</ErrorAlert>}

      <Card>
        <div className="grid grid-cols-1 gap-3 mb-3">
          <div>
            <Label>Nombre de la compañía *</Label>
            <Input
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
                setCompanyError("");
              }}
              placeholder="Nombre de la compañía"
            />
          </div>

          <div>
            <Label>Razón social</Label>
            <Input
              value={form.legalName}
              onChange={(e) => {
                setForm((f) => ({ ...f, legalName: e.target.value }));
                setCompanyError("");
              }}
              placeholder="Razón social (opcional)"
            />
          </div>

          <div>
            <Label>CUIT/CUIL</Label>
            <Input
              value={form.taxId}
              onChange={(e) => {
                setForm((f) => ({ ...f, taxId: e.target.value }));
                setCompanyError("");
              }}
              placeholder="30-12345678-9 (opcional)"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm((f) => ({ ...f, email: e.target.value }));
                setCompanyError("");
              }}
              placeholder="contacto@empresa.com (opcional)"
            />
          </div>

          <div>
            <Label>Teléfono</Label>
            <Input
              value={form.phone}
              onChange={(e) => {
                setForm((f) => ({ ...f, phone: e.target.value }));
                setCompanyError("");
              }}
              placeholder="+54 341 0000000 (opcional)"
            />
          </div>

          <div>
            <Label>Dirección</Label>
            <Input
              value={form.address}
              onChange={(e) => {
                setForm((f) => ({ ...f, address: e.target.value }));
                setCompanyError("");
              }}
              placeholder="Dirección (opcional)"
            />
          </div>

          {companyError && (
            <ErrorAlert className="text-xs py-2">{companyError}</ErrorAlert>
          )}

          <div className="flex justify-end pt-2 border-t border-white/12">
            <PrimaryButton
              onClick={onSaveCompany}
              disabled={savingCompany || !form.name.trim()}
              className="cursor-pointer"
            >
              {savingCompany ? "Guardando..." : "Guardar datos de compañía"}
            </PrimaryButton>
          </div>
        </div>
      </Card>

      <Card>
        <div className="grid grid-cols-1 gap-3 mb-3">
          <div>
            <Label>Dólar Referencia (USD)</Label>
            <div className="flex gap-2 items-start">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={dollarRate}
                onChange={(e) => {
                  setDollarRate(e.target.value);
                  setDollarRateError("");
                }}
                className="flex-1"
                placeholder="1470.00"
              />
              <PrimaryButton
                onClick={onSaveDollarRate}
                disabled={savingDollarRate || !dollarRate}
                className="cursor-pointer"
              >
                {savingDollarRate ? "Guardando..." : "Guardar"}
              </PrimaryButton>
            </div>
            {dollarRateError && (
              <ErrorAlert className="mt-2 text-xs py-2">
                {dollarRateError}
              </ErrorAlert>
            )}
            <div className="text-xs opacity-70 mt-1">
              Este valor se usará para convertir precios en USD a ARS en los
              presupuestos
            </div>
          </div>

          <div>
            <Label>Logo actual</Label>
            <div className="flex items-center gap-3">
              {effectiveLogo ? (
                <img
                  src={effectiveLogo}
                  alt="Logo"
                  className="h-16 object-contain rounded-lg"
                />
              ) : (
                <div className="px-3 py-2.5 rounded-xl border border-white/12 bg-[rgba(0,0,0,0.22)] text-[#e8eefc] text-sm">
                  Sin logo
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Subir nuevo logo</Label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="mt-1 text-xs cursor-pointer"
            />
            {uploadError && (
              <ErrorAlert className="mt-2 text-xs py-2">
                {uploadError}
              </ErrorAlert>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton
            disabled={!base64 || uploading}
            onClick={onSave}
            className="cursor-pointer"
          >
            {uploading ? "Guardando..." : "Guardar logo"}
          </PrimaryButton>
        </div>
      </Card>
    </div>
  );
}
