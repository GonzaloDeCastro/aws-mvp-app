import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiPost } from "../api";
import { fetchCompany } from "../redux/companySlice";
import Card from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/Button";
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

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCompany());
    }
  }, [dispatch, status]);

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
            <Label>Nombre</Label>
            <div className="px-3 py-2.5 rounded-xl border border-white/12 bg-[rgba(0,0,0,0.22)] text-[#e8eefc] text-sm">
              {company?.name || "-"}
            </div>
          </div>

          <div>
            <Label>Email</Label>
            <div className="px-3 py-2.5 rounded-xl border border-white/12 bg-[rgba(0,0,0,0.22)] text-[#e8eefc] text-sm">
              {company?.email || "-"}
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
              className="mt-1 text-xs"
            />
            {uploadError && (
              <ErrorAlert className="mt-2 text-xs py-2">
                {uploadError}
              </ErrorAlert>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton disabled={!base64 || uploading} onClick={onSave}>
            {uploading ? "Guardando..." : "Guardar logo"}
          </PrimaryButton>
        </div>
      </Card>
    </div>
  );
}
