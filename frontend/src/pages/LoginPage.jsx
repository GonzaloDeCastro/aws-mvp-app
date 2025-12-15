import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import logoPresuflow from "../assets/logo-presuflow.png";
import Card from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("gonza@demo.com");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) navigate("/app/products", { replace: true });
  }, [token, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="h-screen grid place-items-center bg-[#0b1220] text-[#e8eefc] p-4">
      <Card className="w-full max-w-[420px]">
        <header className="flex gap-3 items-center p-3 rounded-[14px] bg-black/30 border border-white/8 mb-3.5">
          <img src={logoPresuflow} alt="Logo" className="h-[50px]" />
          <div>
            <div className="text-xs opacity-75">
              Inicia sesión para continuar
            </div>
          </div>
        </header>

        <form onSubmit={onSubmit} className="grid gap-2.5 p-1.5">
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tú@empresa.com"
          />

          <Label>Contraseña</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            type="password"
          />

          <PrimaryButton
            className="mt-1.5"
            disabled={status === "cargando"}
            type="submit"
          >
            {status === "cargando" ? "Iniciando sesión..." : "iniciar sesión"}
          </PrimaryButton>

          {error && (
            <div className="mt-1.5 text-[crimson] text-sm">{error}</div>
          )}

          <div className="text-center text-xs opacity-70 mt-2">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-[rgba(120,160,255,0.8)] hover:underline"
            >
              Regístrate
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
