import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import logoPresuflow from "../assets/logo-presuflow.png";
import Card from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/Button";
import { InfoAlert, ErrorAlert } from "../components/ui/Alert";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token de verificación no válido o faltante");
      return;
    }

    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/auth/verify-email?token=${token}`
      );
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Error al verificar el email");
      }

      setStatus("success");
      setMessage("¡Email verificado exitosamente! Ya puedes iniciar sesión.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error.message ||
          "Error al verificar el email. El token puede haber expirado."
      );
    }
  };

  return (
    <div className="h-screen grid place-items-center bg-[#0b1220] text-[#e8eefc] p-4">
      <Card className="w-full max-w-[420px]">
        <header className="flex gap-3 items-center p-3 rounded-[14px] bg-black/30 border border-white/8 mb-3.5">
          <img src={logoPresuflow} alt="Logo" className="h-[50px]" />
          <div>
            <div className="text-xs opacity-75">Verificación de Email</div>
          </div>
        </header>

        <div className="grid gap-3 p-1.5">
          {status === "loading" && (
            <InfoAlert>
              <div className="text-center">
                <div className="text-sm mb-2">Verificando tu email...</div>
              </div>
            </InfoAlert>
          )}

          {status === "success" && (
            <>
              <InfoAlert className="border-[rgba(80,200,120,0.25)] bg-[rgba(80,200,120,0.08)] text-[#d4ffd4]">
                <div className="text-center">
                  <div className="text-sm mb-2">✓ {message}</div>
                </div>
              </InfoAlert>
              <PrimaryButton onClick={() => navigate("/login")}>
                Ir al login
              </PrimaryButton>
            </>
          )}

          {status === "error" && (
            <>
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
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
