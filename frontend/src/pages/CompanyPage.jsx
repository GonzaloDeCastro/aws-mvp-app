import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiPost } from "../api";
import { fetchCompany } from "../redux/companySlice";

export default function CompanyPage() {
  const dispatch = useDispatch();
  const { current: company, status, error } = useSelector((s) => s.company);

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCompany());
    }
  }, [dispatch, status]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
    reader.readAsDataURL(file);
  };

  const onSave = async () => {
    if (!base64) return;
    try {
      setUploading(true);
      await apiPost("/company/logo", { logo: base64 });
      setUploading(false);
      setBase64(null);
      dispatch(fetchCompany());
    } catch (e) {
      console.error(e);
      setUploading(false);
    }
  };

  const effectiveLogo = preview
    ? preview
    : company?.logo
    ? `data:image/png;base64,${company.logo}`
    : null;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={styles.toolbar}>
        <div>
          <div style={styles.kicker}>Configuración</div>
          <h2 style={styles.h2}>Compañía</h2>
        </div>
      </div>

      {status === "loading" && (
        <div style={styles.infoBox}>Cargando datos de la compañía...</div>
      )}
      {error && <div style={styles.errorBox}>{error}</div>}

      <div style={styles.card}>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Nombre</label>
            <div style={styles.readonly}>{company?.name || "-"}</div>
          </div>

          <div>
            <label style={styles.label}>Email</label>
            <div style={styles.readonly}>{company?.email || "-"}</div>
          </div>

          <div>
            <label style={styles.label}>Logo actual</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {effectiveLogo ? (
                <img
                  src={effectiveLogo}
                  alt="Logo"
                  style={{ height: 64, objectFit: "contain", borderRadius: 8 }}
                />
              ) : (
                <div style={styles.readonly}>Sin logo</div>
              )}
            </div>
          </div>

          <div>
            <label style={styles.label}>Subir nuevo logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{ marginTop: 4 }}
            />
          </div>
        </div>

        <div style={styles.footerRow}>
          <button
            style={styles.primaryBtn}
            disabled={!base64 || uploading}
            onClick={onSave}
          >
            {uploading ? "Guardando..." : "Guardar logo"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
  },
  kicker: { fontSize: 11, opacity: 0.7 },
  h2: { margin: 0, fontSize: 18 },
  card: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    padding: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 12,
    marginBottom: 12,
  },
  label: { fontSize: 12, opacity: 0.8, marginBottom: 4 },
  readonly: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.22)",
    color: "#e8eefc",
    fontSize: 13,
  },
  footerRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  primaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(120,160,255,0.22)",
    color: "#e8eefc",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
  },
  infoBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.18)",
  },
  errorBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,80,80,0.25)",
    background: "rgba(255,80,80,0.08)",
    color: "#ffd4d4",
  },
};
