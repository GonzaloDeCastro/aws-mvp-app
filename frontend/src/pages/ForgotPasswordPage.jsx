import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import logoPresuflow from "../assets/logo-presuflow.png";
import Card from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { InfoAlert, ErrorAlert } from "../components/ui/Alert";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Error al enviar el email");
      }

      setStatus("success");
      setMessage(
        "Si el email existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña."
      );
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Error al procesar la solicitud");
    }
  };

  return (
    <div className="h-screen grid place-items-center bg-[#0b1220] text-[#e8eefc] p-4">
      <Card className="w-full max-w-[420px]">
        <header className="flex gap-3 items-center p-3 rounded-[14px] bg-black/30 border border-white/8 mb-3.5">
          <img src={logoPresuflow} alt="Logo" className="h-[50px]" />
          <div>
            <div className="text-xs opacity-75">Recuperar contraseña</div>
          </div>
        </header>

        <form onSubmit={onSubmit} className="grid gap-2.5 p-1.5">
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tú@empresa.com"
            type="email"
            required
            disabled={status === "loading" || status === "success"}
          />

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
              ? "Enviando..."
              : status === "success"
              ? "Email enviado"
              : "Enviar enlace de recuperación"}
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
