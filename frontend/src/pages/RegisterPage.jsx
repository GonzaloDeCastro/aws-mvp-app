import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerCompany } from "../redux/companyRegisterSlice";
import { login } from "../redux/authSlice";
import logoPresuflow from "../assets/logo-presuflow.png";
import Card from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { ErrorAlert } from "../components/ui/Alert";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((s) => s.auth);
  const { status, error } = useSelector((s) => s.companyRegister);

  const [form, setForm] = useState({
    // Company fields
    name: "",
    legalName: "",
    taxId: "",
    email: "",
    phone: "",
    address: "",
    logo: null,
    logoPreview: null,
    // User fields
    firstName: "",
    lastName: "",
    userEmail: "",
    password: "",
  });

  useEffect(() => {
    if (token) navigate("/app/products", { replace: true });
  }, [token, navigate]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setForm((prev) => ({
          ...prev,
          logoPreview: result,
          logo: result.split(",")[1], // Extract base64 without data URL prefix
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerCompany(form));
    if (registerCompany.fulfilled.match(result)) {
      // The backend returns token and user, so we login automatically
      if (result.payload?.token && result.payload?.user) {
        dispatch(
          login.fulfilled({
            token: result.payload.token,
            user: result.payload.user,
          })
        );
      }
      navigate("/app/products", { replace: true });
    }
  };

  const isFormValid =
    form.name.trim() &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.userEmail.trim() &&
    form.password.length >= 6;

  return (
    <div className="h-screen grid place-items-center bg-[#0b1220] text-[#e8eefc] p-4">
      <Card className="w-full max-w-[900px]">
        <header className="flex gap-3 items-center p-2 rounded-[14px] bg-black/30 border border-white/8 mb-3">
          <img src={logoPresuflow} alt="Logo" className="h-[40px]" />
          <div>
            <div className="text-xs opacity-75">
              Registra tu compañía para comenzar
            </div>
          </div>
        </header>

        <form onSubmit={onSubmit} className="grid gap-3 p-2">
          <div className="grid grid-cols-2 gap-3 border-b border-white/10 pb-3">
            <h3 className="text-xs font-semibold opacity-90 col-span-2 mb-1">
              Datos de la compañía
            </h3>

            <div>
              <Label>Nombre de la compañía *</Label>
              <Input
                size="sm"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Mi Empresa S.A."
                required
              />
            </div>

            <div>
              <Label>Razón social</Label>
              <Input
                size="sm"
                value={form.legalName}
                onChange={handleChange("legalName")}
                placeholder="Mi Empresa Sociedad Anónima"
              />
            </div>

            <div>
              <Label>CUIT/CUIL</Label>
              <Input
                size="sm"
                value={form.taxId}
                onChange={handleChange("taxId")}
                placeholder="30-12345678-9"
              />
            </div>

            <div>
              <Label>Email de la compañía</Label>
              <Input
                size="sm"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="contacto@miempresa.com"
              />
            </div>

            <div>
              <Label>Teléfono</Label>
              <Input
                size="sm"
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="+54 341 0000000"
              />
            </div>

            <div>
              <Label>Dirección</Label>
              <Input
                size="sm"
                value={form.address}
                onChange={handleChange("address")}
                placeholder="Calle 123, Ciudad"
              />
            </div>

            <div className="col-span-2">
              <Label>Logo (opcional)</Label>
              <div className="flex items-center gap-2">
                {form.logoPreview && (
                  <img
                    src={form.logoPreview}
                    alt="Preview"
                    className="h-12 object-contain rounded-lg border border-white/12"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <h3 className="text-xs font-semibold opacity-90 col-span-2 mb-1">
              Tu cuenta de usuario
            </h3>

            <div>
              <Label>Nombre *</Label>
              <Input
                size="sm"
                value={form.firstName}
                onChange={handleChange("firstName")}
                placeholder="Juan"
                required
              />
            </div>

            <div>
              <Label>Apellido *</Label>
              <Input
                size="sm"
                value={form.lastName}
                onChange={handleChange("lastName")}
                placeholder="Pérez"
                required
              />
            </div>

            <div>
              <Label>Email *</Label>
              <Input
                size="sm"
                type="email"
                value={form.userEmail}
                onChange={handleChange("userEmail")}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <Label>Contraseña *</Label>
              <Input
                size="sm"
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && <ErrorAlert className="text-xs py-2">{error}</ErrorAlert>}

          <PrimaryButton
            className="mt-1 text-sm py-2"
            disabled={!isFormValid || status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Registrando..." : "Registrar compañía"}
          </PrimaryButton>

          <div className="text-center text-xs opacity-70">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-[rgba(120,160,255,0.8)] hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
