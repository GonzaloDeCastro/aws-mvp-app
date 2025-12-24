import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import logoPresuflow from "../assets/logo-presuflow.png";
import Card from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { InfoAlert, ErrorAlert } from "../components/ui/Alert";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token de recuperación no válido o faltante");
    }
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setStatus("error");
      setMessage("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Las contraseñas no coinciden");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Error al restablecer la contraseña");
      }

      setStatus("success");
      setMessage("Contraseña restablecida exitosamente");

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setStatus("error");
      setMessage(
        error.message ||
          "Error al procesar la solicitud. El token puede haber expirado."
      );
    }
  };

  if (!token && status === "error") {
    return (
      <div className="h-screen grid place-items-center bg-[#0b1220] text-[#e8eefc] p-4">
        <Card className="w-full max-w-[420px]">
          <header className="flex gap-3 items-center p-3 rounded-[14px] bg-black/30 border border-white/8 mb-3.5">
            <img src={logoPresuflow} alt="Logo" className="h-[50px]" />
            <div>
              <div className="text-xs opacity-75">Restablecer contraseña</div>
            </div>
          </header>

          <div className="grid gap-3 p-1.5">
            <ErrorAlert>
              <div className="text-center">
                <div className="text-sm mb-2">{message}</div>
              </div>
            </ErrorAlert>
            <div className="text-center text-xs opacity-70">
              <Link
                to="/login"
                className="text-[rgba(120,160,255,0.8)] hover:underline"
              >
                Volver al login
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen grid place-items-center bg-[#0b1220] text-[#e8eefc] p-4">
      <Card className="w-full max-w-[420px]">
        <header className="flex gap-3 items-center p-3 rounded-[14px] bg-black/30 border border-white/8 mb-3.5">
          <img src={logoPresuflow} alt="Logo" className="h-[50px]" />
          <div>
            <div className="text-xs opacity-75">Restablecer contraseña</div>
          </div>
        </header>

        <form onSubmit={onSubmit} className="grid gap-2.5 p-1.5">
          <Label>Nueva contraseña</Label>
          <div className="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              type={showPassword ? "text" : "password"}
              className="pr-10"
              required
              disabled={status === "loading" || status === "success"}
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e8eefc] opacity-60 hover:opacity-100 transition-opacity"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? <IoIosEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>

          <Label>Confirmar contraseña</Label>
          <div className="relative">
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu nueva contraseña"
              type={showConfirmPassword ? "text" : "password"}
              className="pr-10"
              required
              disabled={status === "loading" || status === "success"}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e8eefc] opacity-60 hover:opacity-100 transition-opacity"
              aria-label={
                showConfirmPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
            >
              {showConfirmPassword ? (
                <IoIosEyeOff size={20} />
              ) : (
                <IoEye size={20} />
              )}
            </button>
          </div>

          {status === "success" && (
            <InfoAlert className="border-[rgba(80,200,120,0.25)] bg-[rgba(80,200,120,0.08)] text-[#d4ffd4]">
              <div className="text-sm">{message}</div>
            </InfoAlert>
          )}

          {status === "error" && (
            <ErrorAlert>
              <div className="text-sm">{message}</div>
            </ErrorAlert>
          )}

          <PrimaryButton
            className="mt-1.5"
            disabled={status === "loading" || status === "success"}
            type="submit"
          >
            {status === "loading"
              ? "Restableciendo..."
              : status === "success"
              ? "Contraseña restablecida"
              : "Restablecer contraseña"}
          </PrimaryButton>

          <div className="text-center text-xs opacity-70 mt-2">
            <Link
              to="/login"
              className="text-[rgba(120,160,255,0.8)] hover:underline"
            >
              Volver al login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
